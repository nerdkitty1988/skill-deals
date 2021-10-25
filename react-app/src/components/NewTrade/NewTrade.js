import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'



const TradeForm = ({setShowCreateModal}) => {
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("")

    const user = useSelector((state) => state.session.user);
    const history = useHistory();

    const onCreate = async(e) => {
        e.preventDefault();
        const res = await fetch(`/api/${type}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: user.id,
                title,
                description
            })
        });
        if (res.ok) {
            const data = await res.json();
            if (data.errors) {
                setErrors(data.errors)
            }else {
                setShowCreateModal(false)
                history.push(`/user/${user.id}`)
            }
        }else{
            return ['An error occured.  Please try again.']
        }
    };

    return (
        <form onSubmit={onCreate}>
            <div>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <div>
                <label for="type">Type</label>
                <select name="type" onChange={(e) => setType(e.target.value)}>
                    <option>Choose One:</option>
                    <option value="requests">Request</option>
                    <option value="offers">Offer</option>
                </select>
            </div>
            <div>
                <label for="title">Title</label>
                <input
                    type="text"
                    name="title"
                    onChange={(e) => {setTitle(e.target.value)}}
                    value={title}
                    placeholder="Choose a title for your trade"
                />
            </div>
            <div>
                <label for="description">Description</label>
                <textarea
                    name="description"
                    onChange={(e) => {setDescription(e.target.value)}}
                    value={description}
                    placeholder="Write a description of this trade"
                />
            </div>
            <button type="submit">Create</button>
        </form>
    )
}

export default TradeForm;
