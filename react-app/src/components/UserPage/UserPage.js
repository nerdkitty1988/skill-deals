import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./UserPage.css";

const UserPage = () => {
	const sessionUser = useSelector((state) => state.session.user);

	const [requests, setRequests] = useState([]);
	const [offers, setOffers] = useState([]);
    const [user, setUser] = useState();

	const { userId } = useParams();

	useEffect(() => {
		async function fetchData() {
			const res = await fetch(`/api/requests/`);
			await res.json().then((requests) => {
				setRequests(requests.requests);
			});
		}
		fetchData();
	}, [setRequests]);

	useEffect(() => {
		async function fetchData() {
			const res = await fetch(`/api/offers/`);
			await res.json().then((offers) => {
				setOffers(offers.offers);
			});
		}
		fetchData();
	}, [setOffers]);

    useEffect(() => {
        async function fetchUser() {
            const result = await fetch(`/api/users/${parseInt(userId)}`);
            const user = await result.json();
            console.log(user)
            setUser(user);
        }
        fetchUser();
    }, [userId])

	const offerCard = offers?.map((offer) => {
		if (offer.userId === parseInt(userId)) {
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
		return null;
	});

	const requestCard = requests?.map((request) => {
		if (request.userId === user.id) {
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
		return null;
	});

	const profileInfo = () => {
		if (sessionUser && user && sessionUser.id === user.id) {
			return (
				<div className="profileInfo">
					<div>
						<img
							alt={user.username}
							src={
								user.profilePic
									? user.profilePic
									: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
							}
							className="profilePic"
						/>
					</div>
					<h1>{user.username}'s Profile</h1>
					<h3>Public Email: {user.publicEmail}</h3>
					<h3>Email: {user.email}</h3>
					<h3>Address: {user.address}</h3>
				</div>
			);
		} else if (sessionUser && user && sessionUser.id !== user.id){
			return (
				<div className="profileInfo">
					<div>
						<img
							alt={user.username}
							src={
								user.profilePic
									? user.profilePic
									: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
							}
							className="profilePic"
						/>
					</div>
					<h1>{user.username}'s Profile</h1>
					<h3>Public Email: {user.publicEmail}</h3>
				</div>
			);
		}
	};

	return (
		<div className="profilePage">
			<div className="userInfo">{profileInfo()}</div>
			<div className="userCards">
				<div className="requestPage">{requestCard}</div>
				<div className="offerPage">{offerCard}</div>
			</div>
		</div>
	);
};
export default UserPage;
