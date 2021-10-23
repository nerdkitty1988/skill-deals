import { NavLink } from "react-router-dom";
import "./Splash.css";
import Home from "../Home/Home";
import { useSelector } from "react-redux";
import { useState } from "react";
import ReactModal from 'react-modal';
import LoginForm from "../auth/LoginForm";

const Splash = () => {
	const sessionUser = useSelector((state) => state.session.user);
	const [showModal, setShowModal] = useState(false);

	if (!sessionUser) {
		return (
			<div id="wholePage">
				<div className="splashPage">
					<div className="welcome">
						<div className="links">
							<h1 className="siteName">Skill Deals</h1>
							<button
								type="button"
								className="welcomeNav"
								onClick={() => setShowModal(true)}
							>
								Sign In
							</button>
							<ReactModal
								isOpen={showModal}
								contentLabel="Minimal Modal Example"
                                className="loginModal"
							>
                                <LoginForm />
								<button className="windowCloseButton" onClick={()=> setShowModal(false)}>
                                    <i className="fas fa-window-close"></i>
								</button>
							</ReactModal>
							<NavLink className="welcomeNav" to="/signup">
								Sign Up
							</NavLink>
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		return <Home />;
	}
};

export default Splash;
