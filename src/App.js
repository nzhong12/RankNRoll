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

 //Get all contacts. Used as rootLoader
export async function loader({request}) {
  //const contacts = await getContacts();
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts, q };
}

export async function getContacts(query) {
  //await fakeNetwork(`getContacts:${query}`);
  let list = await localforage.getItem("list");
  if (!list) list = [];
  if (query) {
    list = data.filter(item => item.displayName.toUpperCase().includes(query.toUpperCase()) || item.alias?item.alias.toUpperCase().includes(query.toUpperCase()) : false);
  }
  return list;
} 

const formatDollar = ( (x) => 
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
)

function App() {
  /* const { list, q } = useLoaderData();

  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]); */

  return (
    <>
      <div id="sidebar">
        <h2>Search</h2>
        <div>
        <form>
        <input id="searh" name="searh" type="search" placeholder=''></input>
        <Button variant="primary">Submit</Button>
        </form>  
        </div>

      </div>
       
      <div id="detail">
        {/* <div><Button variant="primary">Top 300 National Universities</Button></div> */}
        <h2>College List</h2>
        <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Rank</th>
              <th>School</th>
              <th>Tuition</th>
            </tr>
          </thead>
          <tbody>
          {
              data.map((item, i) => 
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
