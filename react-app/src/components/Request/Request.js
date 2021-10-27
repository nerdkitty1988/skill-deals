import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Request.css";

const Request = () => {

	const [requests, setRequests] = useState([]);
    const [reqDistance, setReqDistance] = useState({});

	useEffect(() => {
		async function fetchData() {
			const res = await fetch(`/api/requests/`);
			await res.json().then((requests) => {
				setRequests(requests.requests);
                setReqDistance(requests.allRequestDistance)
			});
		}
		fetchData();
	}, [setRequests]);

	const requestCard = requests?.map((request) => {
		return (
			<NavLink
				key={`request'_${request.id}`}
				to={`/requests/${request.id}`}
				className="requestNav"
			>
				<div key={`request'_${request.id}`} className="singleOffer">
					<h4 className="requestTitle">{request.title}</h4>
					<p className="authorName">by: {request.user.username} </p>
                    <p className="distance">{reqDistance[request.id] ? reqDistance[request.id].toFixed() : reqDistance[request.id]} miles away</p>
					<p className="posted">
						POSTED:
						{new Date(request.createdAt).toLocaleDateString()}
					</p>
				</div>
			</NavLink>
		);
	});

	return <div className="requestPage1">{requestCard}</div>;
};
export default Request;
