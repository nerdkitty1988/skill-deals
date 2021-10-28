import React, { useEffect, useState } from "react";
import "./Messages.css";
import { useSelector } from "react-redux";


const Messages = (props) => {
    const [messageList, setMessageList] = useState([]);
    const [chatText, setChatText] = useState('');
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        async function fetchMessageList() {
            const res = await fetch(`/api/chats/${props.roomId}/`)
            await res.json().then((data) => setMessageList(data.messages))
        }
        fetchMessageList();
    }, [messageList.length, props.roomId])

    let receiverId;

    const setReceiver = () => {
        const id1 = props.roomId.split('-')[0];
        const id2 = props.roomId.split('-')[1];
        if(sessionUser.id === parseInt(id1)) {
            receiverId = id2;
        }
        else {
            receiverId = id1
        }
    }

    const chats = messageList?.map((message) => {
        return (
            <div key={`div_${message.id}`} className='chatLine'>
                <div key={`div1_${message.id}`} className='senderName'>{message.sender.username}: </div>
                <div key={`div2_${message.id}`} className='inputText'>{message.content}</div>
            </div>
        )
    })


    const handleSubmit = async(e) => {
        e.preventDefault();
        setReceiver();
        const res = await fetch('/api/chats/', {
            method: 'POST',
            headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				sender_id: sessionUser.id,
                receiver_id: receiverId,
                content: chatText,
				room_id: props.roomId,
			}),
        })
        if (res.ok) {
			const data = await res.json();
            const newMessageList = [...messageList, data]
            setMessageList(newMessageList)
            setChatText('')
		} else {
			return ["An error occured.  Please try again."];
		}
    }

    return (
        <div className='chatPage'>
            <div className='chatWindow'>
                {chats}
            </div>
            <form className='chatForm' onSubmit={handleSubmit}>
                <textarea
                    name='content'
                    className='chatInput'
                    value={chatText}
                    onChange={(e) => {
                        e.preventDefault();
                        setChatText(e.target.value)
                    }}
                />
                <button className='chatButton' type='submit'>Send</button>
            </form>
        </div>
    )
}

export default Messages;
