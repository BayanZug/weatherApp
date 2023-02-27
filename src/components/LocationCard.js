

import {ListGroup} from "react-bootstrap";

/**
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function LocationCard(props) {
    /**
     * function to delete location from list of locations passed by props from parent component
     * @param deleteLocation
     */
    const deleteLocation = (deleteLocation)=> {
        console.log(deleteLocation)
        let updatedList = props.locationData.filter(function(el) { return el.locationName !== deleteLocation.locationName });
        console.log(updatedList)
        props.setLocation(updatedList)
    }
    return (
        <>
            <div className="row">
                <div className="col-10 ">
                    <div className="card bg-light card-body bg-grey">
                        <h5>Locations:</h5>
                        <ListGroup>
                             {(props.locationData.length===0) ? <span>(no locations yet...)</span>:props.locationData.map(location=> {
                                 return <ListGroup.Item key={location.locationName}>
                                     <div className="row">
                                         <div className="col-10">{location.locationName}</div>
                                         <div className="col-2"><button onClick={()=> deleteLocation(location)} className="btn btn-danger">X</button></div>
                                     </div>
                                 </ListGroup.Item>
                             })}
                        </ListGroup>
                    </div>
                    <br/>
                </div>
            </div>
            <hr/>
        </>
    )
}