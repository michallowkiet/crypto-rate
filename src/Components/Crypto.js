import React, { useEffect, useState } from "react";
import "./Crypto.css";
import CryptoList from "./CryptoList";
import axios from "axios";

const baseURL = "https://blockchain.info/ticker";

const formatCurrency = (symbol, value) =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: symbol,
    currencyDisplay: "narrowSymbol",
  }).format(value);

const Crypto = (props) => {
  const [crypto, setCrypto] = useState([]);
  const [filterInput, setFilterInput] = useState("");

  const filteredCryptoList = crypto.filter((el) => {
    return el.currency.includes(filterInput);
  });

  const filterInputHandler = (event) => {
    setFilterInput(event.target.value.trim().toUpperCase());
  };

  const getClass = (changedValue) => {
    if (changedValue === undefined || changedValue === 0) {
      return "";
    }

    return changedValue > 0 ? "up" : "down";
  };

  const getArrow = (changedValue) => {
    if (changedValue === 0) {
      return String.fromCharCode(8596);
    }

    return changedValue > 0
      ? String.fromCharCode(8593)
      : String.fromCharCode(8595);
  };

  const getData = () => {
    axios.get(baseURL, { mode: "cors" }).then((res) =>
      setCrypto((state) => {
        const cryptoList = [];

        Object.values(res.data).forEach((el, index) => {
          cryptoList.push({
            last: el.last,
            currency: el.symbol,
            symbol: formatCurrency(el.symbol, el.last)
              .split("")
              .slice(-1)
              .join(),
            class: getClass(el.last - state[index]?.last),
            arrow: getArrow(el.last - state[index]?.last),
          });
        });

        return cryptoList;
      })
    );
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="Crypto">
      <div>
        <input
          type="text"
          value={filterInput}
          onChange={filterInputHandler}
          placeholder="Currency code"
        />
      </div>
      <CryptoList data={filteredCryptoList} />
    </div>
  );
};

export default Crypto;
