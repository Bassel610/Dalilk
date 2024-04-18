import "./AllShope.css"
import { useEffect, useState } from "react"

function AllShope () {
    let [allshopedata, setallshopedata] = useState('')

    useEffect(()=> {
        fetch('http://localhost:5000/AllShops')
        .then(res => res.json())
        .then(res => {
            console.log(res)
            setallshopedata(res)})
    },[])

    let handelDeleteShope = async (shopID) => {
        try {
            let res = await fetch(`http://localhost:5000/deleteShops/${shopID}`, {
                method: 'DELETE'
            })

            if (res.ok) {
                let updateShops = allshopedata.filter((shope) => shope.id !== shopID);
                setallshopedata(updateShops);
                console.log('Shop deleted successfully');
            }
        }catch (error){
            console.error('Error deleting shop:', error)
        }  
    }
    return (
        <>
            <div className="AllShope">
                {allshopedata.length > 0 ? allshopedata.map((shop, index) => {
                    return (
                        <div className="Contaner">
                            <h2>AllShopes</h2>
                            <div className="Detiles" key={index}>
                                <h2 className="Title">{shop.Name}</h2>
                                {shop.Address.map((ele, index) => (
                                    <div className="Adress" key={index}><span className="ScoTitle"> عنوان {index + 1} :</span> {ele}</div>
                                ))}
                                <div className="LandMark"><span className="ScoTitle">علامه مميزه:</span> {shop.LandMark}</div>
                                <div className="Type">
                                    <span className="ScoTitle">النوع:</span>
                                    {shop.category.map((ele, index) => (
                                    <span className="Catigory" key={index}>{ele}</span>
                                    ))}
                                </div>
                                <div className="Rate"><span className="ScoTitle">التقييم:</span>{shop.rate}</div>
                                {shop.location.map((ele, index) => (
                                    <div className="Location"><span> location {index + 1} :</span> {ele}</div>
                                ))}
                            </div>
                            <div className="Delete" onClick={() => handelDeleteShope(shop.id)}>Delete</div>
                        </div>
                    )
}) :         <div style={{ textAlign: "center", fontSize: "20px", color: "#999", marginTop: "50px" }}>No shops available</div>}
            </div>
        </>
    )
}

export default AllShope