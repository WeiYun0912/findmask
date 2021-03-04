import React, { useState, useEffect } from "react";
import Mask from "./Mask";
export default function Masks({ mask }) {
  const [complete, setComplete] = useState([]);
  const [county, setCounty] = useState("");
  const [townShip, setTownShip] = useState([]);
  const [countyName, setCountyName] = useState("");
  const [townName, setTownName] = useState("");
  const [filterMasks, setFilterMasks] = useState([]);
  const [searchPha, setSearchPha] = useState("");
  const [searchType, setSearchType] = useState(false);
  const [filterAdult, setFilterAdult] = useState(false);
  const [filterChildren, setFilterChildren] = useState(false);

  useEffect(() => {
    getCounty();
  }, [townShip]);
  //從JSON檔取出縣市名稱
  const getCounty = async () => {
    // console.log(data);
    let data = await require("./county.json");
    const county = data.map(cty => {
      // console.log(type);
      return <option value={cty.name}>{cty.name}</option>;
    });
    setComplete(data);
    // setCounty();
    setCounty(county);
  };

  //從縣市關聯出鄉鎮市區名稱
  const setCountyNameBySelect = e => {
    let county = e.target.value;
    setCountyName(county);
    const townsForcounty = complete.filter(town => {
      return town.name === county;
    });

    const towns = townsForcounty.map(town => {
      return town.districts;
    });
    const town = towns[0].map(town => {
      return <option value={town.name}>{town.name}</option>;
    });
    setTownShip(town);
  };

  //設定鄉鎮名稱
  const setTownNameBySelect = e => {
    setTownName(e.target.value);
  };

  //更新搜尋字
  const updateSearchPha = e => {
    setSearchPha(e.target.value);
  };

  //更新搜尋種類
  const updateSearchType = () => {
    setSearchType(!searchType);
  };

  //勾選無成人口罩
  const updateFilterAdult = () => {
    setFilterAdult(!filterAdult);
  };
  //勾選無兒童口罩
  const updateFilterChildren = () => {
    setFilterChildren(!filterChildren);
  };

  //檢查搜尋的是哪種狀態
  const searchMasks = async () => {
    if (searchType === false) {
      if (countyName === "" || townName === "") {
        alert("請選擇縣市或鄉鎮市區");
      } else {
        let filterMask = await mask.filter(val => {
          return val.properties.address.match(countyName + townName) != null;
        });
        setFilterMasks(filterMask);
      }
    } else {
      if (searchPha === "") {
        alert("請輸入藥局名稱");
      } else {
        let filterMask = await mask.filter(val => {
          return val.properties.name.match(searchPha) != null;
        });
        setFilterMasks(filterMask);
      }
    }
  };

  return (
    <div>
      <div className="searchArea">
        <div className="form-check">
          <div className="checkbox-fix">
            <input type="checkbox" id="search1" onChange={updateFilterAdult} />
            <label className="form-check-label" for="search1">
              尚有成人口罩
            </label>
            <input
              type="checkbox"
              id="search2"
              onChange={updateFilterChildren}
            />
            <label className="form-check-label" for="search2">
              尚有兒童口罩
            </label>
          </div>
        </div>
      </div>
      {/* <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="checkbox"
          id="inlineCheckbox1"
          value="option1"
        />
        <label class="form-check-label" for="inlineCheckbox1">
          1
        </label>
      </div> */}

      <div className="input-group mb-3 mt-3">
        {searchType ? (
          <button
            className="btn btn-info button-fix"
            onClick={updateSearchType}
          >
            查詢縣市藥局
          </button>
        ) : (
          <button
            className="btn btn-success button-fix"
            onClick={updateSearchType}
          >
            查詢藥局名稱
          </button>
        )}
      </div>
      <div className="input-group mb-3 mt-3">
        {searchType ? (
          <input
            type="text"
            className="form-control"
            id=""
            placeholder="輸入藥局名稱"
            onChange={updateSearchPha}
          />
        ) : (
          <React.Fragment>
            <select
              className="custom-select mr-3 select-fix"
              onChange={setCountyNameBySelect}
            >
              <option defaultValue>請選擇縣市區域</option>
              {county}
            </select>
            <select
              className="custom-select select-fix"
              onChange={setTownNameBySelect}
            >
              <option defaultValue>請選擇鄉鎮市區</option>
              {townShip}
            </select>
          </React.Fragment>
        )}

        {/* <select
          className="custom-select mr-3 select-fix"
          onChange={setCountyNameBySelect}
        >
          <option defaultValue>請選擇縣市區域</option>
          {county}
        </select>
        <select
          className="custom-select select-fix"
          onChange={setTownNameBySelect}
        >
          <option defaultValue>請選擇鄉鎮市區</option>
          {townShip}
        </select> */}
        <button
          className="btn btn-primary ml-3 button-fix"
          onClick={searchMasks}
        >
          查詢
        </button>
      </div>

      <Mask
        filterMasks={filterMasks}
        filterAdult={filterAdult}
        filterChildren={filterChildren}
      />
    </div>
  );
}
