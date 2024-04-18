import GreenPoster from "../../assast/Images/GreenPoster.png"
import searchun from "../../assast/Images//searchun.gif"
import "./Cover.css"
function CoverPage() {
    return (
        <>
            <div className="CoverPage">
                <div className="FullPage">
                    <div className="BigImg">
                        <img src={GreenPoster} alt="SEARCH" />
                    </div>
                    <div className="CoverContent">
                        <div className="ImgCoverContent">
                            <img className="BigIcon" src={searchun} alt="dd" />
                        </div>
                        <div className="TextCoverContent">
                            <div>دوّر</div>
                        </div>
                        <div className="ScoTextCoverContent">
                            <div>عايز تروح اي مكان؟</div>
                            <div>هتروح بسهوله</div>
                        </div>
                    </div>
                </div>
            </div>
        </> 
    )
}
export default CoverPage