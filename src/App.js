import Home from "./components/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import Forecast from "./components/Forecast";
import Locations from "./components/Locations";
import {Routes, Route} from 'react-router-dom'
import {useState} from "react";
import {ErrorPage} from "./components/ErrorPage";

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
function App() {
    const [locations, setLocations] = useState([])

    return (
        <div className="App">
            <Home/>
            <Routes>
                <Route path={"/"} element={<Forecast locations={locations} />}/>
                <Route path={"/location"} element={<Locations locations={locations} setLocation={setLocations}/>}/>
                <Route path={"/error/:errorMessage"} element={<ErrorPage />}/>}/>
            </Routes>
        </div>
    );
}

export default App;
