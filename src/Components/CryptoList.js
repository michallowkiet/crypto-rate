import React from "react";
import "./CryptoList.css";

const CryptoList = (props) => {
  return (
    <>
      <div className="Crypto-list">
        {props.data.map((el) => (
          <div className="Crypto-item" key={el.currency}>
            <div className="Crypto-text">
              Last rate:{" "}
              <span className={`Crypto-value ${el.class}`}>
                {el.last} {el.arrow}
              </span>
              <span>{el.currency}</span>[{el.symbol}]
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CryptoList;
