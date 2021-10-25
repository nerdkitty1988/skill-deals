import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";

const LoginForm = () => {
	const [errors, setErrors] = useState([]);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const onLogin = async (e) => {
		e.preventDefault();
		const data = await dispatch(login(email, password));
		if (data) {
			setErrors(data);
		}
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	if (user) {
		return <Redirect to="/" />;
	}

	return (
		<form className="signinForm" onSubmit={onLogin}>
            <h1 className="signInHead">Have an account?  Sign In... <i className="fas fa-arrow-circle-down" /></h1>
			<div className="signinElements">
				{errors.map((error, ind) => (
					<div key={ind}>{error}</div>
				))}
			</div>
			<div className="signinElements">
				<label id="emailInput" className="inputLabel" htmlFor="email">
					Email
				</label>
				<input
					name="email"
					type="text"
					placeholder="Email"
					value={email}
					onChange={updateEmail}
					className="signinInput"
				/>
			</div>
			<div className="signinElements">
				<label className="inputLabel" htmlFor="password">
					Password
				</label>
				<input
					name="password"
					type="password"
					placeholder="Password"
					value={password}
					onChange={updatePassword}
					className="signinInput"
				/>
			</div>
            <div className="buttonContainer">
                <button className="loginButton" type="submit">
                    Login
                </button>
                <button
                    className="loginButton"
                    type="button"
                    onClick={(e) => {
                        setEmail("demo@aa.io");
                        setPassword("password");
                    }}>
                    Demo
                </button>

            </div>
		</form>
	);
};

export default LoginForm;
