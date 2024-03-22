import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numAllow, setNumAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const passwordRef = useRef(password);

  const copyTextToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,20);
    window.navigator.clipboard.writeText(password)

  }, [password]);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const numstr = '1234567890';
    const symbols = '!@#$%^&*()-_=+';
    if (numAllow) str += numstr;
    if (charAllow) str += symbols;
    for (let i = 0; i < length; i++) {
      let randomindex = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(randomindex);

    }
    setPassword(pass);


  }, [length, charAllow, numAllow, setPassword]);
  useEffect(() => {
    passwordGenerator();

  }, [length, charAllow, numAllow, passwordGenerator])

  return (
    <>

      <div className='w-full max-w-lg mx-auto rounded-lg bg-gray-500 px-8 py-4 text-center text-green'>
        <h1 className="text-4xl text-center text-white"> Password Generator </h1>
        <div className='flex justify-center items-center overflow-hidden mb-4 rounded-lg'>
          <input
            type="text"
            value={password}
            placeholder='password'
            className='outline-none w-full py-2 px-3 my-5 rounded-lg'
            readOnly
            ref={passwordRef}
          />
          <button className='text-white bg-blue-700 rounded-lg py-2 px-3 font-bold'
            onClick={copyTextToClipBoard}
          > Copy </button>
        </div>
        <div className='flex text-sm gap-x-2 px-2'>
          <div className='flex item-center gap-x-2'>
            <input
              type="range"
              name="" id=""
              min={8}
              max={100}
              value={length}
              onChange={(e) => { setLength(e.target.value) }}

            />
            <label className='text-white font-bold'>length:{length}</label>
            <div className='flex item-center gap-x-2'>
              <input type="checkbox"
                name="numAllowed"
                id="numAllow"
                defaultChecked={numAllow}
                onChange={() => {
                  setNumAllow((prev) => !prev)
                }}
              />
              <label htmlFor="numAllow" className='text-white font-bold'> AllowNumbers</label>
            </div>
            <div className='flex item-center gap-x-2'>
              <input type="checkbox"
                name=""
                id="charAllow"
                defaultChecked={charAllow}
                onChange={() => {
                  setCharAllow(prev => !prev)
                }}
              />
              <label htmlFor="charallow" className='text-white font-bold'> AllowChars</label>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
