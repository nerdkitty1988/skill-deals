import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./NewTrade.css"

const NewTradeForm = ({ setShowCreateModal }) => {
	const [errors, setErrors] = useState([]);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [type, setType] = useState("");

	const user = useSelector((state) => state.session.user);
	const history = useHistory();

	const onCreate = async (e) => {
		e.preventDefault();
		const res = await fetch(`/api/${type}/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				user_id: user.id,
				title,
				description,
			}),
		});
		if (res.ok) {
			const data = await res.json();
			if (data.errors) {
				setErrors(data.errors);
			} else {
				setShowCreateModal(false);
				history.push(`/users/${user.id}`);
			}
		} else {
			return ["An error occured.  Please try again."];
		}
	};

	return (
		<form className='newTradeForm' onSubmit={onCreate}>
			<div>
				{errors.map((error, ind) => (
					<div className='errors' key={ind}>{error}</div>
				))}
			</div>
			<div>
				<label for="type">Type</label>
				<select name="type" className='newTradeSelect' onChange={(e) => setType(e.target.value)}>
					<option>Choose One:</option>
					<option value="requests">Request</option>
					<option value="offers">Offer</option>
				</select>
			</div>
			<div>
				<label for="title">Title</label>
				<input
                    className='newTradeTitle'
					type="text"
					name="title"
					onChange={(e) => {
						setTitle(e.target.value);
					}}
					value={title}
                    required={true}
					placeholder="Trade Title"
				/>
			</div>
			<div>
				<label for="description">Description</label>
				<textarea
                    className='descriptionInput'
					name="description"
					onChange={(e) => {
						setDescription(e.target.value);
					}}
					value={description}
                    required={true}
					placeholder="Write a description of this trade"
				/>
			</div>
			<button className="submitTradeButton" type="submit">Create</button>
		</form>
	);
};

export default NewTradeForm;
