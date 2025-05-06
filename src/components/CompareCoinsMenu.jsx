import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SVG from "react-inlinesvg";
import ArrowDown from "./../assets/icons/icon-arrow-down.svg";
import ArrowUp from "./../assets/icons/icon-arrow-up.svg";
import Close from "./../assets/icons/icon-close.svg";
import Compare from "./../assets/icons/icon-compare.svg";
import "./../css/components/CompareCoinsMenu.css";

export default function CompareCoinsMenu({ close, coins }) {
  const [coinData, setCoinData] = useState({
    coin1: { selectedCoin: null, searchTerm: "", inputValue: "" },
    coin2: { selectedCoin: null, searchTerm: "", inputValue: "" },
  });
  const [openInput, setOpenInput] = useState(null);

  useEffect(() => {
    const handleOutsideModalClick = (e) => {
      if (e.target.classList.contains("backgroundBlur")) {
        close(); 
      }
    };

    document.addEventListener("mousedown", handleOutsideModalClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideModalClick);
    };
  }, [close]);

  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest(".optionsSection")) {
        setOpenInput(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const filterCoins1 = useMemo(
    () =>
      coins.filter((coin) =>
        coin.name
          .toUpperCase()
          .includes(coinData.coin1.searchTerm.toUpperCase())
      ),
    [coins, coinData.coin1.searchTerm]
  );

  const filterCoins2 = useMemo(
    () =>
      coins.filter((coin) =>
        coin.name
          .toUpperCase()
          .includes(coinData.coin2.searchTerm.toUpperCase())
      ),
    [coins, coinData.coin2.searchTerm]
  );

  const handleInputChange = (coinKey) => (e) => {
    setCoinData((prev) => ({
      ...prev,
      [coinKey]: { ...prev[coinKey], searchTerm: e.target.value },
    }));
    setOpenInput(coinKey);
  };

  const handleSelectCoin = (coinKey) => (coin) => {
    setCoinData((prev) => ({
      ...prev,
      [coinKey]: {
        selectedCoin: coin,
        inputValue: `${coin.name} - ${coin.current_price}$`,
        searchTerm: "",
      },
    }));
    setOpenInput(null);
  };

  const calculateHypotheticalPriceCoin = () => {
    const { selectedCoin: selectedCoin1 } = coinData.coin1;
    const { selectedCoin: selectedCoin2 } = coinData.coin2;

    if (!selectedCoin1 || !selectedCoin2) return null;
    const { market_cap: marketCap2, circulating_supply: supply2 } =
      selectedCoin2;
    const { circulating_supply: supply1 } = selectedCoin1;

    if (isNaN(supply1) || isNaN(supply2) || supply1 === 0) {
      return null;
    }

    return marketCap2 / supply1;
  };

  const calculateComparisonRatio = () => {
    const { selectedCoin: selectedCoin1 } = coinData.coin1;
    const { selectedCoin: selectedCoin2 } = coinData.coin2;

    if (!selectedCoin1 || !selectedCoin2) return null;

    const hypotheticalPriceBTC =
      selectedCoin2.market_cap / selectedCoin1.circulating_supply;
    return hypotheticalPriceBTC / selectedCoin1.current_price;
  };

  const hypotheticalPrice = calculateHypotheticalPriceCoin();
  const ratio = calculateComparisonRatio();

  return (
    <div className="backgroundBlur">
      <AnimatePresence>
        <motion.div
          key="modal"
          className="window"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate="visible"
        >
          <div className="compareModal">
            <div className="closeIcon__section">
              <SVG className="closeIcon" src={Close} onClick={close} />
            </div>
            <div className="compareTitle__section">
              <h2 className="compareTitle">
                Calculate the price of A with the <span>market cap</span> of B
              </h2>
            </div>
            <div>
              <div className="compareInput__section">
                <p className="selectText">Select A</p>
                <input
                  className="compareInput"
                  value={coinData.coin1.searchTerm || coinData.coin1.inputValue}
                  onChange={handleInputChange("coin1")}
                  onClick={() => setOpenInput("coin1")}
                  placeholder="Search or select a coin"
                  aria-label="Search or select Coin A"
                />
                <div className="arrowIcon__section">
                  {openInput === "coin1" ? (
                    <SVG src={ArrowUp} className="arrowIcon" />
                  ) : (
                    <SVG src={ArrowDown} className="arrowIcon" />
                  )}
                </div>
                {openInput === "coin1" && (
                  <div className="optionsSection">
                    {filterCoins1.length > 0 ? (
                      filterCoins1.map((coin) => (
                        <button
                          className="optionCoin"
                          key={coin.id}
                          onClick={() => handleSelectCoin("coin1")(coin)}
                          aria-label={`Select ${coin.name} for Coin A`}
                        >
                          <img
                            className="optCoinImg"
                            src={coin.image}
                            alt={coin.name}
                          />
                          {coin.name} ({coin.symbol}) - {coin.current_price}$
                        </button>
                      ))
                    ) : (
                      <div className="noResults">No results found</div>
                    )}
                  </div>
                )}
              </div>
              <div className="compareIcon__section">
                <SVG className="compareIcon" src={Compare} />
              </div>
              <div className="compareInput__section">
                <p className="selectText">Select B</p>
                <input
                  className="compareInput"
                  value={coinData.coin2.searchTerm || coinData.coin2.inputValue}
                  onChange={handleInputChange("coin2")}
                  onClick={() => setOpenInput("coin2")}
                  placeholder="Search or select a coin"
                  aria-label="Search or select Coin B"
                />
                <div className="arrowIcon__section">
                  {openInput === "coin2" ? (
                    <SVG src={ArrowUp} className="arrowIcon" />
                  ) : (
                    <SVG src={ArrowDown} className="arrowIcon" />
                  )}
                </div>
                {openInput === "coin2" && (
                  <div className="optionsSection">
                    {filterCoins2.length > 0 ? (
                      filterCoins2.map((coin) => (
                        <button
                          className="optionCoin"
                          key={coin.id}
                          onClick={() => handleSelectCoin("coin2")(coin)}
                          aria-label={`Select ${coin.name} for Coin B`}
                        >
                          <img
                            className="optCoinImg"
                            src={coin.image}
                            alt={coin.name}
                          />
                          {coin.name} ({coin.symbol})
                        </button>
                      ))
                    ) : (
                      <div className="noResults">No results found</div>
                    )}
                  </div>
                )}
              </div>
            </div>
            {hypotheticalPrice !== null && (
              <div className="comparisonResult">
                <p>
                  <span style={{ fontWeight: "700" }}>
                    {coinData.coin1.selectedCoin?.name}
                  </span>{" "}
                  price with the market cap of
                  <span style={{ fontWeight: "700" }}>
                    {" "}
                    {coinData.coin2.selectedCoin?.name}
                  </span>
                  :
                </p>
                <p className="resultFormula">
                  <strong>${hypotheticalPrice.toFixed(2)}</strong>
                  {ratio.toFixed(2) >= 1 ? (
                    <span style={{ color: "var(--blue)" }}>
                      {" "}
                      ({ratio.toFixed(2)})x
                    </span>
                  ) : (
                    <span style={{ color: "var(--orange)" }}>
                      {" "}
                      ({ratio.toFixed(2)})x
                    </span>
                  )}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
