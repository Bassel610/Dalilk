import Header from "../../Compnand/sharedCom/Header/Header"
import Sort from "../../Compnand/DetilsCardContent/SortingSection/Sort"
import Cards from "../../Compnand/DetilsCardContent/CardsSection/Cards"
import { useState } from "react"
function DetilsCard (props) {


    return (
        <>
            <Header inputvalue={props.inputvalue} onchangefun={props.onchangefun} searchBTN={props.searchBTN}  id={props.id} />
            {/* <Sort /> */}
            <Cards search={props.search} />
        </>
    )
}
export default DetilsCard;