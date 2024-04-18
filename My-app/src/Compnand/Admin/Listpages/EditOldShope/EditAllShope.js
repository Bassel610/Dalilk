import React, { useState, useEffect } from 'react';
import "./EditOldSShope.css"

function EditAllShope() {
    const [Name, setName] = useState('');
    const [Address, setAddress] = useState('');
    const [LandMark, setLandMark] = useState('');
    const [category, setCategory] = useState('');
    const [location, setlocation] = useState('');
    const [rate, setRate] = useState('');
    const [shopData, setShopData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [Conservative, setConservative] = useState('');
    const [Area, setArea] = useState('');
    const [Hay, setHay] = useState('');
    useEffect(()=> {
        fetch('http://localhost:5000/AllShops')
        .then(res => res.json())
        .then(res => {
            console.log(res)
            setShopData(res)})
    }, []);

    // Function to search for shops based on search query
    const handleSearch = () => {
        const foundShops = shopData.filter(shop => shop.Name.includes(searchQuery));
        setSearchResult(foundShops);
    };

    // Function to populate inputs with selected shop data
    const handleSelectShop = (selectedShop) => {
        // console.log(selectedShop)
        setName(selectedShop.Name);
        setAddress(selectedShop.Address); // Joining the Address array into a string
        setLandMark(selectedShop.LandMark);
        setCategory(selectedShop.category); // Joining the category array into a string
        setlocation(selectedShop.location); // Using Hay from AddressDetiles
        setConservative(selectedShop.AddressDetiles.Conservative); // Using Hay from AddressDetiles
        setArea(selectedShop.AddressDetiles.Area); // Using Hay from AddressDetiles
        setHay(selectedShop.AddressDetiles.Hay); // Using Hay from AddressDetiles
        setRate(selectedShop.rate);
    };


    let handleUpdateOldShop = async (shopId, updatedData) => {
        try {
            let response = await fetch(`http://localhost:5000/editShop/${shopId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });
            if (response.ok) {
                console.log('Shop updated successfully');
                setShopData(updatedData)
            } else {
                console.error('Failed to update shop:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating shop:', error);
        }
    };
    
    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchResult.length > 0) {
            handleUpdateOldShop(parseInt(searchResult[0].id), {
                Name,
                Address,
                LandMark,
                category, 
                rate,
                location,
                Conservative,
                Area,
                Hay
            });
        } else {
            console.error('No shop selected for editing');
        }
    };
    
    return (
        <div className="EditShopForm">
            <h2>Edit Shop</h2>
            <div className="search-container">
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search shop by any field" />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="search-results">
                {searchResult.map((shop) => (
                    <div key={shop.id} >
                        <h3>{shop.Name}</h3>
                        <button onClick={() => handleSelectShop(shop)}>Show Data</button>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Name</span>
                    <input type="text" value={Name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                    <span>Address</span>
                    {Address ? Address.map((ele, index) => (
                        <input key={index} type="text" value={ele} onChange={(e) => {
                            const updatedAddress = [...Address];
                            updatedAddress[index] = e.target.value;
                            setAddress(updatedAddress);
                        }} />
                    )) : <input />}
                </label>
                <label>
                    <span>LandMark</span>
                    <input type="text" value={LandMark} onChange={(e) => setLandMark(e.target.value)} />
                </label>
                <label>
                    <span>Category</span>
                    {category ? category.map((ele, index) => (
                        <input key={index} type="text" value={ele} onChange={(e) => {
                            const updatedCategory = [...category];
                            updatedCategory[index] = e.target.value;
                            setCategory(updatedCategory);
                        }} />
                    )) : <input />}
                </label>
                <label>
                <span>location</span>
                {location ? location.map((ele, index) => (
                    <input key={index} type="text" value={ele} onChange={(e) => {
                        const updatedLocation = [...location];
                        updatedLocation[index] = e.target.value;
                        setlocation(updatedLocation);
                    }} />
                )) : <input />}
                </label>
                <label>
                    <span>Rate</span>
                    <input type="text" value={rate} onChange={(e) => setRate(e.target.value)} />
                </label>
                <label>
                    <span>Conservative</span>
                    <input type="text" value={Conservative} onChange={(e) => setConservative(e.target.value)} />
                </label>
                <label>
                    <span>Area</span>
                    <input type="text" value={Area} onChange={(e) => setArea(e.target.value)} />
                </label>
                <label>
                    <span>Hay</span>
                    <input type="text" value={Hay} onChange={(e) => setHay(e.target.value)} />
                </label>
                <button type="submit" >Update Shop</button>
            </form>
        </div>
    );
}

export default EditAllShope;
