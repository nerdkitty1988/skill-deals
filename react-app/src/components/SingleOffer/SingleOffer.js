import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import "./SingleOffer.css";

const SingleOffer = () => {
	const { offerId } = useParams();
	const [offer, setOffer] = useState();
	const [offerDistance, setOfferDistance] = useState();

	useEffect(() => {
		async function fetchData() {
			const res = await fetch(`/api/offers/${offerId}/`);
			await res.json().then((data) => {
				setOffer(data.offer);
				setOfferDistance(data.distance);
			});
		}
		fetchData();
	}, [offerId]);

	return (
		<div className="wholeTradePage">
			<div className="tradeContainer">
				<NavLink to="/offers" className="backNav">
					Back to Offers
				</NavLink>
				<h1 className="title">{offer?.title}</h1>
				<NavLink className="authorLink" to={`/users/${offer?.userId}`}>
					<h2>
						by: {offer?.user.username}
						<div className="profilePicDiv">
							<img
								alt="profile"
								className="profilePicSingle"
								src={
									offer?.user.profilePic
										? offer?.user.profilePic
										: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
								}
							/>
						</div>
						Visit Profile
					</h2>
				</NavLink>
				<h2 className="postedDate">
					Posted on: {new Date(offer?.createdAt).toLocaleDateString()}
				</h2>
				<p className="description">Description: {offer?.description}</p>
				<p className="singleDistance">
					{offerDistance ? offerDistance.toFixed() : offerDistance}{" "}
					miles away
				</p>
			</div>
		</div>
	);
};

export default SingleOffer;
