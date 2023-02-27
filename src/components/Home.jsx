import weatherIcon from '../assets/img/weather-icons.jpeg'
import {Link} from "react-router-dom";

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function Home(){
    return (
        <>
            <div className="row container">
                <div className="col-sm-2 col-md-2 col-lg-2">
                    <img width={120} height={100} src={weatherIcon} alt="weather logo"/>
                </div>
                <div className="col-sm-10 col-md-10 col-lg-10">
                    <h1>My Weather Forecast</h1>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-4">
                       <div className="btn-group">
                           <Link to={"/"}><button type="button" className="btn btn-primary btn-sm">Forecast</button></Link>
                           <Link to={"/location"}><button type="button" className="btn btn-outline-primary btn-sm">Locations</button></Link>
                       </div>
                    </div>
                </div>
                <hr/>
            </div>
        </>
    )
}