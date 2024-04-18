import { useEffect, useState, useContext } from "react"
import "./Sort.css"
import {TestContext} from "../../../App"

function Sort () {
    let [Conservative, setConservative] = useState([])
    let [AreaDalilk, setAreaDalilk] = useState([])
    let [HayDalilk, setHayDalilk] = useState([])
    let [catigoryDalilk, setcatigoryDalilk] = useState([])
    let [gizafilter, setgizafilter] = useState('');
    let [cairofilter, setcairofilter] = useState('');
    useEffect(() => {
        fetch('http://localhost:5000/ConservativeSort')
        .then(res=>res.json())
        .then(json=>{
            setConservative(json)
            // console.log(json)
        })
        fetch('http://localhost:5000/CatigorySort')
        .then(res=>res.json())
        .then(json=>{
            setcatigoryDalilk(json)
            // console.log(json)
        })
    }, [])
    const handleConservativeChangefetch = (event) => {
        const selectedOption = event.target.value;
        setgizafilter(selectedOption);
        // Dynamically fetch area data based on the selected Conservative option
        fetch('http://localhost:5000/AreaSort')
        .then(res => res.json())
        .then(json => {
            if (selectedOption === "الجيزة" ) {
                setAreaDalilk(json.الجيزه);
            }else if (selectedOption === "القاهرة" ) {
                setAreaDalilk(json.القاهره);
            }else {
                return ""
            }
        });
    };
    const handleAreaChange = (event) => {
        const selectedOption = event.target.value;
        setcairofilter(selectedOption);
    };

    const handleAreaChangefetch = (event) => {
        const selectedOption = event.target.value;
        setgizafilter(selectedOption);
        // Dynamically fetch area data based on the selected Conservative option
        fetch('http://localhost:5000/HaySort')
        .then(res=>res.json())
        .then(json=>{
            if (selectedOption === "اكتوبر"){
                setHayDalilk(json.اكتوبر)
            }else if (selectedOption === "الشيخ ذايد") {
                setHayDalilk(json.الشيخ_ذايد)
            }else{
                console.error("There Is Error In Name");
            }
        });
    };
    const handleElHayChange = (event) => {
        const selectedOption = event.target.value;
        setcairofilter(selectedOption);
    };

    let {ConservativeCon, setConservativeCon} = useContext(TestContext)

    return (
        <>
            <div className="SortSection">
                <div className="Contaner">
                    <div className="SortBox">
                    <select onChange={handleConservativeChangefetch}>
                        <option value="" disabled selected>Select an option</option>
                        {Conservative.map((sort) => (
                        <option key={sort.id} >{sort.name} </option>
                    ))}
                    </select>
                        <label>المحافظه</label>
                    </div>
                    <div className="SortBox">
                        <select onChange={(e) => {handleAreaChange(e);handleAreaChangefetch(e) }}>
                        <option value="" disabled selected>Select an option</option>
                        {AreaDalilk.map((sort) => (
                        <option key={sort.id} >{sort.Area} </option>
                    ))}
                        </select>
                        <label>منطقه</label>
                    </div>
                    <div className="SortBox">
                        <select onChange={handleElHayChange}>
                        <option value="" disabled selected>Select an option</option>
                        {HayDalilk.map((sort) => (
                        <option key={sort.id} >{sort.AlHay} </option>
                    ))}
                        </select>
                        <label>الحي</label>
                    </div >
                    <div className="SortBox">
                        <select>
                        <option value="" disabled selected>Select an option</option>
                        {catigoryDalilk.map((sort) => (
                        <option key={sort.id} >{sort.catigory} </option>
                    ))}
                        </select>
                        <label>التصنيفات</label>
                    </div >
                    <div className="SortBox">
                        <select>
                        <option value="" disabled selected>Select an option</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                        <label>التقييم</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sort