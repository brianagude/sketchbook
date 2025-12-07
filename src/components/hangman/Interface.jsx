import { useHangman } from "@/stores/hangman";

function createSpaces(word, guesses){
  return word.split('').map((letter) => (
    <div key={Date.now() + Math.random() * 2} className="aspect-square w-14 p-2 border-b-2 border-[#00171F] flex items-center justify-center text-3xl">
      {guesses.includes(letter.toLowerCase()) ? letter : ''}
    </div>
  ));
}

export default function Interface() {
  const word = useHangman(s => s.word);
  const category = useHangman(s => s.category);
  const guesses = useHangman(s => s.guesses);
  const strikes = useHangman(s => s.strikes);
  const phase = useHangman(s => s.phase);
  const restart = useHangman(s => s.restart);

  return (
    <>
      {/* <div className="fixed inset-0 flex flex-col items-center justify-center">
        <p>Press <b>SPACE</b> to [re]START</p>
        <p>You get 5 tries</p>
      </div> */}
      <div className="fixed z-10 text-[#00171F] top-0 left-0 w-full p-4">
        <div className="flex gap-4 justify-between items-center">
          <p className="text-3xl uppercase">{category}</p>
          <div className="flex gap-2">
            {renderStrikes(strikes)}
          </div>
        </div>
        { phase === 'ended' && <button type="button" onClick={() => restart()}>restart</button> }
        { word && 
          <div className="flex gap-2 mx-auto w-fit">
            {createSpaces(word, guesses)}
          </div>
        }
      </div>
      {

      }
    </>
)}

function renderStrikes(count) {
  const xs = [];
  for(let i = 0; i < count; i++) {
    xs.push(<p key={i} className="text-red text-3xl">X</p>);
  }
  return xs;
}