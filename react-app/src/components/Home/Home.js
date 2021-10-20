import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Home.css"


const Home = () => {
    const sessionUser = useSelector((state) => state.session.user);

    const [nearOffers, setNearOffers] = useState([]);
    const [nearRequests, setNearRequests] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`/api/offers/near/${sessionUser.id}`);
            const result = await fetch(`api/requests/near/${sessionUser.id}`);
            const offers = await res.json();
            const requests = await result.json();
            setNearOffers(offers);
            setNearRequests(requests);
        }
        fetchData();
    }, []);

    const nearOfferCard = nearOffers.map((offer) => {
        return (
			<NavLink key={`offer'_${offer.id}`} to={`/offers/${offer.id}`} className="offerNav">
				<div key={`offer'_${offer.id}`} className="singleOffer">
					<h4 className="offerTitle">{offer.title}</h4>
				    <p className="authorName">by: {offer.author.username} </p>
			    </div>
            </NavLink>
        )
    })

    const nearRequestCard = nearRequests.map((request) => {
        return (
			<NavLink key={`request'_${request.id}`} to={`/requests/${request.id}`} className="requestNav">
				<div key={`request'_${request.id}`} className="singlerequest">
					<h4 className="requestTitle">{request.title}</h4>
				    <p className="authorName">by: {request.author.username} </p>
			    </div>
            </NavLink>
        )
    })

    return (
        <div className="homeContainer">
            <div className="cardContainer">
                Offers
                <div className="cardLineup">
                    <ul className="cardLists">{nearOfferCard}</ul>
                </div>
            </div>
            <div className="cardContainer">
                Requests
                <div className="cardLineup">
                    <ul className="cardLists">{nearRequestCard}</ul>
                </div>
            </div>
        </div>
    )
}

export default Home;
