import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import "./SingleRequest.css";
import ReactModal from "react-modal";
import Messages from "../Messages/Messages";
import { useSelector } from "react-redux";

const SingleRequest = () => {
	const { requestId } = useParams();
	const [request, setRequest] = useState();
	const [distance, setDistance] = useState();
	const [showChat, setShowChat] = useState(false);
	const [roomId, setRoomId] = useState("");

	const sessionUser = useSelector((state) => state.session.user);
	const userId = request?.user.id;

	useEffect(() => {
		async function fetchData() {
			const res = await fetch(`/api/requests/${requestId}/`);
			await res.json().then((data) => {
				setRequest(data.request);
				setDistance(data.distance);
			});
		}
		fetchData();
	}, [requestId]);

	useEffect(() => {
		async function fetchChat() {
			const res = await fetch(`/api/chats/${sessionUser.id}-${userId}/`);
			const chat1 = await res.json();
			const result = await fetch(
				`/api/chats/${userId}-${sessionUser.id}/`
			);
			const chat2 = await result.json();
			if (chat1) {
				setRoomId(`${sessionUser.id}-${userId}`);
			} else if (chat2) {
				setRoomId(`${userId}-${sessionUser.id}`);
			} else {
				setRoomId(`${sessionUser.id}-${userId}`);
			}
		}
		fetchChat();
	}, [userId, sessionUser]);

	return (
		<div className="wholeTradePage">
			<div className="tradeContainer">
				<NavLink to="/requests" className="backNav">
					Back to Requests
				</NavLink>
				<h1 className="title">{request?.title}</h1>
				<NavLink
					className="authorLink"
					to={`/users/${request?.userId}`}
				>
					<h2>
						by: {request?.user.username}
						<div className="profilePicDiv">
							<img
								alt="profile"
								className="profilePicSingle"
								src={request?.user.profilePic}
							/>
						</div>
					</h2>
				</NavLink>
				<h2 className="postedDate">
					Posted on:{" "}
					{new Date(request?.createdAt).toLocaleDateString()}
				</h2>
				<p className="description">
					Description: {request?.description}
				</p>
				<p className="singleDistance">
					{distance ? distance.toFixed() : distance} miles away
				</p>
				<p className="singleDistance">
					Interested?{" "}
					<button
						className="backNav"
						id="messageButton"
						type="button"
						onClick={() => setShowChat(true)}
					>
						Send {request?.user.username} a Message
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

export default SingleRequest;
