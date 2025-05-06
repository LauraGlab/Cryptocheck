import { useState, useEffect } from "react";
import { useCoinContext } from "../../logic/CoinContext.jsx";
import useFetch from "../../logic/useFetch.jsx";
import Coin from "./Coin.jsx";
import Error from "./../../components/Error.jsx";
import Header from "../../components/Header.jsx";
import MainPageSubtitle from "./MainPageSubtitle.jsx";
import Menu from "../../components/Menu.jsx";
import Loading from "../../components/Loading.jsx";
import "./../../css/mainPage/MainPage.css";
import "./../../css/mainPage/MainPageSearch.css"; 

export default function MainPage() {
  const { coins, setCoins } = useCoinContext();
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: fetchedCoins,
    isLoading,
    error,
  } = useFetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true",
    []
  );

  useEffect(() => {
    if (fetchedCoins) {
      setCoins(fetchedCoins);
    }
  }, [fetchedCoins, setCoins]);

  useEffect(() => {
    document.title =
      "Real-Time Cryptocurrency Tracking & Insights | CryptoCheck";
  }, []);

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  const searchCoin = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCoins = Array.isArray(coins)
    ? coins.filter((coin) =>
        coin.name.toUpperCase().includes(searchTerm.toUpperCase())
      )
    : [];

  return (
    <div className="mainPage">
      <div className="bckgr"></div>
      <div className="headerWrapper">
        <Header />
      </div>
      <MainPageSubtitle/>
      <div className="coinsStatsSection">
        <div className="inputSearch__section" id="nextPart">
          <input
            className="inputSearch"
            type="text"
            placeholder="Search the coin..."
            onChange={searchCoin}
          />
        </div>
        <div className="cryptoSection">
          <div className="legendRow__section">
            <div className="legendRow">
              <p className="legendFirst">#</p>
              <p className="legendSecond">Name</p>
              <p className="legendThird">Price</p>
              <p className="legendFourth">24h Change</p>
              <p className="legendGraph">Price Graph(7d)</p>
            </div>
          </div>
          {!isLoading && filteredCoins.length === 0 && (
            <p className="loadingCoinsText">Loading coins...</p>
          )}
          {filteredCoins.map((coin) => {
            return (
              <Coin
                key={coin.id}
                coinId={coin.id}
                coinName={coin.name}
                coinSymbol={coin.symbol}
                icon={coin.image}
                marketCapRank={coin.market_cap_rank}
                price={coin.current_price}
                priceChange={coin.price_change_percentage_24h}
                sparkline={coin.sparkline_in_7d?.price || []}
              />
            );
          })}
        </div>
      </div>
      <Menu />
    </div>
  );
}
