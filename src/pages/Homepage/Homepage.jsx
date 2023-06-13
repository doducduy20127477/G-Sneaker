import React, { useEffect, useState } from "react";
import axios from "axios";
import "./homepage.css";
import Logo from "../../assets/nike.png";
import CheckIcon from "../../assets/check.png";
import Database from "../../data/shoes.json";

const Homepage = () => {
	const [products, setProducts] = useState([]);
	useEffect(() => {
		setProducts(Database.shoes);
	}, []);

	const [cartItems, setCartItems] = useState([]);
	const [total, setTotal] = useState(0);

	const addToCart = (prod) => {
		setTotal((prevTotal) => prevTotal + prod.price);

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
				price: prod.price,
				color: prod.color,
				quantity: 1,
			});
		}

		setCartItems(updatedCart);
	};

	const removeFromCart = (item) => {
		setTotal((prevTotal) => prevTotal - item.price * item.quantity);
		setCartItems((prevCart) => {
			const updatedCart = prevCart.filter((cartItem) => cartItem.id !== item.id);
			return updatedCart;
		});
	};

	const add = (item) => {
		setTotal((prevTotal) => prevTotal + item.price);
		setCartItems((prevCart) => {
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
				<div className="col-dx">
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
								>
									{/* {currencyFilter(total)} */}
								</div>
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
													<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAB2AAAAdgB+lymcgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAALISURBVHic7Zs9bxNBEIYfgyUKAhhQUhDRICEBCh0fgkhBNIT8gPwZ6Gig5y8QCUhH5AqE3EZJgQRKEDSpKEAQkTMdcijGRvi8Z+/e3eze4X2kKe40t/Pu+LRfN4bIdNNQbLsJ3ATOFWznC7AJ/C6syCMngC3gsCTb7LdZGx5SXucH9kBD6BGNRoGrNWlTLQEa7R5VaFMtAbXBZwLWkVnHxtZ9iZr6N6Bp6TcHXAOOW/qfz7i36un5X8A28NXSfywrQJfypzVtS4D7ZSRgpwKdyWsfJnXOZincxf7VrxoJcHKcg80g2ClFShg6ZTQyD2xQr3GgC7yi+EYs8t+TZ329gKwJfiLzbRU4Cywh/fmuGegpw/PssmYwS5aAfURTD3ikFegKo4PNe61gDrxjWFMPuGj7sMte4JLh3mWH57VYSF03cDg7cEmAabxQ2aM7UkjX1O8GfSRgHmgjM8YO4wfOFWC379umYguZVcyrrkm0U/4JMGvwm2N0tblh0b5Jk+222csbcCd1PYOsI9KYzhvuqij6Bx8JMO0kZyz91HehcRAMLSA0MQGhBYQmJiC0gNDEBIQWEJqYgNACQhMTEFpAaGICQgsITUxAaAGhiQnwEMP0+axr6af+6c1HAjqp6wQpo02zxWhi3moIykveU+FBfUGCfEq7N8Z3GSlrSbD/vl/oVNiFvAnQpvLH4pUmJsDBN2tEDlnHn1UBZppljLgkYC/j/i2HNspmMeP+nkawY8ABowPOa41gFjSQaTKt5wDRqsKaIeAh8Bjd/x+laQBPMrQ80wy8iJSgmAK/QWpzW4rxW8gndNMvPyiPua0YH4DnGcGrYGuK/f7LGeBjgM5Nsl3gtGK/h7gAfFbukIt96mvySgt4WVB4UesBL4BTyn0dy42+iEGxog/bR8ai60XFlzl1NZFiyllknNDgB/ANKbaq1V9pI1XlD82w8ru3YIVHAAAAAElFTkSuQmCC" />
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					) : (
						<div className="empty-contents">
							<div className="draw">{/* Add SVG elements from the original code */}</div>
							<p className="cart-empty-text">Your cart is empty</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Homepage;
