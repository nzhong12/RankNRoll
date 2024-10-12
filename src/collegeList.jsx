import React, { useState, useEffect } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import data from './colleges.json';
import Table from 'react-bootstrap/Table';
import localforage from "localforage";

const formatDollar = ( (x) => 
    x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
)

function CollegeList() {
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
      console.log("called");
      // Filter by keyword if it exists
      //updatedColleges = updatedColleges.slice(0, n);
      
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
  
    /* const [top, setTop] = React.useState('100');
    const handleChange = (event) => {
      setTop({value: event.target.value});
  
      const slicedData = data.slice(0, event.target.value);
      colleges = slicedData;
      set(slicedData);
      console.log(slicedData.length);
    }; */
  
  /*   useEffect(() => {
      document.getElementById("q").value = q;
    }, [q]);  */
  
    return (
      <>
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
                filteredData.map((item, i) => 
                  <College item={item} key={i}></College>
                )
            }
            </tbody>
          </Table>
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


export default CollegeList;