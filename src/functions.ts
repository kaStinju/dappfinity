import { ethers, BigNumber, Contract } from "ethers";
import { SlashCommandBuilder } from "@discordjs/builders";
import type {
  FunctionFragment,
  ParamType,
} from "ethers/lib/utils";
import type { APIApplicationCommand }  from "discord-api-types/v9";
import type { CommandInteraction } from "discord.js";
import { config } from "./config";
import { TransactionResponse } from "@ethersproject/abstract-provider";

interface AnnotatedFunctionFragment extends Omit<FunctionFragment, "inputs"> {
  inputs: AnnotatedInputType[];
  outputs?: AnnotatedOutputType[];
}

interface AnnotatedInputType extends ParamType {
  decimals?: number;
}

interface AnnotatedOutputType extends ParamType {
  decimals?: number;
  precision?: number;
}

class Function {
  fragment: AnnotatedFunctionFragment;

  constructor(fragment: AnnotatedFunctionFragment) {
    this.fragment = fragment;
  }

  getCommandName(): string {
    return this.fragment.name.toLowerCase();
  }

  isView(): boolean {
    return ["pure", "view"].includes(this.fragment.stateMutability);
  }

  toCommand(): Partial<APIApplicationCommand> {
    const builder = new SlashCommandBuilder();
    builder.setName(this.getCommandName());
    builder.setDescription(this.fragment.stateMutability)
    this.fragment.inputs.forEach((input) => {
      const name = input.name.toLowerCase();
      if (input.type === "bool") {
        builder.addBooleanOption((option) => option.setName(name));
        return;
      }
      builder.addStringOption((option) => option.setName(name)
        .setDescription(input.decimals ? "number" : input.type)
        .setRequired(true)
      )
    });
    return builder.toJSON();
  }
}

class ContextualizedFunction extends Function {
  params: any[];

  constructor(fragment: AnnotatedFunctionFragment, params: any[]) {
    super(fragment);
    this.params = params;
  }

  static fromInteraction(
    func: Function,
    interaction: CommandInteraction,
  ): ContextualizedFunction {
    const params = func.fragment.inputs.map((input) => {
      const name = input.name.toLowerCase();
      if (input.type === "bool") {
        const bool = interaction.options.getBoolean(name, true);
        return bool;
      }
      const str = interaction.options.getString(name, true);
      if (input.decimals) {
        return ethers.utils.parseUnits(str, input.decimals);
      }
      if (input.type.includes("int")) {
        return BigNumber.from(str);
      }
      return str;
    });
    return new ContextualizedFunction(func.fragment, params);
  }

  async callView(provider: ethers.providers.JsonRpcProvider) {
    if (!this.isView()) {
      throw new Error("must be pure or view");
    }
    const contract = baseContract.connect(provider);
    if (!this.fragment.outputs) {
      return [];
    }
    this.fragment.outputs
    const result = await contract.functions[this.fragment.name](...this.params);
    return this.fragment.outputs.map((output, i) => {
      const value = result[i];
      if (output.decimals) {
        if (output.precision) {
          return ethers.utils.formatUnits(
            (value as BigNumber)
              .div(BigNumber.from(10).pow(output.decimals - output.precision))
              .toString(),
            output.precision,
          );
        }
        return ethers.utils.formatUnits(value, output.decimals);
      }
      return value;
    });
  }

  async callMethod(signer: ethers.Signer): Promise<TransactionResponse> {
    if (this.isView()) {
      throw new Error("must be nonpayable or payable");
    }
    const contract = baseContract.connect(signer);
    return await contract[this.fragment.name](...this.params);
  }
}

const functionMap: { [key: string]: Function } = {};

let baseContract: Contract;

export function initFunctions() {
  const { contractConfig: { address, abi } } = config();
  abi.filter(({ type }) => type === "function").forEach((fragment) => {
    const func = new Function(fragment as AnnotatedFunctionFragment);
    functionMap[func.getCommandName()] = func;
  })
  baseContract = new Contract(address, abi);
}

export function getCommands(): Partial<APIApplicationCommand>[] {
  return Object.values(functionMap).map((func) => func.toCommand());
}

export function getFunction(
  commandInteraction: CommandInteraction,
): ContextualizedFunction {
  const func = functionMap[commandInteraction.commandName];
  if (!func) {
    throw new Error("tried to get non-existent function");
  }
  return ContextualizedFunction.fromInteraction(func, commandInteraction);
}
