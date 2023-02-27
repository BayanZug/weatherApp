import {Link, useParams} from "react-router-dom";

export const ErrorPage = (props) => {
    const {errorMessage} = useParams();
    return (
        <>
            <h1>Error in API Fetch {errorMessage}</h1>
            <Link t={"/"}><button className="btn btn-primary btn-lg">Go Back</button></Link>
        </>
    )
}