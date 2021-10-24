import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Request.css";

const Request = () => {
    const sessionUser = useSelector((state) => state.session.user);

    const [requests, setRequests] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`/api/requests/`);
            await res.json().then((requests) => {
                setRequests(requests.requests)
            });
        }
        fetchData();
    }, [setRequests]);

    const requestCard = requests?.map((request) => {
        if(request.userId !== sessionUser.id) {
            return (
                <NavLink
                    key={`request'_${request.id}`}
                    to={`/requests/${request.id}`}
                    className="requestNav"
                >
                    <div key={`request'_${request.id}`} className="singleOffer">
                        <h4 className="requestTitle">{request.title}</h4>
                        <p className="authorName">by: {request.user.username} </p>
                        {/* <p className="distance">{reqDistance[request.id]} miles away</p> */}
                        <p className="posted">POSTED:{new Date(request.createdAt).toLocaleDateString()}</p>
                    </div>
                </NavLink>
            )
        }return null;
    })

    return (
        <div className="requestPage">
            {requestCard}
        </div>

    )
}
export default Request;
