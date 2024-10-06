import './App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import data from '/test.json'

fetch('./test.json')
   /*  .then((res) => {
      if (!res.ok) {
          throw new Error
              (`HTTP error! Status: ${res.status}`);
      }
      return res.json();}) */
    .then((json) => console.log(json));

function App() {
  return (
    <div className="App">
      <Button variant="primary">Primary</Button>{' '}
      <Button variant="secondary">Secondary</Button>{' '}
      <Button variant="success">Success</Button>{' '}
      <Button variant="warning">Warning</Button>{' '}
      <Button variant="danger">Danger</Button>{' '}
      <Button variant="info">Info</Button>{' '}
      <Button variant="light">Light</Button>{' '}
      <Button variant="dark">Dark</Button>
      <Button variant="link">Link</Button>
      <Button variant="outline-primary">Primary</Button>{' '}
      <Button variant="outline-secondary">Secondary</Button>{' '}
    </div>
  );
}

export default App;
