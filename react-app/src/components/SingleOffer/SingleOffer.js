import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import "./SingleOffer.css";


const SingleOffer = () => {
    const { offerId } = useParams()
    const [offer, setOffer] = useState()

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`/api/offers/${offerId}/`);
            await res.json().then((data) => {
                setOffer(data.offer);
            });
        }
        fetchData();
    }, [offerId]);

    return (
        <div className="wholeTradePage">
            <div className="tradeContainer">
                <h1>{offer?.title}</h1>
                <NavLink to={`/users/${offer?.userId}`} ><h2>by: {offer?.user.username}</h2></NavLink>
                <h2>Posted on: {new Date(offer?.createdAt).toLocaleDateString()}</h2>
                <p>Description: {offer?.description}</p>
            </div>
        </div>
    )
}

export default SingleOffer;
