import React, { useEffect, useState } from "react";
import axios from "axios";
import "./homepage.css";
import Logo from "../../assets/nike.png";
import Database from "../../data/shoes.json";

const Homepage = () => {
	const [products, setProducts] = useState([]);
	useEffect(() => {
		//"https://s3-us-west-2.amazonaws.com/s.cdpn.io/1315882/shoes.json"
		setProducts(Database.shoes);
	}, []);

	// const [products, setProducts] = useState([
	// 	{ id: 1, title: "Product One", description: "The iconic Nike Air Zoom Pegasus 36 offers more cooling and mesh that targets breathability across high-heat areas. A slimmer heel collar and tongue reduce bulk, while exposed cables give you a snug fit at higher speeds.", price: 9.99, color: "#e1e7ed" },
	// 	{ id: 2, title: "Product Two", description: "The iconic Nike Air Zoom Pegasus 36 offers more cooling and mesh that targets breathability across high-heat areas. A slimmer heel collar and tongue reduce bulk, while exposed cables give you a snug fit at higher speeds.", price: 12.99, color: "#e1e7ed" },
	// 	{ id: 3, title: "Product Three", description: "The iconic Nike Air Zoom Pegasus 36 offers more cooling and mesh that targets breathability across high-heat areas. A slimmer heel collar and tongue reduce bulk, while exposed cables give you a snug fit at higher speeds.", price: 8.0, color: "#e1e7ed" },
	// 	{ id: 4, title: "Product Four", description: "The iconic Nike Air Zoom Pegasus 36 offers more cooling and mesh that targets breathability across high-heat areas. A slimmer heel collar and tongue reduce bulk, while exposed cables give you a snug fit at higher speeds.", price: 10.5, color: "#e1e7ed" },
	// ]);
	const [cart, setCart] = useState([]);
	const [total, setTotal] = useState(0);

	const addItem = (prod) => {
		setTotal((prevTotal) => prevTotal + prod.price);

		let inCart = false;
		const updatedCart = cart.map((item) => {
			if (item.id === prod.id) {
				inCart = true;
				return { ...item, quantity: item.quantity + 1 };
			}
			return item;
		});

		if (!inCart) {
			updatedCart.push({
				id: prod.id,
				name: prod.name,
				price: prod.price,
				quantity: 1,
			});
		}

		setCart(updatedCart);
	};

	const add = (item) => {
		setTotal((prevTotal) => prevTotal + item.price);
		setCart((prevCart) => {
			const updatedCart = prevCart.map((cartItem) => {
				if (cartItem.id === item.id) {
					return { ...cartItem, quantity: cartItem.quantity + 1 };
				}
				return cartItem;
			});
			return updatedCart;
		});
	};

	const sub = (item) => {
		setTotal((prevTotal) => prevTotal - item.price);
		setCart((prevCart) => {
			const updatedCart = prevCart
				.map((cartItem) => {
					if (cartItem.id === item.id) {
						if (cartItem.quantity > 1) {
							return { ...cartItem, quantity: cartItem.quantity - 1 };
						}
						return null;
					}
					return cartItem;
				})
				.filter((cartItem) => cartItem !== null);
			return updatedCart;
		});
	};

	const currencyFilter = (price) => {
		return "$" + price.toFixed(2);
	};

	return (
		<div id="app">
			<div className="grid">
				<div className="col-sx">
					<div className="app-bar">
						<img
							className="logo"
							src={Logo}
							alt="Logo"
						/>
					</div>
					<div class="card-title">Our Products</div>
					<div className="products">
						<ul className="products-list">
							{products.map((prod, ind) => (
								<li
									className="product"
									key={"ind-" + ind}
								>
									<div className="box">
										<div
											className="image"
											style={{ backgroundColor: prod.color }}
										></div>
										<h3 className="title">{prod.name}</h3>
										<p className="description">{prod.description}</p>
										<div className="add-to-cart">
											<p className="price">{currencyFilter(prod.price)}</p>
											<button
												className="add-button"
												onClick={() => addItem(prod)}
											>
												Add to cart
											</button>
										</div>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className="col-dx">
					<div className="app-bar">
						<img
							className="logo"
							src={Logo}
							alt="Logo"
						/>
					</div>
					<div class="card-title">Your Cart</div>

					{cart.length > 0 ? (
						<div>
							{cart.map((item, id) => (
								<div
									key={"id-" + id}
									className="total"
								>
									{currencyFilter(total)}
								</div>
							))}
							<div className="cart">
								<table className="cart-list">
									<thead>
										<tr>
											<th className="head-title">Product</th>
											<th className="head-price">Price</th>
											<th className="head-quantity">Quantity</th>
											<th className="head-total">Total</th>
										</tr>
									</thead>
									<tbody>
										{cart.map((item, id) => (
											<tr
												key={"id-" + id}
												className="cart-item"
											>
												<td>
													<h4 className="title">{item.name}</h4>
												</td>
												<td>
													<div className="price">{currencyFilter(item.price)}</div>
												</td>
												<td>
													<div className="quantity">
														{item.quantity}
														<span className="qty-handler">
															<span onClick={() => add(item)}>+</span>
															<span onClick={() => sub(item)}>-</span>
														</span>
													</div>
												</td>
												<td>
													<div className="total">{currencyFilter(item.price * item.quantity)}</div>
												</td>
											</tr>
										))}
									</tbody>
									<tfoot>
										<tr>
											<th colSpan="3">
												<h4 className="total-title">Total</h4>
											</th>
											<th>{currencyFilter(total)}</th>
										</tr>
									</tfoot>
								</table>
							</div>
						</div>
					) : (
						<div className="empty-contents">
							<div className="draw">{/* Add SVG elements from the original code */}</div>
							<p className="no-items-text">Your cart is empty</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Homepage;
