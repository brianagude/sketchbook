// import { useKeyboardControls } from "@react-three/drei";
import { howMany } from "@/styles/design-tokens"

export default function Interface() {
	// const one = useKeyboardControls((state) => state.one);

	return (
		<div className="interface p-4 absolute top-0 left-0 z-10">
      <div className="w-full max-w-[288px]">
        <label htmlFor="guess" className="w-full mb-2 block px-2">how many marbles are in the jar?</label>
        <input type="number" id="guess" name="guess" className={howMany.input} min={0} />
        {/* <input type="number" className={howMany.input}/> */}
        {/* <button type="button" className={howMany.number}>1</button>
        <button type="button" className={howMany.number}>2</button>
        <button type="button" className={howMany.number}>3</button>
        <button type="button" className={howMany.number}>4</button>
        <button type="button" className={howMany.number}>5</button>
        <button type="button" className={howMany.number}>6</button>
        <button type="button" className={howMany.number}>7</button>
        <button type="button" className={howMany.number}>8</button>
        <button type="button" className={howMany.number}>9</button>
        <button type="button" className={howMany.number}>0</button>
        <button type="button" className={howMany.number}>Delete</button>
        <button type="button" className={howMany.number}>Submit</button> */}
      </div>
      {/* <div className="answer">???</div> */}
		</div>
	);
}
