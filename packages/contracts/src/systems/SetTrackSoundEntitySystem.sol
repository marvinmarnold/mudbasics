// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import "solecs/System.sol";
import { IWorld } from "solecs/interfaces/IWorld.sol";
import { getAddressById } from "solecs/utils.sol";

import { TrackSoundEntityComponent, ID as TrackSoundEntityComponentID } from "../components/TrackSoundEntityComponent.sol";

uint256 constant ID = uint256(keccak256("system.SetTrackSoundEntity"));

contract SetTrackSoundEntitySystem is System {
  constructor(IWorld _world, address _components) System(_world, _components) {}

  function execute(bytes memory arguments) public returns (bytes memory) {
    (uint256 entity, uint256 soundEntity) = abi.decode(arguments, (uint256, uint256));

    TrackSoundEntityComponent trackSoundEnittyComponent = TrackSoundEntityComponent(getAddressById(components, TrackSoundEntityComponentID));
    trackSoundEnittyComponent.set(entity, soundEntity);
  }

  function executeTyped(uint256 entity, uint256 soundEntity) public returns (bytes memory) {
    return execute(abi.encode(entity, soundEntity));
  }
}
