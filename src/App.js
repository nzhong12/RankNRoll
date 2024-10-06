import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import data from './colleges.json';
import Table from 'react-bootstrap/Table';
import { Outlet, NavLink, useLoaderData, Form, redirect, useNavigation, useSubmit, } from "react-router-dom";
import { Sidebar } from './sidebar'

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
                <tr key={i}>
                  <td>{item.displayRank}</td>
                  <td>{item.displayName}</td>
                  <td>${item.tuition? formatDollar(item.tuition) : ""}</td>
                </tr>
              )
          }
          </tbody>
        </Table>
        </div>
      </div> 
    </>
   
  );
}

export default App;
