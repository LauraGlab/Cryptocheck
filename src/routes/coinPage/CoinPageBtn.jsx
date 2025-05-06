import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import CoinPageMenu from "./CoinPageMenu.jsx";
import ArrowDownIcon from "./../../assets/icons/icon-arrow-down.svg";
import ArrowRight from "./../../assets/icons/arrow-point-to-right.svg";
import ArrowUpIcon from "./../../assets/icons/icon-arrow-up.svg";
import "./../../css/coinPage/CoinPageBtn.css";

export default function CoinPageBtn({ name, currency, setCurrency }) {
  const [showMenu, setShowMenu] = useState(false);

  const handleToggle = useCallback(() => {
    setShowMenu((prev) => !prev);
  }, []);

  return (
    <div className="coinPageBtnSection">
      <div className="coinPageBackBtnSection">
        <Link className="backBtn" to="/">
          <div>Cryptocurrencies</div>
        </Link>
        <img
          className="arrowRightIcon"
          src={ArrowRight}
          alt="arrow right icon"
        />
        <p>{name} Price</p>
      </div>
      <button
        className="currencyMenuBtn"
        onClick={handleToggle}
        aria-label={`Change currency from ${currency}`}
      >
        {currency}
        {showMenu ? (
          <img
            className="arrowBtn"
            src={ArrowUpIcon}
            alt=""
            aria-hidden="true"
          />
        ) : (
          <img
            className="arrowBtn"
            src={ArrowDownIcon}
            alt=""
            aria-hidden="true"
          />
        )}
        {showMenu && (
          <div className="backgroundBlur">
            <CoinPageMenu setCurrency={setCurrency} />
          </div>
        )}
      </button>
    </div>
  );
}