import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation, NavLink } from "react-router-dom";
import './NewReview.css';

const NewReview = () => {
    const history = useHistory();
	const location = useLocation();
    const { review } = location.state
	const { reviewedUser } = location.state;
	const [errors, setErrors] = useState([]);
	const [rating, setRating] = useState(review?.rating);
	const [comment, setComment] = useState(review?.comment);

	const sessionUser = useSelector((state) => state.session.user);

	const onSubmit = async (e) => {
		e.preventDefault();
        let res;
        if(!review) {
            res = await fetch("/api/reviews/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    author_id: sessionUser.id,
                    reviewed_user_id: reviewedUser.id,
                    rating,
                    comment,
                }),
            });
        }else{
            res = await fetch(`/api/reviews/${review.id}/`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    author_id: sessionUser.id,
                    reviewed_user_id: reviewedUser.id,
                    rating,
                    comment,
                }),
            });
        }
		if (res.ok) {
			const data = await res.json();
			if (data.errors) {
				setErrors(data.errors);
			} else {
				history.push(`/users/${reviewedUser.id}`);
			}
		} else {
			return ["An error occured.  Please try again."];
		}
	};

	return (
		<div className="wholeReview">
			<div className="reviewFormBox">
				<p className="describeEdit">
					Please rate your interaction with this user{" "}
					{reviewedUser.username}.{" "}
				</p>
				<p className="describeEdit">
					Use a value between 1 and 10; 1 Being the worst experience,
					10 being the best.
				</p>
				<p className="describeEdit">
					{" "}
					After you rate your experience, please provide an
					explaination of why you gave the rating you did.
				</p>
				<form className='addReviewForm' onSubmit={(e) => onSubmit(e)}>
					<div>
						{errors.map((error, ind) => (
							<div className='errors' key={ind}>{error}</div>
						))}
					</div>
					<label className='addReviewLabel' for="rating">Rating</label>
					<input
                        className='addReviewInput'
						type="number"
						name="rating"
						min="1"
						max="10"
						defaultValue={rating}
						onChange={(e) => {
							setRating(e.target.value);
						}}
					/>
					<label className='addReviewLabel' for="comment">Why this rating?</label>
					<textarea
                        className='addReviewText'
						name="comment"
						defaultValue={comment}
						onChange={(e) => {
							setComment(e.target.value);
						}}
					/>
					<button className='createReviewButton' type="submit">Submit</button>
                    <NavLink className='cancelButton' to={`/users/${reviewedUser.id}`}>Cancel</NavLink>
				</form>
			</div>
		</div>
	);
};

export default NewReview;
