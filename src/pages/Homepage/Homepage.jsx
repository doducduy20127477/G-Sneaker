import React, { useEffect, useState } from "react";
import "./homepage.css";
import Logo from "../../assets/nike.png";
import CheckIcon from "../../assets/check.png";
import Trash from "../../assets/trash.png";
import Database from "../../data/shoes.json";

const Homepage = () => {
	const [products, setProducts] = useState([]);
	useEffect(() => {
		setProducts(Database.shoes);
	}, []);

	const [cartItems, setCartItems] = useState([]);
	useEffect(() => {
		const existingCart = localStorage.getItem("cart");
		setCartItems(existingCart ? JSON.parse(existingCart) : []);
	}, []);
	const [total, setTotal] = useState(0);
	useEffect(() => {
		// localStorage.clear();
		const existingTotal = localStorage.getItem("total");
		setTotal(existingTotal ? JSON.parse(existingTotal) : 0);
	}, []);

	const addToCart = (prod) => {
		setTotal((prevTotal) => {
			const resultTotal = prevTotal + prod.price;
			localStorage.setItem("total", JSON.stringify(resultTotal));
			return resultTotal;
		});

		let inCart = false;
		const updatedCart = cartItems.map((item) => {
			if (item.id === prod.id) {
				inCart = true;
				return { ...item, quantity: item.quantity + 1 };
			}
			return item;
		});

		if (!inCart) {
			updatedCart.push({
				id: prod.id,
				image: prod.image,
				name: prod.name,
				description: prod.description,
				price: prod.price,
				color: prod.color,
				quantity: 1,
			});
		}

		setCartItems(updatedCart);
		localStorage.setItem("cart", JSON.stringify(updatedCart));
	};

	const removeFromCart = (item) => {
		setTotal((prevTotal) => {
			const resultTotal = prevTotal - item.price * item.quantity;
			localStorage.setItem("total", JSON.stringify(resultTotal));
			return resultTotal;
		});

		setCartItems((prevCart) => {
			const updatedCart = prevCart.filter((cartItem) => cartItem.id !== item.id);
			localStorage.setItem("cart", JSON.stringify(updatedCart));
			return updatedCart;
		});
	};

	const add = (item) => {
		setTotal((prevTotal) => {
			const resultTotal = prevTotal + item.price;
			localStorage.setItem("total", JSON.stringify(resultTotal));
			return resultTotal;
		});

		setCartItems((prevCart) => {
			const updatedCart = prevCart.map((cartItem) => {
				if (cartItem.id === item.id) {
					return { ...cartItem, quantity: cartItem.quantity + 1 };
				}
				return cartItem;
			});
			localStorage.setItem("cart", JSON.stringify(updatedCart));
			return updatedCart;
		});
	};

	const sub = (item) => {
		setTotal((prevTotal) => {
			const resultTotal = prevTotal - item.price;
			localStorage.setItem("total", JSON.stringify(resultTotal));
			return resultTotal;
		});

		setCartItems((prevCart) => {
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
			localStorage.setItem("cart", JSON.stringify(updatedCart));
			return updatedCart;
		});
	};

	const isItemInCart = (item) => {
		return cartItems.some((cartItem) => cartItem.id === item.id);
	};

	const currencyFilter = (price) => {
		return "$" + price.toFixed(2);
	};

	return (
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
						{products.map((prod) => (
							<li
								className="product"
								key={prod.id}
							>
								<div className="box">
									<div
										className="image"
										style={{ backgroundColor: prod.color }}
									>
										<img
											className="shoe-image"
											src={prod.image}
										/>
									</div>
									<h3 className="title">{prod.name}</h3>
									<p className="description">{prod.description}</p>
									<div className="add-to-cart">
										<p className="price">{currencyFilter(prod.price)}</p>
										{isItemInCart(prod) ? (
											<img src={CheckIcon} />
										) : (
											<button
												className="add-button"
												onClick={() => addToCart(prod)}
											>
												ADD TO CART
											</button>
										)}
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className="col-sx">
				<div className="app-bar">
					<img
						className="logo"
						src={Logo}
						alt="Logo"
					/>
				</div>
				<div class="card-title">
					Your Cart
					<span class="cardTitleAmount">{cartItems.length > 0 ? currencyFilter(total) : "$0.00"}</span>
				</div>

				{cartItems.length > 0 ? (
					<div>
						{cartItems.map((item, id) => (
							<div
								key={"id-" + id}
								className="total"
							></div>
						))}
						<div className="cart">
							{cartItems.map((item) => (
								<div className="cardItem">
									<div className="cardItemLeft">
										<div
											className="cardItemImage"
											style={{ backgroundColor: item.color }}
										>
											<div className="cardItemImageBlock">
												<img src={item.image} />
											</div>
										</div>
									</div>
									<div className="cardItemRight">
										<div class="cartItemName">{item.name}</div>
										<div class="cartItemPrice">{currencyFilter(item.price)}</div>
										<div class="cartItemActions">
											<div class="cartItemCount">
												<div
													class="App_cartItemCountButton_Gr8VG"
													onClick={() => sub(item)}
												>
													-
												</div>
												<div class="cartItemCountNumber">{item.quantity}</div>
												<div
													class="App_cartItemCountButton_Gr8VG"
													onClick={() => add(item)}
												>
													+
												</div>
											</div>
											<div
												class="cartItemRemove"
												onClick={() => removeFromCart(item)}
											>
												<img src={Trash} />
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				) : (
					<div className="empty-contents">
						<p className="cart-empty-text">Your cart is empty</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default Homepage;
