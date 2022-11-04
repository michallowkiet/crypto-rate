import React from "react";
import "./CryptoList.css";

const checkChange = (changedValue) => {
  if (changedValue === 0) {
    return;
  }

  return changedValue > 0 ? "up" : "down";
};

const getArrow = (changedValue) => {
  if (changedValue === 0) {
    return <span>&harr;</span>;
  }

  return changedValue > 0 ? <span>&uarr;</span> : <span>&darr;</span>;
};

const CryptoList = (props) => {
  return (
    <>
      <div className="Crypto-list">
        {props.data.map((el) => (
          <div className="Crypto-item" key={el.currency}>
            <div className="Crypto-text">
              Last rate:{" "}
              <span className={`Crypto-value ${checkChange(el.change)}`}>
                {el.last} {getArrow(el.change)}
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
