// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import "solecs/System.sol";
import { IWorld } from "solecs/interfaces/IWorld.sol";
import { getAddressById } from "solecs/utils.sol";

import { OwnerComponent, ID as OwnerComponentID } from "../components/OwnerComponent.sol";

uint256 constant ID = uint256(keccak256("system.SetOwner"));

contract SetOwnerSystem is System {
  constructor(IWorld _world, address _components) System(_world, _components) {}

  function execute(bytes memory arguments) public returns (bytes memory) {
    (uint256 entity, string memory desiredOwner) = abi.decode(arguments, (uint256, string));

    OwnerComponent ownerComponent = OwnerComponent(getAddressById(components, OwnerComponentID));
    ownerComponent.set(entity, desiredOwner);
  }

  function executeTyped(uint256 entity, string memory desiredOwner) public returns (bytes memory) {
    return execute(abi.encode(entity, desiredOwner));
  }
}
