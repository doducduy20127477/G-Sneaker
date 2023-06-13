import "./cart.css";

export default function TopBar() {
	return (
		<div className="card">
			<img
				className="card-image"
				src="https://via.placeholder.com/150"
				alt="Card"
			/>
			<div className="card-content">
				<h2 className="card-title">Card Title</h2>
				<p className="card-description">This is a sample card description. You can replace it with your own content.</p>
				<button className="card-button">Button</button>
			</div>
		</div>
	);
}
