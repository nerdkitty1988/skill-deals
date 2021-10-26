import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const EditTradeForm = (props) => {
	const [errors, setErrors] = useState([]);
	const [title, setTitle] = useState(props.title);
	const [description, setDescription] = useState(props.description);
	const [type, setType] = useState(props.editType);

	const user = useSelector((state) => state.session.user);
	const history = useHistory();


	const onSubmit = async (e) => {
		e.preventDefault();
		const res = await fetch(`/api/${props.editType}/edit/${props.tradeId}/`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title,
				description,
			}),
		});
		if (res.ok) {
			const data = await res.json();
			if (data.errors) {
				setErrors(data.errors);
			} else {
				props.setShowEditModal(false);
				history.push(`/users/${user.id}`);
			}
		} else {
			return ["An error occured.  Please try again."];
		}
	};


	return (

		<form onSubmit={onSubmit}>
			<div>
				{errors.map((error, ind) => (
					<div key={ind}>{error}</div>
				))}
			</div>
			<div>
				<label for="type">Type</label>
				<select
					name="type"
					defaultValue={type}
					onChange={(e) => setType(e.target.value)}
				>
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
					onChange={(e) => {
						setTitle(e.target.value);
					}}
					defaultValue={title}
				/>
			</div>
			<div>
				<label for="description">Description</label>
				<textarea
					name="description"
					onChange={(e) => {
						setDescription(e.target.value);
					}}
					defaultValue={description}
				/>
			</div>
			<button type="submit">Submit</button>
		</form>
	);
};

export default EditTradeForm;
