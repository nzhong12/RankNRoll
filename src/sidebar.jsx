import './App.css';
import Button from 'react-bootstrap/Button';

export const Sidebar = () => (
    <div id="sidebar">
    <h1>Search</h1>
    <div>
    <form>
    <input id="searh" name="searh" type="search" placeholder=''></input>
    <Button variant="primary">Submit</Button>
    </form>  
    </div>

    </div>
);

