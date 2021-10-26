import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

const NewReview = () => {
	const history = useHistory();
	const location = useLocation();
	const [errors, setErrors] = useState([]);
	const [rating, setRating] = useState();
	const [comment, setComment] = useState();

	const { reviewedUser } = location.state;
	const sessionUser = useSelector((state) => state.session.user);

	const onSubmit = async (e) => {
		e.preventDefault();
		console.log(reviewedUser.id, rating, comment, sessionUser.id);
		const res = await fetch("/api/reviews/", {
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
				<form onSubmit={(e) => onSubmit(e)}>
					<div>
						{errors.map((error, ind) => (
							<div key={ind}>{error}</div>
						))}
					</div>
					<label for="rating">Rating</label>
					<input
						type="number"
						name="rating"
						min="1"
						max="10"
						value={rating}
						onChange={(e) => {
							setRating(e.target.value);
						}}
					/>
					<label for="comment">Why this rating?</label>
					<textarea
						name="comment"
						value={comment}
						onChange={(e) => {
							setComment(e.target.value);
						}}
					/>
					<button type="submit">Submit</button>
				</form>
			</div>
		</div>
	);
};

export default NewReview;
