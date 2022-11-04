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
  const [filteredCryptoList, setfilteredCryptoList] = useState([]);

  const filterInputHandler = (event) => {
    setFilterInput(event.target.value.trim().toUpperCase());
  };

  const calcChange = (current, state) => {
    if (state === undefined || state.length === 0) {
      return 0;
    }

    return current - state.last;
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
            change: calcChange(el.last, state[index]),
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

  useEffect(() => {
    setfilteredCryptoList(() => {
      return crypto.filter((el) => el.currency.includes(filterInput));
    });
  }, [filterInput, crypto]);

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
