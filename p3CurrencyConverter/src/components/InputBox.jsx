import { useEffect, useState, useId } from 'react';

function InputBox({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    selectCurrency = "eur",
    onAmountDisable = false,
    oncurrencydisable = false,
    currencyOptions = [],
    className = "",

}) {
    const amountID = useId();
    return (
        <>
            <div className={`bg-white p-3 border-gray-600 rounded-lg text-sm flex ${className}`}>
                <div className="w-1/2">
                    <label htmlFor={amountID} className="text-black/40 mb-2 inline-block">
                        {label}
                    </label>
                    <input
                    id={amountID}
                        className="outline outline-gray-100 w-full bg-gray-100 px-2 rounded py-1.5"
                        type="number"
                        placeholder="Amount"
                        disabled={onAmountDisable}
                        value={amount}
                        onChange={(e) => { onAmountChange && onAmountChange(Number(e.target.value)) }}
                    />
                </div>
                <div className="w-1/2 flex flex-wrap justify-end text-right">
                    <p className="text-black/40 mb-2 w-full">Currency Type</p>
                    <select
                        className="rounded-lg px-1 py-1  bg-gray-100 cursor-pointer outline outline-gray-100"
                        value={selectCurrency}
                        onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                        disabled={oncurrencydisable}
                    >
                      {currencyOptions.map((currency) => (
                              <option key={currency} value={currency}>
                              {currency}
                          </option>
                      ))}
                        

                    </select>
                </div>
            </div>
        </>
    )
}
export default InputBox;
