import logo from './logo.svg';
import './App.css';
import Layout from './layout/layout';
import Auth from './Auth/auth';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

function App() {
  return (
    <div className="App">
     
     <Layout/>
   

  
    </div>
  );
}

export default App;
