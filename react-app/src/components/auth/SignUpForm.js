import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";

const SignUpForm = () => {
	const [errors, setErrors] = useState([]);
	const [username, setUsername] = useState();
	const [email, setEmail] = useState();
	const [public_email, setPublicEmail] = useState();
	const [password, setPassword] = useState();
	const [repeatPassword, setRepeatPassword] = useState();
	const [address, setAddress] = useState();
	const [range, setRange] = useState(50);
	const [profile_pic, setProfilePic] = useState("https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png");
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const onSignUp = async (e) => {
		e.preventDefault();
		if (password === repeatPassword) {
			const data = await dispatch(
				signUp(
					username,
					email,
					public_email,
					password,
					address,
                    range,
					profile_pic
				)
			);
			if (data) {
				setErrors(data);
			}
		}else{
            setErrors([...errors, 'Repeat Password: Passwords must match'])
        }
	};

	const updateUsername = (e) => {
		setUsername(e.target.value);
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePublicEmail = (e) => {
		setPublicEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	const updateRepeatPassword = (e) => {
		setRepeatPassword(e.target.value);
	};

	const updateAddress = (e) => {
		setAddress(e.target.value);
	};

	const updateRange = (e) => {
		setRange(e.target.value);
	};

	if (user) {
		return <Redirect to="/" />;
	}

	return (
		<form className='signinForm' onSubmit={onSignUp}>
			<div className='errors'>
				{errors.map((error, ind) => (
					<div key={ind}>*Input {error}</div>
				))}
			</div>
			<div>
				<label>User Name</label>
				<input
                    className='signupInput'
					type="text"
					name="username"
					onChange={(e) => updateUsername(e)}
					value={username}
                    required={true}
					placeholder="User name"
				></input>
			</div>
			<div>
				<label>Email</label>
				<input
                    className='signupInput'
					type="text"
					name="email"
					onChange={(e) => updateEmail(e)}
					value={email}
                    required={true}
					placeholder="Email used to log in"
				></input>
			</div>
			<div>
				<label>Public Email</label>
				<input
                    className='signupInput'
					type="text"
					name="public_email"
					placeholder="Email you can share"
					onChange={(e) => updatePublicEmail(e)}
                    required={true}
					value={public_email}
				></input>
			</div>
			<div>
				<label>Address</label>
				<input
                    className='signupInput'
					name="address"
					onChange={(e) => updateAddress(e)}
					value={address}
                    required={true}
                    placeholder="City, ST zipcode"
				></input>
			</div>
			<div>
				<label>Miles you are willing to travel</label>
				<input
                    className='signupInput'
					name="range"
					onChange={(e) => updateRange(e)}
                    required={true}
					value={range}
				></input>
			</div>
			<div>
				<label>Password</label>
				<input
                    className='signupInput'
					type="password"
					name="password"
					onChange={(e) => updatePassword(e)}
					value={password}
                    required={true}
					placeholder="Enter a password"
				></input>
			</div>
			<div>
				<label>Repeat Password</label>
				<input
                    className='signupInput'
					type="password"
					name="repeat_password"
					onChange={(e) => updateRepeatPassword(e)}
					value={repeatPassword}
					required={true}
					placeholder="Re-enter the password"
				></input>
			</div>
			<div>
				<label>Profile Photo Url</label>
				<input
                    type='url'
                    className='signupInput'
					name="profile_pic"
					defaultValue={profile_pic}
					onChange={(e) => setProfilePic(e.target.value)}
					placeholder="Enter your picture URL"
				></input>
			</div>
			<button className='loginButton' type="submit">Sign Up</button>
		</form>
	);
};

export default SignUpForm;
