import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import "./SingleOffer.css";
import ReactModal from "react-modal";
import Messages from "../Messages/Messages";
import { useSelector } from "react-redux";

const SingleOffer = () => {
	const { offerId } = useParams();
	const [offer, setOffer] = useState();
	const [offerDistance, setOfferDistance] = useState();
	const [showChat, setShowChat] = useState(false);
    const [roomId, setRoomId] = useState("");

    const sessionUser = useSelector((state) => state.session.user);
    const userId = offer?.user.id

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
								src={offer?.user.profilePic}
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
				<p className="singleDistance">
					Interested?{" "}
					<button
						className="backNav"
						id="messageButton"
						type="button"
                        onClick={() => setShowChat(true)}
					>
						Send {offer?.user.username} a Message
					</button>
				</p>
				<ReactModal
					isOpen={showChat}
					contentLabel="chat2Modal"
					className="loginModal"
				>
					<Messages
						setShowChat={setShowChat}
						roomId={roomId}
						appElement={Messages}
					/>
					<button
						className="windowCloseButton"
						onClick={() => setShowChat(false)}
					>
						<i className="fas fa-window-close"></i>
					</button>
				</ReactModal>
			</div>
		</div>
	);
};

export default SingleOffer;
