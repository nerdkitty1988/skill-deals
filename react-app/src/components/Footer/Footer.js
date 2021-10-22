import React from "react";
import "./Footer.css";
const Footer = () => {
	return (
		<footer id="footer" className="footer footer-desktop ">
			<div className="footer-row footer-row-top">
				<div className="footer-find-me">
					<span className="title">Find Me</span>
					<ul>
						<li className="my-name">
							<span>{`Jami Travers | `}</span>
							<a
								href="https://www.linkedin.com/in/jami-travers-3393711aa/"
								rel="noreferrer"
								target="_blank"
							>
								<i className="fab fa-linkedin"></i>
							</a>
							<a
								href="https://github.com/nerdkitty1988"
								rel="noreferrer"
								target="_blank"
							>
								<i className="fab fa-github-square"></i>
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="footer-rule">
				<hr />
			</div>
			<div className="footer-row footer-row-bottom">
				<p>Copyright 2021 © All Rights Reserved</p>
			</div>
		</footer>
	);
};

export default Footer;
