import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);
  const [symbol, setSymbol] = useState("");
  const [inverted, setInverted] = useState(false);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  const onSelect = (event) => {
    if (event.target.value == "xx") {
      setPrice(0);
      setSymbol("");
      return;
    }

    const coin = JSON.parse(event.target.value);
    setPrice(coin.quotes.USD.price);
    setSymbol(coin.symbol);
  };
  const onChange = (event) => {
    setAmount(event.target.value);
  };
  const reset = () => {
    setAmount(0);
  };
  const onInvert = () => {
    reset();
    setInverted((current) => !current);
  };

  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={onSelect}>
          <option value="xx">Select coin</option>
          {coins.map((coin, index) => (
            <option key={index} value={JSON.stringify(coin)}>
              {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
      <hr />
      <div>
        <input
          value={inverted ? Math.round(amount * price * 100) / 100 : amount}
          id="usd"
          type="number"
          onChange={onChange}
          disabled={inverted}
        ></input>
        <label htmlFor="usd">USD</label>
      </div>
      <div>
        <input
          value={inverted ? amount : Math.round((amount / price) * 100) / 100}
          id="symbol"
          type="number"
          onChange={onChange}
          disabled={!inverted}
        ></input>
        <label htmlFor="symbol">{symbol}</label>
      </div>
      <button onClick={reset}>Reset</button>
      <button onClick={onInvert}>{inverted ? "Turn back" : "Invert"}</button>
    </div>
  );
}

export default App;
