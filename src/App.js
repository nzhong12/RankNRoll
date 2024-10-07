import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import data from './colleges.json';
import Table from 'react-bootstrap/Table';
import { Outlet, Link, NavLink, useLoaderData, Form, redirect, useNavigation, useSubmit, } from "react-router-dom";
import { Sidebar } from './sidebar'

/* //Get all contacts. Used as rootLoader
export async function loader({request}) {
  //const contacts = await getContacts();
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts, q };
}

export async function getContacts(query) {
  //await fakeNetwork(`getContacts:${query}`);
  let contacts = await localforage.getItem("contacts");
  if (!contacts) contacts = [];
  if (query) {
    contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
  }
  return contacts.sort(sortBy("last", "createdAt"));
} */

const formatDollar = ( (x) => 
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
)

function App() {
  return (
    <>
      <Sidebar />
       
      <div id="detail">
        {/* <div><Button variant="primary">Top 300 National Universities</Button></div> */}
        <h1>College List</h1>
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
