import React, { useEffect, useState } from "react";
import "./Conversations.css";
import ReactModal from "react-modal";
import Messages from "../Messages/Messages";
import { useSelector } from "react-redux";

const Conversations = () => {
	const [convos, setConvos] = useState();
	const [showChat, setShowChat] = useState(false);
	const [roomId, setRoomId] = useState("");
    const sessionUser = useSelector((state) => state.session.user);

	useEffect(() => {
		async function fetchConvos() {
			const res = await fetch("/api/chats/");
			await res.json().then((newConvos) => {
				setConvos(newConvos.chats);
			});
		}
		fetchConvos();
	}, []);

	const chatBlock = !convos ? (
		<div className="nothingHere">
			<h1>No chats to show</h1>
		</div>
	) : (
		Object.keys(convos).map((convo) => {
			return (
				<div
					key={Object.keys(convos).indexOf(convo)}
					className="chatBubble"
				>
					<button
						value={convo}
						className="sender"
						onClick={(e) => {
							e.preventDefault();
							setRoomId(e.target.value);
							setShowChat(true);
						}}
					>
						{convos[convo][0].senderId !== sessionUser.id ? convos[convo][0].sender.username : convos[convo][0].receiver.username}
					</button>
				</div>
			);
		})
	);

	return (
		<div className="chatListPage">
			<div className="chatList"><h1 className='chatHead'>Active Chats</h1>{chatBlock}</div>
			<ReactModal
				isOpen={showChat}
				contentLabel="chat2Modal"
				className="chatModal"
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
	);
};

export default Conversations;
