import type {
  Fragment,
  FunctionFragment,
  ParamType,
} from "ethers/lib/utils";
import type { APIApplicationCommand }  from "discord-api-types/v9";
import { SlashCommandBuilder } from "@discordjs/builders";

interface AnnotatedFunctionFragment extends Omit<FunctionFragment, "inputs"> {
  inputs: AnnotatedParamType[];
}

interface AnnotatedParamType extends ParamType {
  decimals?: number;
}

export function functionFragmentToCommand(
  functionFragment: AnnotatedFunctionFragment
): Partial<APIApplicationCommand> {
  const builder = new SlashCommandBuilder();
  builder.setName(functionFragment.name.toLowerCase());
  builder.setDescription(functionFragment.stateMutability)
  functionFragment.inputs.forEach((input) => builder
    .addStringOption((option) => option.setName(input.name.toLowerCase())
      .setDescription(input.decimals ? "number" : input.type)
      .setRequired(true)
    )
  );
  return builder.toJSON();
}

export function abiToCommands(
  abi: Fragment[],
): Partial<APIApplicationCommand>[] {
  return abi.filter(({ type }) => type === "function")
    .map((fragment) => functionFragmentToCommand(fragment as FunctionFragment));
}
