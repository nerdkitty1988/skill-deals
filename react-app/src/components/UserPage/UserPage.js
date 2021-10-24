import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./UserPage.css";

const UserPage = () => {
	//visiting user
	const sessionUser = useSelector((state) => state.session.user);

	const [user, setUser] = useState();

	//user profile to display
	const { userId } = useParams();

	//get visiting user
	useEffect(() => {
		async function fetchUser() {
			const result = await fetch(`/api/users/${parseInt(userId)}`);
			const user = await result.json();
			console.log(user);
			setUser(user);
		}
		fetchUser();
	}, [userId]);

	//create offer cards
	const offerCard =
		user?.offers.length === 0 ? (
			<div className="nothingHere">
				<h1>No offers to show</h1>
			</div>
		) : (
			user?.offers.map((offer) => {
				if (sessionUser.id === user.id) {
					return (
						<NavLink
							key={`offer'_${offer.id}`}
							to={`/offers/${offer.id}`}
							className="requestNav"
						>
							<div
								key={`offer'_${offer.id}`}
								className="singleOffer"
							>
								<h4 className="offerTitle">{offer.title}</h4>
								<p className="authorName">
									by: {offer.user.username}{" "}
								</p>
								{/* <p className="distance">{reqDistance[Offer.id]} miles away</p> */}
								<p className="posted">
									POSTED:
									{new Date(
										offer.createdAt
									).toLocaleDateString()}
								</p>
								<button>Edit</button>
								<button>Delete</button>
							</div>
						</NavLink>
					);
				} else if (sessionUser.id !== user.id) {
					return (
						<NavLink
							key={`offer'_${offer.id}`}
							to={`/offers/${offer.id}`}
							className="requestNav"
						>
							<div
								key={`offer'_${offer.id}`}
								className="singleOffer"
							>
								<h4 className="offerTitle">{offer.title}</h4>
								<p className="authorName">
									by: {offer.user.username}{" "}
								</p>
								{/* <p className="distance">{reqDistance[Offer.id]} miles away</p> */}
								<p className="posted">
									POSTED:
									{new Date(
										offer.createdAt
									).toLocaleDateString()}
								</p>
							</div>
						</NavLink>
					);
				}
				return null;
			})
		);

	//create request cards
	const requestCard =
		user?.requests.length === 0 ? (
			<div className="nothingHere">
				<h1>No requests to show</h1>
			</div>
		) : (
			user?.requests.map((request) => {
				if (sessionUser.id === user.id) {
					return (
						<NavLink
							key={`request'_${request.id}`}
							to={`/requests/${request.id}`}
							className="requestNav"
						>
							<div
								key={`request'_${request.id}`}
								className="singleOffer"
							>
								<h4 className="requestTitle">
									{request.title}
								</h4>
								<p className="authorName">
									by: {request.user.username}{" "}
								</p>
								{/* <p className="distance">{reqDistance[request.id]} miles away</p> */}
								<p className="posted">
									POSTED:
									{new Date(
										request.createdAt
									).toLocaleDateString()}
								</p>
								<button>Edit</button>
								<button>Delete</button>
							</div>
						</NavLink>
					);
				} else if (sessionUser.id !== user.id) {
					return (
						<NavLink
							key={`request'_${request.id}`}
							to={`/requests/${request.id}`}
							className="requestNav"
						>
							<div
								key={`request'_${request.id}`}
								className="singleOffer"
							>
								<h4 className="requestTitle">
									{request.title}
								</h4>
								<p className="authorName">
									by: {request.user.username}{" "}
								</p>
								{/* <p className="distance">{reqDistance[request.id]} miles away</p> */}
								<p className="posted">
									POSTED:
									{new Date(
										request.createdAt
									).toLocaleDateString()}
								</p>
							</div>
						</NavLink>
					);
				}
				return null;
			})
		);

	//create profile block

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
					<h1 className="profileHeads">{user.username}'s Profile</h1>
                    <h3>Rating: {user.avgRating.toFixed(2)}%</h3>
					<h3>Public Email: {user.publicEmail}</h3>
					<h3>Email: {user.email}</h3>
					<h3>Address: {user.address}</h3>
					<button type="button">Edit Profile</button>
				</div>
			);
		} else if (sessionUser && user && sessionUser.id !== user.id) {
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
                    <h3>Rating: {user.avgRating.toFixed(2)}%</h3>
					<h3>Public Email: {user.publicEmail}</h3>
				</div>
			);
		}
	};

	//create reviews block
	const reviewBlock = !user?.reviewsRecieved ? (
		<div className="nothingHere">
				<h1>No reviews yet</h1>
			</div>
	) : (
		user?.reviewsRecieved.map((review) => {
			return (
				<div key={`review'_${review.id}`} className="reviewDiv">
					<div key={`review'_${review.id}`} className="singleReview">
						<h4 className="reviewTitle">{review.comment}</h4>
                        <h4 className="reviewTitle">Rating: {review.rating}/10</h4>
						<p className="authorName">
							by: {review.author.username}{" "}
						</p>
						{/* <p className="distance">{reqDistance[review.id]} miles away</p> */}
						<p className="posted">
							POSTED:
							{new Date(review.createdAt).toLocaleDateString()}
						</p>
					</div>
				</div>
			);
		})
	);

	//final return with  ^^^ blocks ^^^
	return (
		<div className="profilePage">
			<div className="userInfo">{profileInfo()}</div>
			<div className="userCards">
				<h1 className="profileHeads">{user?.username}'s Requests:</h1>
				<div className="requestPage">{requestCard}</div>
				<h1 className="profileHeads">{user?.username}'s Offers:</h1>
				<div className="offerPage">{offerCard}</div>
                <h1 className="profileHeads">{user?.username}'s Reviews:</h1>
				<div className="reviews">{reviewBlock}</div>
			</div>
		</div>
	);
};
export default UserPage;
