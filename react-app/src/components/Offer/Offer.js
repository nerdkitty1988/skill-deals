import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Offer.css";

const Offer = () => {
    const sessionUser = useSelector((state) => state.session.user);

    const [offers, setOffers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`/api/offers/`);
            await res.json().then((offers) => {
                setOffers(offers.offers)
            });
        }
        fetchData();
    }, [setOffers]);

    const offerCard = offers?.map((offer) => {
        if(offer.userId !== sessionUser.id) {
            return (
                <NavLink
                    key={`offer'_${offer.id}`}
                    to={`/offers/${offer.id}`}
                    className="requestNav"
                >
                    <div key={`offer'_${offer.id}`} className="singleOffer">
                        <h4 className="offerTitle">{offer.title}</h4>
                        <p className="authorName">by: {offer.user.username} </p>
                        {/* <p className="distance">{reqDistance[Offer.id]} miles away</p> */}
                        <p className="posted">POSTED:{new Date(offer.createdAt).toLocaleDateString()}</p>
                    </div>
                </NavLink>
            )
        }return null;
    })

    return (
        <div className="offerPage1">
            {offerCard}
        </div>
    )
}
export default Offer;
