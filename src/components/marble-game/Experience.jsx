import { Physics } from "@react-three/rapier";
import useGame from "@/stores/marbleGame.jsx";
import { Level } from "./Level.jsx";
import Lights from "./Lights.jsx";
import Player from "./Player.jsx";

export default function Experience() {
  const blocksCount = useGame((state) => state.blocksCount);
  const blocksSeed = useGame((state) => state.blocksSeed);

  return (
    <Physics debug={false}>
      <Lights />
      <Level count={blocksCount} seed={blocksSeed} />
      <Player />
    </Physics>
  );
}