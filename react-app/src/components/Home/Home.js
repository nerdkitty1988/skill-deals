import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Home.css";

const Home = () => {
	const sessionUser = useSelector((state) => state.session.user);

	const [nearOffers, setNearOffers] = useState([]);
	const [nearRequests, setNearRequests] = useState([]);
	const [offerDistance, setOfferDistance] = useState({});
    const [reqDistance, setReqDistance] = useState({});

	useEffect(() => {
		async function fetchData() {
			const res = await fetch(`/api/offers/near/${sessionUser.id}/`);
			await res.json().then((offers) => {
				setNearOffers(offers.closeOffers);
				setOfferDistance(offers.offerDistance);
			});
			// setNearOffers(offers.offers);
		}
		fetchData();
	}, [setNearOffers, sessionUser.id]);

	useEffect(() => {
		async function fetchData2() {
			const result = await fetch(`api/requests/near/${sessionUser.id}/`);
			await result
				.json()
				.then((requests) => {
                    setNearRequests(requests.closeRequests);
                    setReqDistance(requests.requestDistance);
                });
			// setNearRequests(requests.requests);
		}
		fetchData2();
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
					<p className="distance">{offerDistance[offer.id] ? offerDistance[offer.id].toFixed() : offerDistance[offer.id]} miles away</p>
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
                    <p className="distance">{reqDistance[request.id] ? reqDistance[request.id].toFixed() : reqDistance[request.id]} miles away</p>
				</div>
			</NavLink>
		);
	});

	return (
		<div className="homeContainer">
			<div className="offersAndRequests">
                <div className="intro">
                    <div className="homepageImg"/>
                    <p>Welcome to Skill Deals!  Do you have a task that requires a skill you don't possess? </p><p> Search for offers in your area, or create a new "request" and let other users find you!</p> <p>Have a skill you are willing to barter with?  Create a new offer!  </p> <p>The only catch, no cash is traded in these transactions.  Pay with a SERVICE you can provide!</p>
                </div>
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
