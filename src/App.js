import React, { useState, useEffect } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import data from './colleges.json';
import Table from 'react-bootstrap/Table';
import { Outlet, Link, NavLink, useLoaderData, Form, redirect, useNavigation, useNavigate } from "react-router-dom";
import localforage from "localforage";
import Button from 'react-bootstrap/Button';
import Map from './Map'


 //Get all colleges. Used as rootLoader
export async function loader({request}) {
  //const contacts = await getContacts();
  const url = new URL(request.url);
  
  const keyword = url.searchParams.get("keyword");
  console.log("searching " + keyword);
  const colleges = data; //await getColleges(keyword);
  return { colleges, keyword };
}

function App() {
  const allColleges = data;
  //let { colleges, keyword } = useLoaderData();
  //const submit = useSubmit();
  const [keyword, setKeyword] = useState('');         // State for keyword search
  const [n, setN] = useState(10);                     // State for number of top colleges
  const [isKeywordSearch, setIsKeywordSearch] = useState(false);
  const [filteredData, setFilteredData] = useState([]);    // State for filtered colleges
  const [selectedLocation, setSelectedLocation] = useState([37.8, -97]);

  // Function to filter and limit colleges
  const filterData = () => {
    let updatedColleges = allColleges;
    
    if (isKeywordSearch && keyword) {
      updatedColleges = updatedColleges.filter((college) =>
        college.displayName.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    else if (n) {
      if (n === 8) //Ivy
        updatedColleges = updatedColleges.filter(c => c.iconType === "Ivy");
      else
        updatedColleges = updatedColleges.slice(0, n);// Limit the number of colleges to `n`
    }

    console.log(updatedColleges.length);
    setFilteredData(updatedColleges);
  };

  // Update the list of colleges when either keyword or `n` changes
  useEffect(() => {
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
    console.log("clicked " + lat + "--" + lon);
    setSelectedLocation([lat, lon]);
  }

  return (
    <>
      <div id="sidebar">
        <h2>Search</h2>
        <div>
        <form>
          <input id="keyword" name="keyword" type="search" placeholder='' value={keyword} 
                 onChange={handleKeywordSubmit}></input>
          
        </form>  
       
          <select id="n" onChange={handleNChange} value={n}>
            <option value="5">Top 5</option>
            <option value="8">Ivy League</option>
            <option value="10">Top 10</option>
            <option value="20">Top 20</option>
            <option value="30">Top 30</option>
            <option value="50">Top 50</option>
            <option value="100">Top 100</option>
            <option value="200">Top 200</option>
            <option value="300">All</option>
          </select>
                 
        </div>
        <div>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th width="50px">Rank</th>
              <th>School</th>
              <th width="80px">Tuition</th>
            </tr>
          </thead>
          <tbody>
          {
              filteredData.map((item, index) => 
                <College item={item} key={index} index={index} onClick={handleZoom}></College>
              )
          }
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

const College = ({ item, index, onClick }) => (
  <tr key={index}>
      <td>{item.sortRank}</td>
      <td><a href={"#zoom" + index} onClick={() => onClick(item.LAT, item.LON)}>{item.displayName}</a></td> 
      {/*  <td><Button variant="link">{item.displayName}</Button></td>*/}
      <td>${item.tuition? formatDollar(item.tuition) : ""}</td>
  </tr>
  );

const formatDollar = ( (x) => 
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
)
export default App;
