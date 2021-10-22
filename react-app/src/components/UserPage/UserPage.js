import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./UserPage.css";

const UserPage = () => {
	const sessionUser = useSelector((state) => state.session.user);

	const [requests, setRequests] = useState([]);
	const [offers, setOffers] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const res = await fetch(`/api/requests`);
			const requests = await res.json().then((requests) => {
				setRequests(requests.requests);
			});
		}
		fetchData();
	}, [setRequests]);

	useEffect(() => {
		async function fetchData() {
			const res = await fetch(`/api/offers/`);
			const offers = await res.json().then((offers) => {
				setOffers(offers.offers);
			});
		}
		fetchData();
	}, [setOffers]);

	const offerCard = offers?.map((offer) => {
		if (offer.userId === sessionUser.id) {
			return (
				<NavLink
					key={`offer'_${offer.id}`}
					to={`/offers/${offer.id}`}
					className="requestNav"
				>
					<div key={`offer'_${offer.id}`} className="singleOffer">
						<h4 className="offerTitle">{offer.title}</h4>
						<p className="authorName">by: {offer.user.username} </p>
						{/* <p className="distance">{reqDistance[Offer.id]} miles away</p> */}
						<p className="posted">
							POSTED:
							{new Date(offer.createdAt).toLocaleDateString()}
						</p>
					</div>
				</NavLink>
			);
		}
	});

	const requestCard = requests?.map((request) => {
		if (request.userId === sessionUser.id) {
			return (
				<NavLink
					key={`request'_${request.id}`}
					to={`/requests/${request.id}`}
					className="requestNav"
				>
					<div key={`request'_${request.id}`} className="singleOffer">
						<h4 className="requestTitle">{request.title}</h4>
						<p className="authorName">
							by: {request.user.username}{" "}
						</p>
						{/* <p className="distance">{reqDistance[request.id]} miles away</p> */}
						<p className="posted">
							POSTED:
							{new Date(request.createdAt).toLocaleDateString()}
						</p>
					</div>
				</NavLink>
			);
		}
	});

	return (
		<div>
			<div className="requestPage">{requestCard}</div>
			<div className="offerPage">{offerCard}</div>
		</div>
	);
};
export default UserPage;
