// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0;
import "std-contracts/components/Uint32ArrayComponent.sol";

uint256 constant ID = uint256(keccak256("component.TrackTimings"));

contract TrackTimingsComponent is Uint32ArrayComponent {
  constructor(address world) Uint32ArrayComponent(world, ID) {}
}
