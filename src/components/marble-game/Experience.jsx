import { Physics } from "@react-three/rapier";
import marbleGame from "@/stores/marbleGame.jsx";
import { Level } from "./Level.jsx";
import Lights from "./Lights.jsx";
import Player from "./Player.jsx";

export default function Experience() {
  const blocksCount = marbleGame((state) => state.blocksCount);
  const blocksSeed = marbleGame((state) => state.blocksSeed);

  return (
    <>
      <color args={["#bdedfc"]} attach="background" />

      <Physics debug={false}>
        <Lights />
        <Level count={blocksCount} seed={blocksSeed} />
        <Player />
      </Physics>
    </>
  );
}
