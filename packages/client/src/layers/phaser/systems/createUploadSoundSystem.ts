import { defineComponentSystem } from "@latticexyz/recs";
import { NetworkLayer } from "../../network";

export function createUploadSoundSystem(network: NetworkLayer, context) {
  const {
    world,
  } = context;

  const {
    components: { SoundUri, TrackSoundEntity },
  } = network;

  defineComponentSystem(world, SoundUri, (update) => {
    console.log('defineComponentSystem: SoundUri');
    console.log(update);
  });

  defineComponentSystem(world, TrackSoundEntity, (update) => {
    console.log('defineComponentSystem: TrackSoundEntity');
    console.log(update);
  });
}
