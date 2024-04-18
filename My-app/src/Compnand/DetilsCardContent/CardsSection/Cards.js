import { useContext, useEffect, useState } from "react";
import "./Cards.css";
import "../SortingSection/Sort.css";
import { TestContext } from "../../../App";
import { toInteger } from "lodash";
import { Navigate, useNavigate } from "react-router";

function Cards(props) {
  let [cardDalilk, setcardDalilk] = useState([]);
  let [AreaDalilk, setAreaDalilk] = useState([]);
  let [HayDalilk, setHayDalilk] = useState([]);
  let [conservativeChange, setconservativeChange] = useState('');
  let [areafilter, setareafilter] = useState('');
  let [hayfilter, setHayFilter] = useState('');
  let [catigoryfilter, setCatigoryFilter] = useState('');
  let [ratefilter, setratefilter] = useState('');
  
  useEffect(() => {
    fetch('http://localhost:5000/AllShops')
    .then(res => res.json())
    .then(json => {
      setcardDalilk(json);
    });
  }, []);

  const handleElHayChange = (event) => {
    const selectedOption = event.target.value;
    setHayFilter(selectedOption);
  };

  const handleCatigoryChange = (event) => {
    const selectedOption = event.target.value;
    setCatigoryFilter(selectedOption);
  };

  const handleRateChange = (event) => {
    const selectedOption = event.target.value;
    setratefilter(selectedOption);
  };

  const handleAreaChange = (event) => {
    const selectedOption = event.target.value;
    setareafilter(selectedOption);
  };

  const handleConservativeChangefetch = (event) => {
    const selectedOption = event.target.value;
    console.log("Selected conservative:", selectedOption); // Log selected value
    setconservativeChange(selectedOption); // Correctly setting the state
    let arr = cardDalilk.filter(ele => ele.Address.some(addr => addr.includes(selectedOption))).map(ele => ele.AddressDetiles.Area);
    setAreaDalilk(arr);
  };

  const handleAreaChangefetch = (event) => {
    const selectedOption = event.target.value;
    setconservativeChange(selectedOption);
    let arr = cardDalilk.filter(ele => ele.Address.some(addr => addr.includes(selectedOption))).map(ele => ele.AddressDetiles.Hay);
    setHayDalilk(arr);
  };

  const filterProducts = () => {
    let filteredProducts = cardDalilk;
    console.log(cardDalilk)
    // if (gizafilter) {
      filteredProducts = filteredProducts.filter((product) =>
        product.Address.some((addr) => addr.includes(conservativeChange))
      );
    // }

    // if (cairofilter) {
      filteredProducts = filteredProducts.filter((product) =>
        product.Address.some((addr) => addr.includes(areafilter))
      );
    // }

    // if (hayfilter) {
      filteredProducts = filteredProducts.filter((product) =>
        product.Address.some((addr) => addr.includes(hayfilter))
      );
    // }

    // if (catigoryfilter) {
      filteredProducts = filteredProducts.filter((product) =>
        product.category.some((cat) => cat.includes(catigoryfilter))
      );
    // }

    // if (ratefilter) {
      filteredProducts = filteredProducts.filter((product) =>
        product.rate.toString().includes(ratefilter)
      );
    // }

    if (props.search) {
      filteredProducts = filteredProducts.filter((card) =>
        card.Name.includes(props.search)
      );
    }

    return filteredProducts;
  };

  let removeAllFilter = () => {
    setconservativeChange('');
    setareafilter('');
    setHayFilter('');
    setCatigoryFilter('');
    setratefilter('');
  };

  return (
    <>
      <div className="SortSection">
        <div className="Contaner">
          <div className="SortBox">
            <label>المحافظه</label>
            <select onChange={(e) => {handleConservativeChangefetch(e)}}>
              <option disabled selected>Select an option</option>
              {cardDalilk.map((sort, index) => (
                <option value={sort.AddressDetiles.Conservative} key={index}>{sort.AddressDetiles.Conservative}</option>
              ))}
            </select>
          </div>
          <div className="SortBox">
            <label>منطقه</label>
            <select onChange={(e) => { handleAreaChange(e); handleAreaChangefetch(e); }}>
              <option disabled selected>Select an option</option>
              {AreaDalilk.map((sort, index) => (
                <option value={sort} key={index}>{sort}</option>
              ))}
            </select>
          </div>
          <div className="SortBox">
            <label>الحي</label>
            <select onChange={handleElHayChange}>
              <option value="" disabled selected>Select an option</option>
              {HayDalilk.map((sort, index) => (
                <option value={sort} key={index}>{sort}</option>
              ))}
            </select>
          </div>
          <div className="SortBox">
            <label>التصنيفات</label>
            <select onChange={handleCatigoryChange}>
              <option value="" disabled selected>Select an option</option>
              {cardDalilk.map((sort, index) => (
                sort.category.map((ele, eleIndex) => (
                  <option value={ele} key={`${index}-${eleIndex}`}>{ele}</option>
                ))
              ))}
            </select>
          </div>
          <div className="SortBox">
            <label>التقييم</label>
            <select onChange={handleRateChange}>
              <option value="" disabled selected>Select an option</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="SortBox">
            <span className="RemoveAllSort" onClick={removeAllFilter}>الكل</span>
          </div>
        </div>
      </div>
      <div className="Cards">
        <div className="Contaner">
          {filterProducts().length > 0 ?  
            filterProducts().map((card, index) => (
              <div className="Card" key={index}>
                <div className="Title">{card.Name}</div>
                {card.Address.map((ele, index) => (
                  <div className="Adress" key={index}><span className="ScoTitle"> عنوان {index + 1} :</span> {ele}</div>
                ))}
                <div className="LandMark"><span className="ScoTitle">علامه مميزه:</span> {card.LandMark}</div>
                <div className="Type">
                  <span className="ScoTitle">النوع:</span>
                  {card.category.map((ele, index) => (
                    <span className="Catigory" key={index}>{ele}</span>
                  ))}
                </div>
                <div className="Rate"><span className="ScoTitle">التقييم:</span>{card.rate}</div>
                {card.location.map((ele, index) => (
                <div className="Adress" style={{direction: "rtl"}}><span className="ScoTitle"> اللوكيشين {index + 1}:</span>  {ele} </div>
                ))}
              </div>
            )) :
            <div style={{width: "100%", margin: "18px"}}>
              <div style={{textAlign: "center", fontSize: "18px", fontWeight: "500"}}>اسف...المكان ده لسه مش موجود</div>
            </div>
          }
        </div>
      </div>
    </>
  );
}

export default Cards;
