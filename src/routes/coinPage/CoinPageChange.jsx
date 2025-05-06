import "./../../css/coinPage/CoinPageChange.css";

export default function CoinPageChange({ currency, hour, day, week, halfMonth, month }) {
  const currencyKey = currency.toLowerCase() || "usd";

  const renderPriceChange = (value) => {
    if (value === undefined || value === null) return <p>No data</p>;

    const rounded = value.toFixed(2);
    const isZero = parseFloat(rounded) === 0;

    const formattedValue = isZero ? "0.00" : rounded;
    const isNegative = parseFloat(formattedValue) < 0;
    const className = isNegative ? "priceChangePerRed" : "priceChangePerGreen";

    return (
      <p className={className}>
        {isZero ? formattedValue : isNegative ? formattedValue : `+${formattedValue}`}%
      </p>
    );
  };

  const hourV = renderPriceChange(hour?.[currencyKey]);
  const dayV = renderPriceChange(day?.[currencyKey]);
  const weekV = renderPriceChange(week?.[currencyKey]);
  const halfMonthV = renderPriceChange(halfMonth?.[currencyKey]);
  const monthV = renderPriceChange(month?.[currencyKey]);

  return (
    <table>
      <thead>
        <tr>
          <th>1h</th>
          <th>24h</th>
          <th>7d</th>
          <th>14d</th>
          <th>30d</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{hourV}</td>
          <td>{dayV}</td>
          <td>{weekV}</td>
          <td>{halfMonthV}</td>
          <td>{monthV}</td>
        </tr>
      </tbody>
    </table>
  );
}