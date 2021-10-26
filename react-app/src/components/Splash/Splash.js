
import "./Splash.css";
import Home from "../Home/Home";
import { useSelector } from "react-redux";
import { useState } from "react";
import ReactModal from 'react-modal';
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";

const Splash = () => {
	const sessionUser = useSelector((state) => state.session.user);
	const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);

	if (!sessionUser) {
		return (
			<div id="wholePage">
				<div className="splashPage">
					<div className="welcome">
						<div className="links">
							<h1 className="siteName">Skill Deals</h1>
                            <h4>"A new way to barter..."</h4>
							<button
								type="button"
								className="welcomeNav"
								onClick={() => setShowLoginModal(true)}
							>
								Log In
							</button>
							<ReactModal
								isOpen={showLoginModal}
								contentLabel="LoginModal"
                                className="loginModal"
							>
                                <LoginForm />
								<button className="windowCloseButton" onClick={()=> setShowLoginModal(false)}>
                                    <i className="fas fa-window-close"></i>
								</button>
							</ReactModal>
							<button
								type="button"
								className="welcomeNav"
								onClick={() => setShowSignUpModal(true)}
							>
								Sign Up
							</button>
							<ReactModal
								isOpen={showSignUpModal}
								contentLabel="Minimal Modal Example"
                                className="loginModal"
							>
                                <SignUpForm />
								<button className="windowCloseButton" onClick={()=> setShowSignUpModal(false)}>
                                    <i className="fas fa-window-close"></i>
								</button>
							</ReactModal>
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
