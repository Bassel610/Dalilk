import React, { useState } from "react";
import PasswordForm from "../Password/Password"; // Import your password component here
import AsideSection from "../../Compnand/Admin/AdminPage/AsideSection";
import CenterSection from "../../Compnand/Admin/AdminPage/CenterSection";
import AddNewShope from "../../Compnand/Admin/Listpages/AddNewshope/AddNewShope";
import AllShope from "../../Compnand/Admin/Listpages/AllShops/AllShope";
import EditAllShope from "../../Compnand/Admin/Listpages/EditOldShope/EditAllShope";

function Dashboard() {
    let [allShopeState, setAllShopeState] = useState(false)
    let [editOldShopeState, setEditOldShopeState] = useState(false)
    let [addNewShopeState, setAddNewShopeState] = useState(false)
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const handlePasswordSubmit = (enteredPassword) => {
    if (enteredPassword === "BesoBaselBslaBsbs") { // Change "yourPasswordHere" to your desired password
      setAuthenticated(true);
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  return (
    <>
      {!authenticated ? (
        <PasswordForm onSubmit={handlePasswordSubmit} />
      ) : (
        <div style={{ width: "100%", height: "100%", backgroundColor: "rgb(238 238 238)", position: "absolute" }}>
          <AsideSection
            AllShopeOnclick={() => {
              setAllShopeState(true);
              setEditOldShopeState(false);
              setAddNewShopeState(false);
            }}
            EditShopeOnclick={() => {
              setEditOldShopeState(true);
              setAllShopeState(false);
              setAddNewShopeState(false);
            }}
            AddShopeOnclick={() => {
              setAddNewShopeState(true);
              setAllShopeState(false);
              setEditOldShopeState(false);
            }}
          />
          <div>
            <CenterSection
              CenterData={
                allShopeState ? <AllShope /> :
                editOldShopeState ? <EditAllShope /> :
                addNewShopeState ? <AddNewShope /> : <AllShope /> 
              }
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
