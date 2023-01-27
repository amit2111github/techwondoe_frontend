import React, { useState } from "react";
import PropTypes from "prop-types";
const StarRating = ({ rating, setRating }) => {
	const [hover, setHover] = useState(0);
	const button = {
		backgroundColor: "transparent",
		border: "none",
		outline: "none",
		cursor: "pointer",
	};
	return (
		<div className="star-rating text-center">
			{[...Array(5)].map((star, index) => {
				index += 1;
				return (
					<button
						type="button"
						key={index}
						style={{
							...button,
							color: index <= (hover || rating) ? "#ffa00a" : "#ccc",
						}}
						onClick={() => setRating(index)}
						onMouseEnter={() => setHover(index)}
						onMouseLeave={() => setHover(rating)}
					>
						<span style={{ fontSize: "30px" }} className="star">
							&#9733;
						</span>
					</button>
				);
			})}
		</div>
	);
};
StarRating.propTypes = {
	rating: PropTypes.any,
	setRating: PropTypes.func,
};
export default StarRating;
