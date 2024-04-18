import { Link } from "react-router-dom";
import Logo from "../../../assast/Images//Logo.png"
import "./Header.css"
function Header (props) {
    return (
        <>
            <div className="Header">
            <div className="CoverNavBar">
                <div className="Logo Flex">
                    <Link to={"/"}><img className="LogoImg" src={Logo} alt="logo" /></Link>
                </div>
                <div className="Search">
                    <input value={props.inputvalue} onChange={props.onchangefun} id={props.id}/>
                    <div className="D"   onClick={props.searchBTN}>
                        <span>بحث</span>
                    </div>
                </div>
                <div className="CatList">
                    <ul>
                        <Link to={"/DetilsCard"}><li>الكل</li></Link>
                        <Link to={"/DetilsCard"}><li>خضاري</li></Link>
                        <Link to={"/DetilsCard"}><li>فرارجي</li></Link>
                        <Link to={"/DetilsCard"}><li>جزارين</li></Link>
                        <Link to={"/DetilsCard"}><li>جزارين</li></Link>
                        <Link to={"/DetilsCard"}><li>عطارين</li></Link>
                        <Link to={"/DetilsCard"}><li>بقاله</li></Link>
                        <Link to={"/DetilsCard"}><li>مطاعم</li></Link>
                    </ul>
                </div>
                <div className="CatListDis">
                    <ul>
                        <Link to={"/DetilsCard"}><li>الكل</li></Link>
                        <Link to={"/DetilsCard"}><li>خضار</li></Link>
                        <Link to={"/DetilsCard"}><li>بقاله</li></Link>
                        <Link to={"/DetilsCard"}><li>مطاعم</li></Link>
                    </ul>
                </div>
            </div>
            </div>
        </>
    )
}

export default Header;