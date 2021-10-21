import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Home.css";

const Home = () => {
	const sessionUser = useSelector((state) => state.session.user);

	const [nearOffers, setNearOffers] = useState([]);
	const [nearRequests, setNearRequests] = useState([]);
	const [offerDistance, setOfferDistance] = useState({});

	useEffect(() => {
		async function fetchData() {
			const res = await fetch(`/api/offers/near/${sessionUser.id}/`);
			const offers = await res.json().then((offers) => {
				setNearOffers(offers.closeOffers);
				setOfferDistance(offers.offerDistance);
			});
			// setNearOffers(offers.offers);
		}
		fetchData();
	}, [setNearOffers]);

	useEffect(() => {
		async function fetchData() {
			const result = await fetch(`api/requests/near/${sessionUser.id}/`);
			const requests = await result
				.json()
				.then((requests) => setNearRequests(requests.closeRequests));
			// setNearRequests(requests.requests);
		}
		fetchData();
	}, [setNearRequests, sessionUser.id]);

	const nearOfferCard = nearOffers?.map((offer) => {
		return (
			<NavLink
				key={`offer'_${offer.id}`}
				to={`/offers/${offer.id}`}
				className="requestNav"
			>
				<div key={`offer'_${offer.id}`} className="singleOffer">
					<h4 className="offerTitle">{offer.title}</h4>
					<p className="authorName">by: {offer.user.username} </p>
					<p className="distance">{offerDistance[offer.id]}</p>
				</div>
			</NavLink>
		);
	});

	const nearRequestCard = nearRequests?.map((request) => {
		return (
			<NavLink
				key={`request'_${request.id}`}
				to={`/requests/${request.id}`}
				className="requestNav"
			>
				<div key={`request'_${request.id}`} className="singleOffer">
					<h4 className="requestTitle">{request.title}</h4>
					<p className="authorName">by: {request.user.username} </p>
				</div>
			</NavLink>
		);
	});

	return (
		<div className="homeContainer">
            <div className="homepageImg"/>
			<div className="offersAndRequests">
				<div className="cardContainer">
					<h1 className="cardLabel">Offers near {sessionUser.username}</h1>
					<div className="cardLineup">
						<ul className="cardLists">{nearOfferCard}</ul>
					</div>
				</div>
				<div className="cardContainer">
					<h1 className="cardLabel">Requests near {sessionUser.username}</h1>
					<div className="cardLineup">
						<ul className="cardLists">{nearRequestCard}</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
