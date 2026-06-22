import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home/index.jsx";
import Header from "./pages/Header/index.jsx";

function App() {
    return (
        <>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </>
    )
}

export default App
