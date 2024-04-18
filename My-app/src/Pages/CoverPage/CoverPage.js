import Header from "../../Compnand/sharedCom/Header/Header.js"
import Cover from "../../Compnand/Cover/Cover.js"
function CoverPage (props) {
    return (
        <>
            <Header inputvalue={props.inputvalue} onchangefun={props.onchangefun} searchBTN={props.searchBTN}  id={props.id}/>
            <Cover />
        </>
    )
}

export default CoverPage