import React, { useEffect, useState } from "react";
import { NavLink, Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./UserPage.css";
import EditTradeForm from "../EditTrade/EditTrade";
import EditProfileForm from "../EditProfile/EditProfile";
import Messages from "../Messages/Messages";
import ReactModal from "react-modal";

const UserPage = () => {
	//visiting user
	const sessionUser = useSelector((state) => state.session.user);

	const [user, setUser] = useState();
	const [showEditModal, setShowEditModal] = useState(false);
	const [showEditProfileModal, setShowEditProfileModal] = useState(false);
	const [editType, setEditType] = useState("");
	const [tradeId, setTradeId] = useState(0);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
    const [roomId, setRoomId] = useState("");
    const [showChat, setShowChat] = useState(false);

	//user profile to display
	const { userId } = useParams();

	const handleOfferEdit = (e, offer) => {
		e.preventDefault();
		setEditType("offers");
		setTradeId(offer.id);
		setTitle(offer.title);
		setDescription(offer.description);
		setShowEditModal(true);
	};

	const handleRequestEdit = (e, request) => {
		e.preventDefault();
		setEditType("requests");
		setTradeId(request.id);
		setTitle(request.title);
		setDescription(request.description);
		setShowEditModal(true);
	};

	const handleDeleteRequest = async (e, request) => {
		e.preventDefault();
		const request_id = request.id;
		await fetch(`/api/requests/delete/${request_id}/`, {
			method: "DELETE",
		});
	};

	const handleDeleteOffer = async (e, offer) => {
		e.preventDefault();
		const offer_id = offer.id;
		await fetch(`/api/offers/delete/${offer_id}/`, {
			method: "DELETE",
		});
	};

	const handleDeleteReview = async (e, review) => {
		e.preventDefault();
		await fetch(`/api/reviews/delete/${review.id}/`, {
			method: "DELETE",
		});
	};

	//get visiting user
	useEffect(
		() => {
			async function fetchUser() {
				const result = await fetch(`/api/users/${parseInt(userId)}/`);
				await result.json().then((newUser) => setUser(newUser));
                return () => console.log('unsubscribe')
			}
			fetchUser();
		},
		[userId, user?.offers, user?.requests, user?.publicEmail, user?.range, user?.address, user?.profilePic],
	);

    useEffect(
        () => {
            async function fetchChat() {
                const res = await fetch(`/api/chats/${sessionUser.id}-${userId}/`)
                const chat1 = await res.json();
                const result = await fetch(`/api/chats/${userId}-${sessionUser.id}/`)
                const chat2 = await result.json();
                if(chat1) {
                    setRoomId(`${sessionUser.id}-${userId}`)
                }else if(chat2) {
                    setRoomId(`${userId}-${sessionUser.id}`)
                }else{
                    setRoomId(`${sessionUser.id}-${userId}`)
                }
            }
            fetchChat();
        }, [userId, sessionUser]
    )

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
								<div className="editButtonContainer">
									<button
										className="editDeleteButtons"
										onClick={(e) => handleOfferEdit(e, offer)}
									>
										<i className="far fa-edit"></i>
									</button>
									<button
										className="editDeleteButtons"
										onClick={(e) => handleDeleteOffer(e, offer)}
									>
										<i className="far fa-trash-alt"></i>
									</button>
								</div>
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
								<div className="editButtonContainer">
									<button
										className="editDeleteButtons"
										onClick={(e) => handleRequestEdit(e, request)}
									>
										<i className="far fa-edit"></i>
									</button>
									<button
										className="editDeleteButtons"
										onClick={(e) => handleDeleteRequest(e, request)}
									>
										<i className="far fa-trash-alt"></i>
									</button>
								</div>
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
							}
							className="profilePic"
						/>
					</div>
					<h1 className="profileHeads">{user.username}'s Profile</h1>
                    <i className="far fa-id-badge" id='profileIcon'></i>
					<h3>Rating: {user.avgRating.toFixed(2)}%</h3>
					<h3>Public Email: {user.publicEmail}</h3>
					<h3>Email: {user.email}</h3>
					<h3>Address: {user.address}</h3>
					<button
						className="editDeleteButtons"
						type="button"
						onClick={() => setShowEditProfileModal(true)}
					>
						<i className="far fa-edit"></i>Edit Profile
					</button>
				</div>
			);
		} else if (sessionUser && user && sessionUser.id !== user.id) {
			return (
				<div className="profileInfo">
					<div>
						<img
							alt={user.username}
							src={
								user?.profilePic
							}
							className="profilePic"
						/>
					</div>
					<h1>{user.username}'s Profile</h1>
                    <i className="far fa-id-badge" id='profileIcon'></i>
					<h3>Rating: {user.avgRating.toFixed(2)}%</h3>
					<h3>Public Email: {user.publicEmail}</h3>
					<Link
                        className='addReviewButton'
						to={{
							pathname: "/reviews/add",
							state: {
								reviewedUser: user,
								review: null,
							},
						}}
					>
						Write a review for {user.username}
					</Link>
                    <button type='button' className='addReviewButton' onClick={(e) => setShowChat(true)}>Send a Message!</button>
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
						<h4 className="reviewTitle">
							Rating: {review.rating}/10
						</h4>
						<p className="authorName">
							by: {review.author.username}{" "}
						</p>
						{/* <p className="distance">{reqDistance[review.id]} miles away</p> */}
						<p className="posted">
							POSTED:
							{new Date(review.createdAt).toLocaleDateString()}
						</p>
						{sessionUser.id === review.authorId ? (
							<div className="editDeleteButtons">
								<Link
									to={{
										pathname: "/reviews/add",
										state: {
											review: review,
											reviewedUser: user,
										},
									}}
								>
									<i className="far fa-edit" />
								</Link>
								<button
									value={review}
									onClick={(e) => handleDeleteReview(e, review)}
									className="editDeleteButtons"
								>
									<i className="far fa-trash-alt" />
								</button>
							</div>
						) : null}
					</div>
				</div>
			);
		})
	);

	//final return with  ^^^ blocks ^^^
	return (
		<div className="profilePage">
			<ReactModal
				isOpen={showEditModal}
				contentLabel="EditModal"
				className="loginModal"

			>
				<EditTradeForm
					setShowEditModal={setShowEditModal}
					editType={editType}
					tradeId={tradeId}
					title={title}
					description={description}
                    appElement={EditTradeForm}
				/>
				<button
					className="windowCloseButton"
					onClick={() => setShowEditModal(false)}
				>
					<i className="fas fa-window-close"></i>
				</button>
			</ReactModal>
			<ReactModal
				isOpen={showEditProfileModal}
				contentLabel="EditProfileModal"
				className="loginModal"
			>
				<EditProfileForm
					setShowEditProfileModal={setShowEditProfileModal}
					user={sessionUser}
                    appElement={EditProfileForm}
				/>
				<button
					className="windowCloseButton"
					onClick={() => setShowEditProfileModal(false)}
				>
					<i className="fas fa-window-close"></i>
				</button>
			</ReactModal>
            <ReactModal
				isOpen={showChat}
				contentLabel="chatModal"
				className="loginModal"

			>
				<Messages
					setShowChat={setShowChat}
					roomId={roomId}
                    receiverId={userId}
                    appElement={Messages}
				/>
				<button
					className="windowCloseButton"
					onClick={() => setShowChat(false)}
				>
					<i className="fas fa-window-close"></i>
				</button>
			</ReactModal>
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
