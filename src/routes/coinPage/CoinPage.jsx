import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../logic/useFetch.jsx";
import CoinPageBtn from "./CoinPageBtn.jsx";
import CoinPageChange from "./CoinPageChange.jsx";
import CoinPageInfo from "./CoinPageInfo.jsx";
import CoinPagePrice from "./CoinPagePrice.jsx";
import CoinPageSparkline from "./CoinPageSparkline.jsx";
import CoinPageTitle from "./CoinPageTitle.jsx";
import Converter from "./Converter.jsx";
import Error from "../../components/Error.jsx";
import Header from "../../components/Header.jsx";
import Loading from "../../components/Loading.jsx";
import Menu from "../../components/Menu.jsx";
import "./../../css/coinPage/CoinPage.css";

export default function CoinPage() {
  const { id } = useParams();
  const [currency, setCurrency] = useState("USD");
  const [currencySymbol, setCurrencySymbol] = useState("$");

  const {
    data: coin,
    isLoading,
    error,
  } = useFetch(`https://api.coingecko.com/api/v3/coins/${id}?sparkline=true`, [
    id,
  ]);

  useEffect(() => {
    document.title = `${
      id.charAt(0).toUpperCase() + id.slice(1)
    } Coin | CryptoCheck`;
  }, [id]);

  useEffect(() => {
    const symbolMap = {
      usd: "$",
      eur: "€",
      cny: "¥",
      jpy: "¥",
      gbp: "£",
      aud: "A$",
      cad: "C$",
      chf: "CHF",
      krw: "₩",
      sgd: "S$",
      pln: "PLN",
    };

    setCurrencySymbol(symbolMap[currency.toLowerCase()] || currency);
  }, [currency]);

  if (error) {
    return (
      <Error
        title="Oops! Something went wrong"
        message="We couldn't load the coin data. Please try again later or check the URL."
      />
    );
  }

  if (isLoading || !coin) return <Loading />;

  return (
    <div className="coinPage">
      <div className="coinPageFirstSection">
        <Header/>
        <CoinPageBtn
          currency={currency}
          name={coin.name}
          setCurrency={setCurrency}
        />
        <div className="infoWrapper">
          <CoinPageTitle
            imageLarge={coin.image.large}
            imageSmall={coin.image.small}
            market_cap_rank={coin.market_cap_rank}
            name={coin.name}
            symbol_coin={coin.symbol}
          />
          <CoinPagePrice
            currency={currency}
            currencySymbol={currencySymbol}
            current_price={coin.market_data.current_price}
            high_24h={coin.market_data.high_24h}
            low_24h={coin.market_data.low_24h}
            price_change_percentage_24h_in_currency={
              coin.market_data.price_change_percentage_24h_in_currency
            }
          />
        </div>
      </div>

      <div className="coinPageSecondSection">
        <CoinPageSparkline
          day={coin.market_data.price_change_percentage_24h_in_currency.usd}
          name={coin.name}
          sparkline={coin.market_data.sparkline_7d.price}
        />
        <CoinPageInfo
          currency={currency}
          currencySymbol={currencySymbol}
          ath={coin.market_data.ath}
          ath_change_percentage={coin.market_data.ath_change_percentage}
          ath_date={coin.market_data.ath_date}
          atl={coin.market_data.atl}
          atl_change_percentage={coin.market_data.atl_change_percentage}
          atl_date={coin.market_data.atl_date}
          circulating_supply={coin.market_data.circulating_supply}
          fully_diluted_valuation={coin.market_data.fully_diluted_valuation}
          market_cap={coin.market_data.market_cap}
          max_supply={coin.market_data.max_supply}
          total_supply={coin.market_data.total_supply}
        />
      </div>

      <div className="coinPagePriceChangePerSection">
        <CoinPageChange
          currency={currency}
          day={coin.market_data.price_change_percentage_24h_in_currency}
          halfMonth={coin.market_data.price_change_percentage_14d_in_currency}
          hour={coin.market_data.price_change_percentage_1h_in_currency}
          month={coin.market_data.price_change_percentage_30d_in_currency}
          week={coin.market_data.price_change_percentage_7d_in_currency}
          year={coin.market_data.price_change_percentage_1y_in_currency}
        />
      </div>

      <div className="coinPageThirdSection">
        <Converter
          currency={currency}
          currencySymbol={currencySymbol}
          current_price={coin.market_data.current_price}
          image={coin.image.small}
          symbol_coin={coin.symbol}
        />
      </div>
      <Menu />
    </div>
  );
}