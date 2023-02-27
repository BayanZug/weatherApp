import {useState} from "react";
import axios from "axios";

/**
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function Forecast(props) {
    const [location, setLocation] = useState([])
    const [error, setErrorMessage] = useState('')
    const [locationName, setLocationName] = useState('')
    const [date, setDate] = useState({
        dayName: '',
        month: '',
        dateNumber: '',
        year: ''
    })
    const [imageUrl, setImageUrl] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzEcYqsVSelUmLAaETvHhtnlWLOciDn8u09JYEycPb2YC9kLT2j_Q5u84FYDJsldemlSY&usqp=CAU')
    const [loadingImage, setLoadingImage] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_IuuXbzOJbyZNYpwARZiXpJ4aOIhSF9uiEQ&usqp=CAU')
    const [isLoading, setIsLoading] = useState(false)
    const selectedLocation = (location) => {
        setLocation(location)
    }
    const showForecast = async () => {
            setIsLoading(true)
            /**
             * following api will help us to fetch current weather data on the basis of longitude and latitude
             */
            await axios.get(`https://www.7timer.info/bin/api.pl?lon=${location.longitude}&lat=${location.latitude}&product=civillight&output=json`).then(res => {
                setLocation(res.data.dataseries)
                var dateString = new Date();
                var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                var months = ['Jan', 'Fab', 'March', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                var d = new Date(dateString);
                var dayName = days[d.getDay()];
                var monthName = months[d.getMonth()];
                var dateNumber = d.getDate()
                var year = d.getFullYear()
                setDate({
                    dayName: dayName,
                    month: monthName,
                    dateNumber: dateNumber,
                    year: year
                })
                setErrorMessage('')
                setLocationName(location.locationName)
            }).catch(err => {
                setErrorMessage(err.message)
            })
            await axios.get(`https://www.7timer.info/bin/astro.php?%20lon=${location.longitude}&lat=${location.latitude}&ac=0&lang=en&unit=metric&output=internal&tzshift=0`).then(res => {
                setImageUrl(`https://www.7timer.info/bin/astro.php?%20lon=${location.longitude}&lat=${location.latitude}&ac=0&lang=en&unit=metric&output=internal&tzshift=0`)
                setErrorMessage('')
                setIsLoading(false)
            }).catch(err => {
                setErrorMessage(error + " " + err.message)
            })
            /**
             * following api will give us current image from the live weather forecast on the basis of long, lat
             */
    }

    return (
        <>
            <div className="row container">
                <div className="col-sm-12 col-md-4 col-lg-2">
                    <h5>Forecast: {locationName}</h5>
                    <h5 className="text-danger text-bold">{error}</h5>
                </div>
                <div className="col-sm-12 col-md-8 col-lg-10">
                    <img src={isLoading === true ? loadingImage : imageUrl} alt="weather logo"/>
                </div>
                {
                    location.length > 0 && <div className="row mt-2">
                        <div className="col-6">
                            <div className="card bg-light card-body bg-grey">
                                <div className="card-header">
                                    <span>{date.dayName} {date.month} {date.dateNumber} {date.year}</span></div>
                                <div className="card-body">
                                    <div>
                                        <h6>Weather: <span>{location[0].weather} </span></h6>
                                        <h6>Temperatures: <span>{location[0].temp2m.min}℃ to {location[0].temp2m.max}℃</span>
                                        </h6>
                                        <h6>Wind Condition Max: <span>{location[0].wind10m_max}m/s </span></h6>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                }
                <br/><br/>
                <div className="row">
                    <div className="col-10 ">
                        <div className="card bg-light card-body bg-grey">
                            <h6>Locations:</h6>
                            <div className="list-group">
                                {(props.locations.length === 0) ?
                                    <span>(no locations yet...)</span> : props.locations.map(location => {
                                        return <button key={location.locationName}
                                                       onClick={() => selectedLocation(location)}
                                                       className="list-group-item list-group-item-action">{location.locationName}</button>
                                    })}
                            </div>
                        </div>
                        <br/>

                        <button onClick={showForecast} className="btn btn-success btn-sm w-20">
                            Show Forecast
                        </button>
                        <br/>
                        <br/>
                        <div className="card card-body bg-grey bg-light">
                            <h6>{location.locationName}</h6>
                            <h6>{location.longitude} {location.longitude && <span>,</span>} {location.latitude}</h6>
                        </div>
                    </div>
                </div>
                <hr/>
            </div>
        </>
    )
}