// import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Nav from './Navbar';
import Nav1 from './pageMovie/Navbar1';
import Bigcomp from './pageMovie/AllComp';
import Body from './searchMovies/Movie';
import Test from './Admin/adm1';
import Log from './Admin/Log';

function App() {
  return (
    <Router>

      <div className="App">

        {/* <Nav />*/}
        <Routes>
          <Route exact path="/admin" element={< Log />} />
          <Route exact path="/admin/home" element={< Test />} />
          <Route exact path="/" element={<Body />} />
          <Route exact path="/Movie/:id" element={<Bigcomp />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
