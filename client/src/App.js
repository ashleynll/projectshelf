import './App.css';
import {BrowserRouter as Router , Routes, Route} from "react-router-dom"; 
import {Home} from './pages/home';
import {Auth} from './pages/auth';
import {Create} from './pages/createProject';
import {Saved} from './pages/saved';
import { NavBar } from "./components/navBar";


function App() {
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/createProject" element={<Create />} />
          <Route path="/saved" element={<Saved />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;