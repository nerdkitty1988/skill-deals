import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import "./auth.css"

const SignUpForm = () => {
	const [errors, setErrors] = useState([]);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [public_email, setPublicEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [address, setAddress] = useState("");
	const [range, setRange] = useState();
	const [profile_pic, setProfilePic] = useState("");
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

	const updateProfilePic = (e) => {
		setProfilePic(e.target.value);
	};

	if (user) {
		return <Redirect to="/" />;
	}

	return (
        <div className="fullSignup">

            <form onSubmit={onSignUp}>
                <div>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div>
                    <label>User Name</label>
                    <input
                        type="text"
                        name="username"
                        onChange={updateUsername}
                        value={username}
                        placeholder="Who are you?"
                        className="signupInput"
                    ></input>
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        onChange={updateEmail}
                        value={email}
                        placeholder="Email used to log in"
                        className="signupInput"
                    ></input>
                </div>
                <div>
                    <label>Public Email</label>
                    <input
                        type="text"
                        name="public_email"
                        placeholder="Email you can share"
                        onChange={updatePublicEmail}
                        value={public_email}
                        className="signupInput"
                    ></input>
                </div>
                <div>
                    <label>Address</label>
                    <input
                        name="address"
                        onChange={updateAddress}
                        value={address}
                        className="signupInput"
                        placeholder='Zipcode required, full address optional'
                    ></input>
                </div>
                <div>
                    <label>Miles you are willing to travel</label>
                    <input
                        name="range"
                        onChange={updateRange}
                        value={range}
                        className="signupInput"
                        placeholder='How far are you willing to travel for your offers?'
                    ></input>
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        onChange={updatePassword}
                        value={password}
                        placeholder="Enter a password"
                        className="signupInput"
                    ></input>
                </div>
                <div>
                    <label>Repeat Password</label>
                    <input
                        type="password"
                        name="repeat_password"
                        onChange={updateRepeatPassword}
                        value={repeatPassword}
                        required={true}
                        placeholder="Re-enter the password"
                        className="signupInput"
                    ></input>
                </div>
                <div>
                    <label>Profile Photo Url</label>
                    <input
                        type="text"
                        name="profile_pic"
                        onChange={updateProfilePic}
                        value={profile_pic}
                        placeholder="Enter your picture URL"
                        className="signupInput"
                    ></input>
                </div>
                <button className="loginButton" type="submit">Sign Up</button>
            </form>
        </div>
	);
};

export default SignUpForm;
