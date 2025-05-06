import { useState, useEffect } from "react";
import "./../../css/coinPage/Converter.css";

export default function Converter({
  currency,
  currencySymbol,
  current_price,
  image,
  symbol_coin,
}) {
  const [money, setMoney] = useState("1");
  const [converted, setConverted] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const currencyPrice = current_price[currency.toLowerCase()];
    setPrice(currencyPrice || 0);
  }, [currency, current_price]);

  useEffect(() => {
    if (price && money) {
      const converting = money * price;
      setConverted(converting);
    }
  }, [money, price]);

  return (
    <div className="converter__section">
      <h4 className="converterTitle">Crypto Converter</h4>
      <div className="converter">
        <div>
          <div className="infoConverter">
            <img
              className="imgConverter"
              src={image}
              alt={`${symbol_coin} image`}
            />
            <p className="nameConverter">{symbol_coin}</p>
          </div>
          <input
            className="inputConverter"
            type="number"
            value={money}
            min="1"
            onChange={(e) => setMoney(e.target.value)}
          />
        </div>
        <div className="convertedCoinSection">
          <p className="priceConverted">
            {isNaN(converted) ? "Invalid Amount" : converted.toLocaleString()}
          </p>
          <p className="symbolConverted">{currencySymbol}</p>
        </div>
      </div>
    </div>
  );
}
