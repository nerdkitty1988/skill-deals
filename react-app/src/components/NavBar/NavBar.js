import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import "./NavBar.css";
import ReactModal from "react-modal";
import TradeForm from "../NewTrade/NewTrade";
import NavDrop from "../NavDrop/NavDrop";

const NavBar = () => {
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [search, setSearch] = useState("");
	const [searchOffers, setSearchOffers] = useState();
	const [searchRequests, setSearchRequests] = useState();
	const [searchUsers, setSearchUsers] = useState();
    const [newMessage, setNewMessage] = useState(false);
	const sessionUser = useSelector((state) => state.session.user);

	let offerBlock;
	let requestBlock;
	let userBlock;
	if (searchOffers || searchRequests || searchUsers) {
        let offerIds = [];
        let requestIds = [];
        let userIds = [];

		offerBlock = searchOffers?.map((offer, i) => {
            if(!offerIds.includes(offer.id)){
                offerIds.push(offer.id);
                return (
                    <div key={`offerS_${offer.id}`}>
                        <a
                            key={`link${i}`}
                            href={`/offers/${offer.id}`}
                            className="tradeNav"
                        >
                            <div key={`liked'_${offer.id}`} className="singleTrade">
                                <h4 className="tradeTitle">{offer.title}</h4>
                            </div>
                        </a>
                    </div>
                );
            }else{
                return null;
            }
		});
		requestBlock = searchRequests?.map((request, i) => {
            if(requestIds.includes(request.id)) return null;
            else {
                requestIds.push(request.id)
                return (
                    <div key={`requestS_${request.id}`}>
                        <a
                            key={`link${i}`}
                            href={`/requests/${request.id}`}
                            className="tradeNav"
                        >
                            <div
                                key={`liked'_${request.id}`}
                                className="singleTrade"
                            >
                                <h4 className="tradeTitle">{request.title}</h4>
                            </div>
                        </a>
                    </div>
                );
            }
		});
		userBlock = searchUsers?.map((user, i) => {
            if(userIds.includes(user.id)) return null;
            else {
                userIds.push(user.id)
                return (
                    <div key={`userS_${user.id}`}>
                        <a
                            key={`link${i}`}
                            href={`/users/${user.id}`}
                            className="tradeNav"
                        >
                            <div key={`liked'_${user.id}`} className="singleTrade">
                                <h4 className="tradeTitle">{user.username}</h4>
                            </div>
                        </a>
                    </div>
                );
            }
		});
	}

	const clearSearch = () => {
		setSearch("");
	};

	useEffect(() => {
		if (search) {
			async function fetchData() {
				const response = await fetch(`/api/search/${search}`);
				const responseData = await response.json();
				setSearchOffers(responseData.offers);
				setSearchRequests(responseData.requests);
				setSearchUsers(responseData.users);
			}
			fetchData();
		}
	}, [search]);

    useEffect(()=> {
        async function fetchNewMessage() {
            const res = await fetch('/api/chats/new/');
            const data = await res.json();
            if (data.newMessage === 'true') setNewMessage(true)
        }
        fetchNewMessage();
    }, [])

	return (
		<div className="navContainer">
			<nav id="navbar" hidden={!sessionUser}>
				<div className="navbarLinks">
					<NavLink to="/" exact={true} className="homeNav">
						<img
							src="https://github.com/nerdkitty1988/skill-deals/blob/main/react-app/src/components/NavBar/logo.jpg?raw=true"
							alt="logo"
							id="navLogo"
						/>
					</NavLink>
					<NavLink
						to="/offers"
						exact={true}
						className="navbarButtons"
					>
						All Offers
					</NavLink>
					<NavLink
						to="/requests"
						exact={true}
						className="navbarButtons"
					>
						All Requests
					</NavLink>
					<button
						className="navbarButtons"
						id="addCard"
						onClick={() => setShowCreateModal(true)}
					>
						Add Offer or Request{" "}
						<i className="fas fa-plus-circle"></i>
					</button>
					<ReactModal
						isOpen={showCreateModal}
						contentLabel="CreateModal"
						className="loginModal"
					>
						<TradeForm setShowCreateModal={setShowCreateModal} />
						<button
							className="windowCloseButton"
							onClick={() => setShowCreateModal(false)}
						>
							<i className="fas fa-window-close"></i>
						</button>
					</ReactModal>
					<form
						id="header-search-form"
						className="site-search-form"
						title="Search Site"
					>
						<label className="sr-only">Enter search term</label>
						<input
							className="input-medium site-search-input"
							id="site-search-input"
							type="text"
							placeholder="Find..."
                            value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
						<button className="submit-btn" type="button">
							<i className="fas fa-search-dollar"></i>
						</button>
					</form>
                    <div hidden={!newMessage}>
                        <NavLink to='/chats' exact='true' className='notify'>NEW MESSAGE</NavLink>
                    </div>
                    <NavDrop />
				</div>
				{search ? (
					<div className="searchResultsContainer">
						<h3>Offers</h3>
						<ul className="searchedOffers">{offerBlock}</ul>
						<h3>Requests</h3>
						<ul className="searchedRequests">{requestBlock}</ul>
						<h3>Users</h3>
						<ul className="searchedUsers">{userBlock}</ul>
						<button
							className="clearSearchButton"
							onClick={clearSearch}
						>
							Clear results
						</button>
					</div>
				) : null}
			</nav>
		</div>
	);
};

export default NavBar;
