import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


const EditProfileForm = (props) => {
	const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState(props.user.username)
	const [email, setEmail] = useState(props.user.email);
	const [publicEmail, setPublicEmail] = useState(props.user.publicEmail);
	const [range, setRange] = useState(props.user.range);
	const [address, setAddress] = useState(props.user.address);
    const [profilePic, setProfilePic] = useState(props.user.profilePic)

	const user = useSelector((state) => state.session.user);
	const history = useHistory();


	const onSubmit = async (e) => {
		e.preventDefault();
		const res = await fetch(`/api/users/${props.user.id}/`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
                username,
				email,
				publicEmail,
                range,
                address,
                profilePic
			}),
		});
		if (res.ok) {
			const data = await res.json();
			if (data.errors) {
				setErrors(data.errors);
			} else {
				props.setShowEditProfileModal(false);
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
				<label for="username">Username</label>
				<input
					type="text"
					name="username"
					onChange={(e) => {
						setUsername(e.target.value);
					}}
					defaultValue={username}
				/>
			</div>

			<div>
				<label for="email">Email</label>
				<input
					type="text"
					name="email"
					onChange={(e) => {
						setEmail(e.target.value);
					}}
					defaultValue={email}
				/>
			</div>
            <div>
				<label for="publicEmail">Public Email</label>
				<input
					type="text"
					name="publicEmail"
					onChange={(e) => {
						setPublicEmail(e.target.value);
					}}
					defaultValue={publicEmail}
				/>
			</div>
			<div>
				<label for="range">Mile Range</label>
				<input
					name="range"
					onChange={(e) => {
						setRange(e.target.value);
					}}
					defaultValue={range}
				/>
			</div>
            <div>
				<label for="address">Address</label>
				<textarea
					name="address"
					onChange={(e) => {
						setAddress(e.target.value);
					}}
					defaultValue={address}
				/>
			</div>
            <div>
				<label for="profilePic">Profile Photo URL</label>
				<input
					name="profilePic"
					onChange={(e) => {
						setProfilePic(e.target.value);
					}}
					defaultValue={profilePic}
				/>
			</div>
			<button type="submit">Submit</button>
		</form>
	);
};

export default EditProfileForm;
