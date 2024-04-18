import {useState } from "react";
import axios from "axios";
import "./AddNewShope.css"
function AddNewShope() {
    let [Name, setName] = useState('')
    let [LandMark, setLandMark] = useState('')
    let [rate, setrate] = useState('')
    let [AddressinputValue, setAddressinputvalue] = useState('');
    let [locationinputValue, setlocationinputValue] = useState('');
    let [category, setcategory] = useState([])
    let [scocategory, setscocategory] = useState([])
    let [location, setlocation] = useState([])
    const [Address, setAddress] = useState([]);
    const [Conservative, setConservative] = useState([]);
    const [Area, setArea] = useState([]);
    const [Hay, setHay] = useState([]);

    let AllAddressDetiles = {
        Conservative,
        Area,
        Hay
    }

    let handlesupmit = async (e) => {
        e.preventDefault();
        try {
            let response = await axios.post('http://localhost:5000/AllShops', {
                Name,
                category: [...category, scocategory],
                Address,
                LandMark,
                rate,
                location,
                AddressDetiles: AllAddressDetiles
            });
    
            console.log(response.data);
            setName('');
            setLandMark('');
            setlocation('');
            setrate('');
            setcategory([]);
            setscocategory([]);
            setAddress([]);
        } catch (error) {
            console.error("error adding shop:", error);
        }
    }

    const addNewInpu = () => {
        setcategory([...category, '']); 
    };

    let handleCatigoryonchange = (index, e) => {
        let values = [...category];
        values[index] = e.target.value;
        setcategory([...values]);
    }

    const handleButtonClickAddress = () => {
        const numInputs = parseInt(AddressinputValue);
        setAddress(Array.from({ length: numInputs }, (_, index) => index + 1));
    };   

    let handleInputChange = (index, e) => {
        let values = [...Address];
        values[index] = e.target.value;
        setAddress(values);
    };
    
    let handleRemove = (index) => {
        let values = [...Address];
        values.splice(index, 1);
        setAddress(values);
    };


    return (
        <>
            <div className="AddNewShope">
                <h1>Admin Page</h1>
                <form onSubmit={handlesupmit}>
                    <label>
                        <span>Name</span>
                        <input type="text" value={Name} onChange={(e) => setName(e.target.value)}></input>
                    </label>
                    <label>
                        <span>LandMark</span>
                        <input type="text" value={LandMark} onChange={(e) => setLandMark(e.target.value)}></input>
                    </label>
                    <label>
                        <span>Category</span>
                        <div className="Category">
                            <input type="text" value={scocategory}  onChange={(e) => setscocategory(e.target.value)}></input>
                        </div>
                        {category.map((ele, index) => (
                            <div className="Category" key={index}>
                                <input 
                                    type="text" 
                                    value={ele} 
                                    onChange={(e) => handleCatigoryonchange(index, e)} 
                                    placeholder={`Category ${index + 1}`} 
                                />
                                <div className="CatigoryRemoveBtn">Remove</div>
                            </div>
                        ))}
                        <button type="button" className="CatigorBtn" onClick={addNewInpu}>Add Category</button>
                    </label>
                    <label>
                        <span>How Many shope You Have</span>
                        <div>
                    <input value={AddressinputValue} onChange={(e) => setAddressinputvalue(e.target.value)} />
                    {Address.map((ele, index) => (
                        <div className="Address" key={index}>
                            <input value={ele}  onChange={(e) => handleInputChange(index, e)} type="text"placeholder={`Shop ${index + 1}`} />
                            <div className="AddressRemoveBtn" onClick={() => handleRemove(index)}>Remove</div>
                        </div>
                    ))}
                    <div className="AddressBtn" onClick={handleButtonClickAddress}>Add</div>
                    </div>
                    </label>
                    <label>
                        <span>Please Write All location For your All Address </span>
                        <div>
                    {Address.length > 1 ? Address.map((ele, index) => (
                        <div className="Address" key={index}>
                            <input value={ele}  onChange={(e) => handleInputChange(index, e)} type="text"placeholder={`Shop ${index + 1}`} />
                            {/* <div className="AddressRemoveBtn" onClick={() => handleRemove(index)}>Remove</div> */}
                        </div>
                    )): <input />}
                    {/* <div className="AddressBtn" onClick={handleButtonClicklocation}>Add</div> */}
                    </div>
                    </label>
                    <label>
                        <span>rate</span>
                        <input type="text" value={rate} onChange={(e) => setrate(e.target.value)}></input>
                    </label>
                    <label>
                        <h2>Address Detiels</h2>
                        <div>
                            <h5>Conservative</h5>
                            <input type="text" value={Conservative} onChange={(e) => setConservative(e.target.value)}></input>
                        </div>
                        <div>
                            <h5>Area</h5>
                            <input type="text" value={Area} onChange={(e) => setArea(e.target.value)}></input>
                        </div>
                        <div>
                            <h5>Hay</h5>
                            <input type="text" value={Hay} onChange={(e) => setHay(e.target.value)}></input>
                        </div>
                    </label>
                    <button type="submit">submit</button>
                </form>
                <div>
                <div>
                </div>
                </div>
            </div>
        </>
    )
}
export default AddNewShope