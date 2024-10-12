import React, { useState, useEffect } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import data from './colleges.json';
import Table from 'react-bootstrap/Table';
import { Outlet, Link, NavLink, useLoaderData, Form, redirect, useNavigation, useNavigate } from "react-router-dom";
import { Sidebar } from './sidebar'
import localforage from "localforage";
import Button from 'react-bootstrap/Button';
import CollegeList from './collegeList'


 //Get all colleges. Used as rootLoader
export async function loader({request}) {
  //const contacts = await getContacts();
  const url = new URL(request.url);
  
  const keyword = url.searchParams.get("keyword");
  console.log("searching " + keyword);
  const colleges = data; //await getColleges(keyword);
  return { colleges, keyword };
}

/* export async function getColleges(query) {
  let colleges = await localforage.getItem("colleges");
  if (!colleges) colleges = data;

  if (query != null) {
    colleges = data.filter(item => item.displayName.toUpperCase().includes(query.toUpperCase()) 
    || (item.alias!= null && item.alias.toUpperCase().includes(query.toUpperCase())));
  }
  set(colleges);
  return colleges;
}  */

/* function set(colleges) {
  console.log(colleges.length);
  return localforage.setItem("colleges", colleges);
} */

function App() {
  const allColleges = data;
  //let { colleges, keyword } = useLoaderData();
  //const submit = useSubmit();
  const [keyword, setKeyword] = useState('');                   // State for keyword search
  const [n, setN] = useState(20);                              // State for number of top colleges
  const [isKeywordSearch, setIsKeywordSearch] = useState(false);
  const [filteredData, setFilteredData] = useState([]);         // State for filtered colleges

  // Function to filter and limit colleges
  const filterData = () => {
    let updatedColleges = allColleges;
    
    if (isKeywordSearch && keyword) {
      updatedColleges = updatedColleges.filter((college) =>
        college.displayName.toLowerCase().includes(keyword.toLowerCase())
      );
      
    }
    else if (n) {
      if (n == 8) //Ivy
        updatedColleges = updatedColleges.filter(c => c.iconType == "Ivy");
      else
        updatedColleges = updatedColleges.slice(0, n);// Limit the number of colleges to `n`
    }

    setFilteredData(updatedColleges);
  };

  // Update the list of colleges when either keyword or `n` changes
  useEffect(() => {
    filterData();
  }, [keyword, n, isKeywordSearch, allColleges]);

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

  const [isPageA, setIsPageA] = useState(true);  
  const navigate = useNavigate();
  const handleToggle = () => {
    console.log('clicked ' + isPageA);
    if (isPageA) {
      navigate('/map');   // Navigate to map
    } else {
      navigate('/');   // Navigate to list
    }
    setIsPageA(!isPageA);  // Toggle the page state
  };

  return (
    <>
      <div id="sidebar">
        <h2>Search</h2>
        <div>
        <form target="/Map">
          <input id="keyword" name="keyword" type="search" placeholder='' value={keyword} 
                 onChange={handleKeywordSubmit}></input>
          <Button type="button" 
            onClick={handleToggle}>{isPageA ? 'View Map' : 'View List'}</Button>
        </form>  
        </div>

        <div>
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
          <p></p>          
        </div>

      </div>
       
      <div id="detail">
        <Outlet />
        {/* <h2>College List</h2>
        <div>
        <Table striped bordered hover>
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
        </div>*/}
      </div>  
    </>
   
  );
}

export default App;
