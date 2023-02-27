import LocationCard from "./LocationCard";
import {Button, Form} from "react-bootstrap";
import {useState} from "react";

/**
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function Locations(props) {
    //state to show error on latitude  field
    const [latitudeError, setLatitudeError] = useState('')
    //state to show error on submit of the form
    const [submitError, setSubmitErrors] = useState('')
    const [nameError, setNameError] = useState('')
    //state to show error on longitude  field
    const [longitudeError, setLongitudeError] = useState('')
    /**
     * state for form of location data
     */
    const [location, setLocation]  = useState( {
        locationName: '',
        longitude: "",
        latitude: ""
    })
    /**
     * state to handle changing value from the form fields and to handle the exceptions for the location form
     * @param e
     */
    const handleChangeLocationData = (e) => {
        e.preventDefault()
        if (e.target.name==='longitude'){
            let value = e.target.value
            setLocation({...location, [e.target.name]: value});
        }else if (e.target.name==='latitude'){
            let value = e.target.value
            setLocation({...location, [e.target.name]: value});
        }else {
            let value = e.target.value
            setLocation({...location, [e.target.name]: value});
        }
    };
    /**
     * function to handle submit data from form to parent components locations state
     */
    const handleSubmitLocationData = () => {
        if (location.longitude !== '' && location.latitude!=='' && location.locationName!==''){
            if(isNaN(parseFloat(location.latitude))) {
                setLatitudeError("Value must be a decimal number. Only digits, a single minus and a single dot are not allowed")
            }
            else if(parseFloat(location.latitude)<-90.0 || parseFloat(location.latitude)>90.0){
                setLatitudeError("Value must be a decimal between -90.0 and 90.0")
            }
            if (isNaN(parseFloat(location.longitude))){
                setLongitudeError("Value must be a decimal number. Only digits, a single minus and a single dot are not allowed")
            }
            else if(parseFloat(location.longitude)<-180.0 || parseFloat(location.longitude)>180.0){
                setLongitudeError("Value must be a decimal between -180.0 and 180.0")
            }
            if((!isNaN(location.latitude) && (parseFloat(location.latitude)>=-90.0 && parseFloat(location.latitude)<=90.0) )&&
                (!isNaN(location.longitude) && (parseFloat(location.longitude)>=-180.0 && parseFloat(location.longitude)<=180.0)) ){
                for (let i = 0; i < props.locations.length; i++) {
                    if (props.locations[i].locationName===location.locationName){
                        setSubmitErrors(`Location already exists with the name ${location.locationName}`)
                        return
                    }
                }
                props.locations.push(location)
                setLocation({
                    locationName: '',
                    longitude: "",
                    latitude: ""
                })
                setNameError('')
                setLongitudeError('')
                setLatitudeError('')
                setSubmitErrors('')
            }
        }else{
            if(location.longitude===null || location.longitude==='') setLongitudeError("Longitude is required")
            if(location.latitude===null || location.latitude==='') setLatitudeError("Latitude is required")
            if(location.locationName===null || location.locationName==='') setNameError("Name is required")
        }
    }



    return (
        <>
            <div className="row container">
                <div className="col-8">
                    <LocationCard locationData={props.locations} setLocation={props.setLocation}/>
                </div>
            </div>
            <div className="container row">
                <h4><b>Add Location:</b></h4>
            </div>
            <div className="container row">
                <div className="col-6 ">
                    <div className="card bg-light card-body bg-grey">
                        <Form>
                            <label>Name: </label>
                            <Form.Control
                                type="text"
                                name={"locationName"}
                                onChange={event => handleChangeLocationData(event)}
                                value={location.locationName}
                                aria-label="Disabled input example"
                            />
                            <label htmlFor="nameError" className="text-danger">{nameError}</label>
                            <label htmlFor="nameError" className="text-danger">{submitError}</label>
                            <br/>
                            <label>Latitude: </label>
                            <Form.Control
                                name={"latitude"}
                                onChange={event => handleChangeLocationData(event)}
                                value={location.latitude}
                                type="text"
                                aria-label="Disabled input example"
                            />
                            <label htmlFor="latitudeError" className="text-danger">{latitudeError}</label>
                            <br/>
                            <label>Longitude: </label>
                            <Form.Control
                                name={"longitude"}
                                onChange={event => handleChangeLocationData(event)}
                                value={location.longitude}
                                type="text"
                                aria-label="Disabled input example"
                            />
                            <label htmlFor="latitudeError" className="text-danger">{longitudeError}</label>
                            <br/>
                            <Button onClick={handleSubmitLocationData} className={"w-100"}>Add Location</Button>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}