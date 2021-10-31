import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Offer.css";

const Offer = () => {

	const [offers, setOffers] = useState([]);
    const [offerDistance, setOfferDistance] = useState({});

	useEffect(() => {
		async function fetchData() {
			const res = await fetch(`/api/offers/`);
			await res.json().then((offers) => {
				setOffers(offers.offers);
                setOfferDistance(offers.offerDistance)
			});
		}
		fetchData();
	}, [setOffers]);

	const offerCard = offers?.map((offer) => {
		return (
			<NavLink
				key={`offer'_${offer.id}`}
				to={`/offers/${offer.id}`}
				className="requestNav"
			>
				<div key={`offer'_${offer.id}`} className="singleOffer">
					<h4 className="offerTitle">{offer.title}</h4>
                    <div className="profilePicDiv">
						<img
							alt="profile"
							className="profilePicSingle"
							src={
								offer?.user.profilePic
							}
						/>
					</div>
					<p className="authorName">by: {offer.user.username} </p>
					<p className="distance">{offerDistance[offer.id] ? offerDistance[offer.id].toFixed() : offerDistance[offer.id]} miles away</p>
                    <p>
						POSTED:{new Date(offer.createdAt).toLocaleDateString()}
					</p>
				</div>
			</NavLink>
		);
	});

	return <div className="offerPage1"><h1 className="requestHead">Offers <i id='offerIcon' className="far fa-list-alt"></i></h1>{offerCard}</div>;
};
export default Offer;
