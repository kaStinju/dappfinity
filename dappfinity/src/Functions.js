import React from "react";
import { Button, Card, Elevation, NumericInput } from "@blueprintjs/core";

export default function Options() {
  return (
    <>
      <div className="options">
        {fake.abi
          .filter((obj) => obj.type === "function")
          .map((obj) => {
            return (
              <Functions
                key={obj.name}
                name={obj.name}
                inputs={obj.inputs}
                outputs={obj.outputs}
              ></Functions>
            );
          })}
      </div>
      <Functions />
    </>
  );
}

export function Functions(props) {
  const { name, inputs, outputs } = props;
  return (
    <>
      <Card interactive={true}>
        <h1>
          {name}(
          {inputs &&
            inputs.map((input) => `${input.type} ${input.name}`).join(", ")}
          ){" "}
          {outputs &&
            "returns (" + outputs.map((output) => output.type).join(", ") + ")"}
        </h1>

        {inputs &&
          inputs
            .filter((obj) => obj.internalType.includes("int"))
            .map((input) => {
              return <InputButton key={input.name} name={input.name} />;
            })}
      </Card>
    </>
  );
}

export function InputButton(props) {
  const { name } = props;
  return <></>;
}

const fake = {
  "address": "0x2d5bc2f01a621a16ec5ff77fca883c6ac067f6e9",
  "abi": [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor",
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address",
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address",
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256",
        },
      ],
      "name": "Approval",
      "type": "event",
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address",
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address",
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256",
        },
      ],
      "name": "Transfer",
      "type": "event",
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address",
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address",
        },
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256",
        },
      ],
      "stateMutability": "view",
      "type": "function",
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address",
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256",
        },
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool",
        },
      ],
      "stateMutability": "nonpayable",
      "type": "function",
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address",
        },
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256",
        },
      ],
      "stateMutability": "view",
      "type": "function",
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8",
        },
      ],
      "stateMutability": "view",
      "type": "function",
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address",
        },
        {
          "internalType": "uint256",
          "name": "subtractedValue",
          "type": "uint256",
        },
      ],
      "name": "decreaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool",
        },
      ],
      "stateMutability": "nonpayable",
      "type": "function",
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address",
        },
        {
          "internalType": "uint256",
          "name": "addedValue",
          "type": "uint256",
        },
      ],
      "name": "increaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool",
        },
      ],
      "stateMutability": "nonpayable",
      "type": "function",
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string",
        },
      ],
      "stateMutability": "view",
      "type": "function",
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string",
        },
      ],
      "stateMutability": "view",
      "type": "function",
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256",
        },
      ],
      "stateMutability": "view",
      "type": "function",
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address",
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "decimals": 18,
          "type": "uint256",
        },
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool",
        },
      ],
      "stateMutability": "nonpayable",
      "type": "function",
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address",
        },
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address",
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256",
        },
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool",
        },
      ],
      "stateMutability": "nonpayable",
      "type": "function",
    },
  ],
};
