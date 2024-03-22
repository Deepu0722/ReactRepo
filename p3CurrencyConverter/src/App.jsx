import { useState } from 'react';
import { InputBox } from './components';
import useCurrencyInfo from './customhooks/useCurrencyInfo';


function App() {
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [from, setFrom] = useState("eur");
  const [to, setTo] = useState("inr");

  const dataFromCurrencyInfo = useCurrencyInfo(from);
  const optionsArr = Object.keys(dataFromCurrencyInfo);
  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  }
  const convertCurrency = () => {

    setConvertedAmount(amount * dataFromCurrencyInfo[to])

  }
  let BackgroundImage = './src/assets/bg1.jpeg'; 
  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('${BackgroundImage}')`,
      }}
    >
      <div className="w-full" style={{backgroundImage: `url()`}}>
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convertCurrency();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount= {amount}
                onCurrencyChange={(currency)=>{setFrom(currency)}}
                onAmountChange = {(amount) => {setAmount(amount)}}
                currencyOptions = {optionsArr}
                selectCurrency= {from}
                
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                onClick={swap}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-black text-white px-2 py-1"
              >
                Swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                onAmountChange = {(convertedAmount) => {setConvertedAmount(convertedAmount)}}
                onCurrencyChange={(currency) => {setTo(currency)}}
                selectCurrency = {to}
                currencyOptions = {optionsArr}
                onAmountDisable 
                />
            </div>
            <button type="submit" className="w-full bg-black text-white px-4 py-3 rounded-lg">
              Convert ({from.toUpperCase()}) to ({to.toUpperCase()})
            </button>
          </form>
        </div>
      </div>
    </div>
  );

}

export default App
