import React from 'react'
import './App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import data from './colleges.json';
import Table from 'react-bootstrap/Table';

function App() {
  /* fetch('test.json', { headers: {
    'Content-Type': 'application/json',
    'Accept':       'application/json'
  }})
  .then((res) => {
    if (!res.ok) {
        throw new Error
            (`HTTP error! Status: ${res.status}`);
    }
    return res.json();}) 
  .then((json) => console.log(json));  */

  return (
    <div className="App">
      <Button variant="primary">Top 300 National Universities</Button>{' '}
      {/* <Button variant="secondary">Secondary</Button>{' '} */}
      <br />
      <Table striped bordered hover>
{/*         <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead> */}
        <tbody>
        {
            data.map((item, i) => 
              <tr key={i}>
                <td>{i+1}</td>
                <td>{item.displayName}</td>
                <td>{item.ranking}</td>
              </tr>
            )
        }
        </tbody>
      </Table>
    </div>
  );
}

export default App;
