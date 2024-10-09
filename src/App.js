import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import data from './colleges.json';
import Table from 'react-bootstrap/Table';
import { Outlet, Link, NavLink, useLoaderData, Form, redirect, useNavigation, useSubmit, } from "react-router-dom";
import { Sidebar } from './sidebar'
import localforage from "localforage";
import Button from 'react-bootstrap/Button';
import { useEffect } from "react";

 //Get all colleges. Used as rootLoader
export async function loader({request}) {
  //const contacts = await getContacts();
  const url = new URL(request.url);
  
  const q = url.searchParams.get("q");
  console.log("searching " + q);
  const colleges = await getColleges(q);
  return { colleges, q };
}



export async function getColleges(query) {
  let colleges = await localforage.getItem("colleges");
  if (!colleges) colleges = data;
  console.log(query);

  if (query != null) {
    colleges = data.filter(item => item.displayName.toUpperCase().includes(query.toUpperCase()) 
    || (item.alias!= null && item.alias.toUpperCase().includes(query.toUpperCase())));
  }
  set(colleges);
  return colleges;
} 

function set(colleges) {
  console.log(colleges);
  return localforage.setItem("colleges", colleges);
}

const formatDollar = ( (x) => 
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
)

function App() {
  const { colleges, q } = useLoaderData();
  const submit = useSubmit();

  const [top, setTop] = React.useState('100');
  const handleChange = (event) => {
    setTop({value: event.target.value});
    console.log(top.value);
  };

  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]); 

  return (
    <>
      <div id="sidebar">
        <h2>Search</h2>
        <div>
        <form>
        <input id="q" name="q" type="search" placeholder='' 
                defaultValue={q}
                onChange={(event) => {
                  const isFirstSearch = q == null;
                  submit(event.currentTarget.form, {
                    replace: !isFirstSearch,
                  });
                }}></input>
        <Button variant="primary">Submit</Button>
        </form>  
        </div>

        <div>
          <select id="top" onChange={handleChange} value={top.value}>
            <option value="100">Top 100</option>
            <option value="200">Top 200</option>
          </select>
          <p></p>          
        </div>

      </div>
       
      <div id="detail">
        {/* <div><Button variant="primary">Top 300 National Universities</Button></div> */}
        <h2>College List</h2>
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
              colleges.map((item, i) => 
                <College item={item} key={i}></College>
              )
          }
          </tbody>
        </Table>
        </div>
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

export default App;
