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
  const [keyword, setKeyword] = useState('');                   // State for keyword search
  const [n, setN] = useState(20);                              // State for number of top colleges
  const [isKeywordSearch, setIsKeywordSearch] = useState(false);
  const [filteredData, setFilteredData] = useState([]);         // State for filtered colleges
  const [refreshMap, setRefreshMap] = useState(false); 

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
    //setRefreshMap(false);
  };

  // Update the list of colleges when either keyword or `n` changes
  useEffect(() => {
      console.log ("is n?" + n);
      filterData();
  }, [keyword, n, isKeywordSearch, refreshMap]);

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

   
  const handleRefresh = () => {
    console.log("refresh clicked");
    setRefreshMap(false);
    setIsKeywordSearch(false); // Disable keyword search when `n` is selected
    setTimeout(() => {
      setRefreshMap(true);  // Trigger the effect to run
    }, 0);
  };

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
            <option value="50">Top 50</option>
            <option value="100">Top 100</option>
            <option value="200">Top 200</option>
            <option value="300">All</option>
          </select>
                 
        </div>
        {/* <div id="refreshButton"><Button type="button" size="sm" variant="outline-primary"
            onClick={handleRefresh}>Refresh Map</Button>
        </div>    */}
        <div>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th width="50px">Rank</th>
              <th>School</th>
              <th width="100px">Tuition</th>
            </tr>
          </thead>
          <tbody>
          {
              filteredData.map((item, i) => 
                <College item={item} key={i}></College>
              )
          }
          </tbody>
        </Table>
        </div>

      </div>
       
      <div id="detail">
        <Map colleges={filteredData} />
      </div>  
    </>
   
  );
}

const College = ({ item, i }) => (
  <tr key={i}>
      <td>{item.sortRank}</td>
      <td><a href={item.WEBADDR}>{item.displayName}</a></td> 
      {/*  <td>{item.displayName}</td>*/}
      <td>${item.tuition? formatDollar(item.tuition) : ""}</td>
  </tr>
  );

const formatDollar = ( (x) => 
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
)
export default App;
