import React, { useEffect, useState } from "react";
import "./Conversations.css";
import ReactModal from "react-modal";
import Messages from "../Messages/Messages";

const Conversations = () => {
	const [convos, setConvos] = useState([]);
    const [showChat, setShowChat] = useState(false);
    const [roomId, setRoomId] = useState('')

	useEffect(() => {
		async function fetchConvos() {
			const res = await fetch("/api/chats/");
			await res.json().then((newConvos) => setConvos(newConvos.chats));
		}
		fetchConvos();
	}, [convos]);

	const chatBlock =
		convos.length === 0 ? (
			<div className="nothingHere">
				<h1>No chats to show</h1>
			</div>
		) : (
			convos.keys.map((convo) => {
				return (
					<div className="chatBubble">
						<button
							value={convo}
							className="sender"
                            onClick={(e) => {
                                e.preventDefault()
                                setRoomId(e.target.value);
                                setShowChat(true);
                            }}
						>
							{convo.sender.username}
						</button>
					</div>
				);
			})
		);

	return (
		<div className="chatListPage">
			<div className="chatList">{chatBlock}</div>
			<ReactModal
				isOpen={showChat}
				contentLabel="chatModal"
				className="chatModal"
                appElement={Messages}
			>
				<Messages
					setShowChat={setShowChat}
					roomId={roomId}
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
