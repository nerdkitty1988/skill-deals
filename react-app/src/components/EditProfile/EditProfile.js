import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { editUser } from "../../store/session";


const EditProfileForm = (props) => {
	const [errors, setErrors] = useState([]);
	const [public_email, setPublicEmail] = useState(props.user.publicEmail);
	const [range, setRange] = useState(props.user.range);
	const [address, setAddress] = useState(props.user.address);
    const [profile_pic, setProfilePic] = useState(props.user.profilePic)

	const sessionUser = useSelector((state) => state.session.user);
    const userId = sessionUser?.id;
	const history = useHistory();
    const dispatch = useDispatch();


	const onSubmit = async (e) => {
		e.preventDefault();
		const data = await dispatch(
            editUser(
                userId,
                public_email,
                range,
                address,
                profile_pic
            )
        )
		if (data) {
            setErrors(data)
        }else{
            props.setShowEditProfileModal(false);
            history.push(`/users/${userId}`)
        }
	};

    return (

		<form onSubmit={(e)=> onSubmit(e)}>
			<div>
				{errors.map((error, ind) => (
					<div className='errors' key={ind}>{error}</div>
				))}
			</div>

            <div>
				<label htmlFor="public_email">Public Email</label>
				<input
                    className='newTradeTitle'
					type="text"
					name="public_email"
					onChange={(e) => {
						setPublicEmail(e.target.value);
					}}
					defaultValue={public_email}
				/>
			</div>
			<div>
				<label htmlFor="range">Mile Range</label>
				<input
                    className='newTradeTitle'
					name="range"
					onChange={(e) => {
						setRange(e.target.value);
					}}
					defaultValue={range}
				/>
			</div>
            <div>
				<label htmlFor="address">Address</label>
				<textarea
                    className='descriptionInput'
					name="address"
					onChange={(e) => {
						setAddress(e.target.value);
					}}
					defaultValue={address}
				/>
			</div>
            <div>
				<label htmlFor="profile_pic">Profile Photo URL</label>
				<input
                    className='newTradeTitle'
					name="profile_pic"
					onChange={(e) => {
						setProfilePic(e.target.value);
					}}
					defaultValue={profile_pic}
				/>
			</div>
			<button className='submitTradeButton' type="submit">Submit</button>
		</form>
	);
};

export default EditProfileForm;
