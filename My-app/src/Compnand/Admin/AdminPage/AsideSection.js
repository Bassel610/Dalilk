import "./AdminPage.css"
import Logo from "../../../assast/Images/Logo.png"
import { Link } from "react-router-dom";
function AsideSection (props) {

    return ( 
        <>
            <div className="AsideSectionContaner">
                <div className="AsideSection">
                    <div className="Logo">
                        <Link to={"/"}><img  src={Logo} alt="logo" /></Link>
                    </div>
                    <div className="List">
                        <ul>
                            <li onClick={props.AllShopeOnclick} >All Shope</li>
                            <li onClick={props.EditShopeOnclick} >Edit Old Shope</li>
                            <li onClick={props.AddShopeOnclick} >Add New Shope</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AsideSection;