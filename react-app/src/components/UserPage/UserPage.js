import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./UserPage.css";
import EditTradeForm from "../EditTrade/EditTrade"
import EditProfileForm from "../EditProfile/EditProfile";
import ReactModal from "react-modal";

const UserPage = () => {
	//visiting user
	const sessionUser = useSelector((state) => state.session.user);

	const [user, setUser] = useState();
    const [showEditModal, setShowEditModal] = useState(false);
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);
    const [editType, setEditType] = useState('');
    const [tradeId, setTradeId] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')


	//user profile to display
	const { userId } = useParams();


    const handleOfferEdit = (e) => {
        e.preventDefault();
        setEditType('offers');
        const data = e.target.value.split(', ')
        setTradeId(data[0]);
        setTitle(data[1]);
        setDescription(data[2]);
        setShowEditModal(true);
    }

    const handleRequestEdit = (e) => {
        e.preventDefault();
        setEditType('requests');
        const data = e.target.value.split(', ')
        setTradeId(data[0]);
        setTitle(data[1]);
        setDescription(data[2]);
        setShowEditModal(true);
    }

    const handleDeleteRequest = async(e) => {
        e.preventDefault();
        const request_id = e.target.value;
        await fetch(`/api/requests/delete/${request_id}/`, {
            method: 'DELETE'
        })
    }


    const handleDeleteOffer = async(e) => {
        e.preventDefault();
        const offer_id = e.target.value;
        await fetch(`/api/requests/delete/${offer_id}/`, {
            method: 'DELETE'
        })
    }

    //get visiting user
    useEffect(() => {
        async function fetchUser() {
            const result = await fetch(`/api/users/${parseInt(userId)}/`);
            await result.json().then((newUser) => setUser(newUser))
        }
        fetchUser();
    }, [sessionUser]);


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
								<button value={`${offer.id}, ${offer.title}, ${offer.description}`} onClick={(e)=>handleOfferEdit(e)}>Edit</button>
								<button value={offer.id} onClick={(e)=>handleDeleteOffer(e)}>Delete</button>
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
								<button value={`${request.id}, ${request.title}, ${request.description}`} onClick={(e)=>handleRequestEdit(e)}>Edit</button>
								<button value={request.id} onClick={(e)=>handleDeleteRequest(e)}>Delete</button>
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
					<button type="button" onClick={()=>setShowEditProfileModal(true)}>Edit Profile</button>
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
				<EditTradeForm setShowEditModal={setShowEditModal} editType={editType} tradeId={tradeId} title={title} description={description} />
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
				<EditProfileForm setShowEditProfileModal={setShowEditProfileModal} user={sessionUser} />
				<button
					className="windowCloseButton"
					onClick={() => setShowEditProfileModal(false)}
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
