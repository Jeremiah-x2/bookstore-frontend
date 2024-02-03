'use client';
import { useEffect, useState } from 'react';
import './styles/cart.scss';
import Link from 'next/link';
import OrderItem from './Order';
import { syne } from '../layout';

export default function Cart({ showCart, setShowCart, fetchTrigger }) {
    const [isAuthenticate, setIsAuthenticate] = useState(null);
    const [orders, setOrders] = useState(null);
    useEffect(() => {
        const userToken = window.localStorage.getItem('userToken');
        // console.log(userToken);
        async function getOrders() {
            const request = await fetch('http://localhost:5000/orders', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userToken}`,
                },
            });
            const response = await request.json();

            console.log('request status', request.status);
            console.log('Request response', response);
            setOrders(response);
        }
        if (userToken) {
            setIsAuthenticate(true);
            getOrders();
        } else {
            // console.log('Not Authenticated');
        }
        // console.log(userToken);
    }, [fetchTrigger]);
    return (
        <section
            className={`cart--container ${showCart ? 'show' : ''} ${
                syne.className
            }`}>
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
                        <div className="orders">
                            {orders &&
                                orders.orders.map((item, index) => (
                                    <OrderItem
                                        item={item}
                                        key={index}
                                    />
                                ))}
                        </div>
                        <button className="logout--btn">Logout</button>
                    </>
                )}
            </div>
        </section>
    );
}
