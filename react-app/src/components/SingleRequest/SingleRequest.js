import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./SingleRequest.css";


const SingleRequest = () => {
    const { requestId } = useParams()
    const [request, setRequest] = useState()

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`/api/requests/${requestId}/`);
            await res.json().then((data) => {
                console.log(data)
                setRequest(data.request);
            });
        }
        fetchData();
    }, [requestId]);

    return (
        <div className="wholeTradePage">
            <div className="tradeContainer">
                <h1>{request?.title}</h1>
                <NavLink to={`/users/${request?.userId}`} ><h2>by: {request?.user.username}</h2></NavLink>
                <h2>Posted on: {new Date(request?.createdAt).toLocaleDateString()}</h2>
                <p>Description: {request?.description}</p>
            </div>
        </div>
    )
}

export default SingleRequest;
