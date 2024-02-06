'use client';
import { useEffect, useState } from 'react';
import './styles/cart.scss';
import Link from 'next/link';
import OrderItem from './Order';
import { syne } from '../layout';

export default function Cart({
    showCart,
    setShowCart,
    fetchTrigger,
    setFetchTrigger,
}) {
    const [isAuthenticate, setIsAuthenticate] = useState(false);
    const [orders, setOrders] = useState(null);
    useEffect(() => {
        async function getOrders() {
            const request = await fetch('http://localhost:5000/orders', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const response = await request.json();
            if (request.status === 200) {
                setIsAuthenticate(true);
            }
            if (request.status === 403) {
                setIsAuthenticate(false);
            }

            console.log('request status', request.status);
            console.log('Request response', response);

            setOrders(response);
        }
        getOrders();
    }, [fetchTrigger]);
    return (
        <section
            className={`cart--container ${showCart ? 'show' : ''} ${
                syne.className
            }`}>
            {/* {JSON.stringify(orders)} */}
            <div className="heading">
                <span
                    className="close"
                    onClick={() => setShowCart(false)}>
                    X
                </span>
                <p className="title">Your Cart</p>
                {!isAuthenticate ? (
                    <div className="sign">
                        <Link href={'/user/signup'}>
                            <button className="signup--btn">Sign Up</button>
                        </Link>
                        <p>
                            Already have an account?{' '}
                            <Link href={'/user/login'}>Login</Link>
                        </p>
                    </div>
                ) : (
                    <>
                        <button className="logout--btn">Logout</button>
                        {/* <div className="orders">
                            {isAuthenticate && orders
                                ? orders.orders.map((item, index) => (
                                      <OrderItem
                                          item={item}
                                          key={index}
                                      />
                                  ))
                                : ''}
                        </div> */}
                        {isAuthenticate && orders && (
                            <>
                                <div className="orders">
                                    {orders.orders.map((item, index) => (
                                        <OrderItem
                                            item={item}
                                            key={index}
                                            setFetchTrigger={setFetchTrigger}
                                        />
                                    ))}
                                </div>
                                {/* {JSON.stringify(orders.orders)} */}
                                {orders.orders.length !== 0 ? (
                                    <div className="total">
                                        <div className="price">
                                            <span>Subtotal:</span>
                                            <span className="total--price">
                                                $
                                                {orders.orders
                                                    .reduce(
                                                        (x, y) =>
                                                            x +
                                                            y.book.price *
                                                                y.quantity,
                                                        0
                                                    )
                                                    .toFixed(2)}
                                            </span>
                                        </div>
                                        <div className="pay">
                                            <Link href={'/checkout'}>
                                                <button>Checkout</button>
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <div>You cart is Empty</div>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}
