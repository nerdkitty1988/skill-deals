import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import "./SingleRequest.css";


const SingleRequest = () => {
    const { requestId } = useParams()
    const [request, setRequest] = useState()
    const [distance, setDistance] = useState()

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`/api/requests/${requestId}/`);
            await res.json().then((data) => {
                setRequest(data.request);
                setDistance(data.distance)
            });
        }
        fetchData();
    }, [requestId]);

    return (
        <div className="wholeTradePage">
            <div className="tradeContainer">
                <h1 className='title'>{request?.title}</h1>
                <NavLink className='authorLink' to={`/users/${request?.userId}`} ><h2>by: {request?.user.username}</h2></NavLink>
                <h2 className='postedDate'>Posted on: {new Date(request?.createdAt).toLocaleDateString()}</h2>
                <p className='description'>Description: {request?.description}</p>
                <p className="singleDistance">{distance ? distance.toFixed() : distance} miles away</p>
            </div>
        </div>
    )
}

export default SingleRequest;
