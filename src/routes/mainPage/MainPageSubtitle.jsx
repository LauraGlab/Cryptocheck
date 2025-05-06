import React from "react";
import "./../../css/mainPage/MainPageSubtitle.css";

export default function MainPageSubtitle() {
  return (
    <div className="subtitleSection">
      <div className="mobilePage">
        <h2 className="subtitle">
          Real-Time Cryptocurrency <br />
          <span className="trackingText">Tracking</span> &{" "}
          <span className="insightsText">Insights</span>
        </h2>
        <p className="description">
          CryptoCheck delivers live cryptocurrency tracking, market analysis,
          and expert insights in one convenient platform. Whether you're a
          seasoned trader or a crypto enthusiast, stay informed with real-time
          data, price updates, and trends to make smarter decisions in the
          fast-evolving world of digital currencies. You can also switch to your
          preferred currency and access a converter for your chosen coin by
          simply clicking the 'more info' button. Enjoy!
        </p>
        <div className="scrollNext__section">
          <button
            className="scrollNext"
            onClick={() => {
              const element = document.getElementById("nextPart");
              element?.scrollIntoView({
                behavior: "smooth",
                margin: "10px",
              });
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}