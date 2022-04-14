import './App.css';
import { useEffect } from 'react';
import getData from './api/apiTestData';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Product from './components/Product';

function App() {
  // useEffect(() => {
  //   (async function() {
  //     const post = await getData.getProducts()
  //     console.log(post)
  //   })()
  // },[])
  
  return (
    <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav>  
    </div>

    <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Product />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function NotFound() {
  return <h2>not found</h2>;
}

export default App;
