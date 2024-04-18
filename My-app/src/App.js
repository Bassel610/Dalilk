import { useState, createContext, useEffect } from 'react';
import './App.css';
import CoverPage from './Pages/CoverPage/CoverPage';
import DetilsCard from './Pages/DetilsCard/DetilsCard';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Dashpoard from './Pages/Dashpoard/Admin';

export let TestContext = createContext(null);

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  let [search, setsearch] = useState('');
  const [shouldRefetch, setShouldRefetch] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    if (shouldRefetch) {
      // Perform the refetch logic here
      console.log('Refetching data...');
      setShouldRefetch(false); // Reset the refetch flag
    }
  }, [shouldRefetch]);

  let handleSearchValue = (e) => {
    let searchinput = document.getElementById("SearchInput");
    let searchValue = searchinput.value;
    setsearch(searchValue);
    console.log(searchValue);

  if (searchValue.trim() !== "") {
    setsearch(searchValue);
    console.log(searchValue);

    // Trigger refetch when the search term changes
    setShouldRefetch(true);

    navigate(`DetilsCard?search=${searchValue}`);
    setSearchTerm('');
  }
  };

  let [ConservativeCon, setConservativeCon] = useState();

  let contxt = { ConservativeCon, setConservativeCon };

  return (
    <TestContext.Provider value={contxt}>
      <div className="App">
          <Routes>
            <Route path='/' element={<CoverPage id="SearchInput" inputvalue={searchTerm} onchangefun={(e) => setSearchTerm(e.target.value)} searchBTN={handleSearchValue} />} />
            <Route path='/DetilsCard' element={<DetilsCard search={search} id="SearchInput" inputvalue={searchTerm} onchangefun={(e) => setSearchTerm(e.target.value)} searchBTN={handleSearchValue} />} />
            <Route path='/Dashpoard' element={<Dashpoard />} />
          </Routes>
      </div>
    </TestContext.Provider>
  );
}

export default App;
