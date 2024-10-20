import React, { useState, useEffect } from 'react'
import { useFetcher } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import data from './colleges.json';
import Table from 'react-bootstrap/Table';
import Map from './map';

function App() {
  const [keyword, setKeyword] = useState('');         // State for keyword search
  const [n, setN] = useState(20);                     // State for number of top colleges
  const [isKeywordSearch, setIsKeywordSearch] = useState(false);
  const [filteredData, setFilteredData] = useState([]);    // State for filtered colleges
  const [selectedLocation, setSelectedLocation] = useState([37.8, -97]);
  const [favorites, setFavorites] = useState([]);

  //Load favorites from localStorage when the component mounts
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);
  
  //note: can have many useEffect block
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Function to filter and limit colleges
  const filterData = () => {
    let updatedColleges = data;
    
    if (isKeywordSearch && keyword) {
      updatedColleges = updatedColleges.filter((college) =>
       college.displayName.toLowerCase().includes(keyword.toLowerCase()) 
        /*  college.state.toLowerCase()===(keyword.toLowerCase()) && college.sortRank < 100 */
      );
    }
    else if (n) {   //use picks top n schools
      if (n === 8)  //Ivy Leagues selectd
        updatedColleges = updatedColleges.filter(c => c.iconType === "Ivy");
      else
        updatedColleges = updatedColleges.slice(0, n);// Limit the number of colleges to `n`
    }

    console.log(updatedColleges.length);
    setFilteredData(updatedColleges);
  };

  // Update the list of colleges when either keyword or `n` changes
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    console.log("before filterData");
    filterData();
  }, [keyword, n, isKeywordSearch, selectedLocation]);

  const handleKeywordSubmit = (e) => {
    const newKey = e.target.value;
    setKeyword(newKey);
    //e.preventDefault();
    setIsKeywordSearch(true);
  };

  const handleNChange = (e) => {
    setN(Number(e.target.value));
    setIsKeywordSearch(false); // Disable keyword search when `n` is selected
  };

  const handleZoom = (lat, lon) => {
    setSelectedLocation([lat, lon]);
  }

  const handleFavoriteClick = (college) => {
    //console.log("clicked");
    college.isFavorite = !college.isFavorite;
    if (favorites.includes(college.xwalkId)) {
      setFavorites(favorites.filter(fav => fav !==college.xwalkId)); // Remove from favorites
    } else {
      setFavorites([...favorites, college.xwalkId]); // Add to favorites
    }
  };

  return (
    <>
      <div id="sidebar">
        {/* <h2>Search</h2> */}
        <div>
        <form>
          <input id="keyword" name="keyword" type="search" placeholder='' value={keyword} 
                 onChange={handleKeywordSubmit}></input>
        </form>  
       
          <select id="n" onChange={handleNChange} value={n}>
            {/* <option value="5">Top 5</option> */}
            <option value="8">Ivy League</option>
            <option value="10">Top 10</option>
            <option value="20">Top 20</option>
            <option value="30">Top 30</option>
            <option value="50">Top 50</option>
            <option value="100">Top 100</option>
            <option value="200">Top 200</option>
            <option value="300">All 300</option>
          </select>
                 
        </div>
        <div>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th width="50px">Rank</th>
              <th>School</th>
              <th width="50px">State</th>
              <th width="40px">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
          { filteredData.map((item, index) => 
                <College college={item} key={index} index={index} onClick={handleZoom} handleFavoriteClick={handleFavoriteClick}></College>
            )}
          </tbody>
        </Table>
        </div>
      </div>
       
      <div id="detail">
        <Map colleges={filteredData} initialPosition={selectedLocation}/>
      </div>  
    </>
  );
}

const College = ({ college, index, onClick, handleFavoriteClick}) => {

  return (
    <tr key={index}>
      <td>{college.sortRank}</td>
      <td><a href={"#zoom" + index} onClick={() => onClick(college.LAT, college.LON)}>{college.displayName}</a></td> 
      {/* <td>${item.tuition? formatDollar(item.tuition) : ""}</td> */}
      <td>{college.state}</td>
      <td><button onClick={() => handleFavoriteClick(college)}>
        {college.isFavorite ? '★' : '☆'}
      </button></td>
      
    </tr>
  );
};

const formatDollar = ( (x) => 
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
)

export default App;
