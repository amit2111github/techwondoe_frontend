import { useState } from "react";
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
							color: index <= (hover || rating) ? "#000" : "#ccc",
						}}
						onClick={() => setRating(index)}
						onMouseEnter={() => setHover(index)}
						onMouseLeave={() => setHover(rating)}
					>
						<span className="star">&#9733;</span>
					</button>
				);
			})}
		</div>
	);
};

export default StarRating;
