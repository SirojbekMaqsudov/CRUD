import './App.css';
import 'react-toastify/dist/ReactToastify.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Registration from "./Components/Registration";
import Dashboard from "./Components/Dashboard";
import Logout from "./Components/Logout";
import Edit from "./Components/Edit";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path={'/'} element={<Home />}/>
                <Route path={'/login'} element={<Login />}/>
                <Route path={'/registration'} element={<Registration />}/>
                <Route path={'/dashboard'} element={<Dashboard />}/>
                <Route path={'/edit/:id'} element={<Edit />}/>
                <Route path={'/logout'} element={<Logout />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;