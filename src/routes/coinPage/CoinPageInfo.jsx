import "./../../css/coinPage/CoinPageInfo.css";

export default function CoinPageInfo({
  currency,
  currencySymbol,
  market_cap,
  fully_diluted_valuation,
  circulating_supply,
  total_supply,
  max_supply,
  ath,
  ath_change_percentage,
  ath_date,
  atl,
  atl_change_percentage,
  atl_date,
}) {
  const currencyKey = currency.toLowerCase() || "usd";

  const values = {
    marketCap: market_cap?.[currencyKey],
    fdv: fully_diluted_valuation?.[currencyKey],
    athV: ath?.[currencyKey],
    athPerc: ath_change_percentage?.[currencyKey],
    athDate: ath_date?.[currencyKey],
    atlV: atl?.[currencyKey],
    atlPerc: atl_change_percentage?.[currencyKey],
    atlDate: atl_date?.[currencyKey],
  };

  const formatNumber = (num) => (num ? num.toLocaleString() : "N/A");
  const renderPrice = (value) =>
    value ? `${currencySymbol}${formatNumber(value)}` : "N/A";
  const renderPercentage = (value) => (value ? `${value.toFixed(2)}%` : "N/A");
  const renderDate = (date) => (date ? date.slice(0, 10) : "N/A");

  return (
    <div className="coinPageInfoSection">
      <div className="lineInfo">
        <p className="lineInfoTitle">Market Cap</p>
        <p>{renderPrice(values.marketCap)}</p>
      </div>
      <div className="lineInfo">
        <p className="lineInfoTitle">Fully Diluted Valuation</p>
        <p>{renderPrice(values.fdv)}</p>
      </div>
      <div className="lineInfo">
        <p className="lineInfoTitle">Circulating Supply</p>
        <p>{values.circulating_supply || "N/A"}</p>
      </div>
      <div className="lineInfo">
        <p className="lineInfoTitle">Total Supply</p>
        <p>{values.total_supply || "N/A"}</p>
      </div>
      <div className="lineInfo">
        <p className="lineInfoTitle">Max Supply</p>
        <p>{values.max_supply || "N/A"}</p>
      </div>
      <div className="lineInfo">
        <p className="lineInfoTitle">All-Time High</p>
        <div>
          <div className="allTimeSection">
            <p>{renderPrice(values.athV)}</p>
            <p className="coinPagePriceRed">
              {renderPercentage(values.athPerc)}
            </p>
          </div>
          <div className="allTimeDate">
            <p>{renderDate(values.athDate)}</p>
          </div>
        </div>
      </div>
      <div className="lineInfo">
        <p className="lineInfoTitle">All-Time Low</p>
        <div>
          <div className="allTimeSection">
            <p>{renderPrice(values.atlV)}</p>
            <p className="coinPagePriceGreen">
              {renderPercentage(values.atlPerc)}
            </p>
          </div>
          <div className="allTimeDate">
            <p>{renderDate(values.atlDate)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}