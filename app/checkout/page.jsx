'use client';
import '@/app/components/styles/checkout.scss';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import OrderItem from '../components/Order';
import Link from 'next/link';
import { Syne } from 'next/font/google';
import { motion } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const syne = Syne({ subsets: ['latin'], weight: ['400', '500', '500'] });

async function getOrders() {
    console.log('Get orders from server');
    try {
        const request = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/orders`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            }
        );

        if (!request.ok) {
            throw new Error('Failed to fetch orders');
        }
        await new Promise((resolve) =>
            setTimeout(() => {
                console.log('Hello');
                resolve();
            }, 3000)
        );

        const response = await request.json();
        console.log(response);
        return response;
    } catch (error) {
        console.error('Error fetching orders:', error);
        return null;
    }
}

export default function Checkout() {
    const router = useRouter();
    const [isAuthenticate, setIsAuthenticate] = useState(false);
    const [orders, setOrders] = useState(null);
    const [gateWay, setGateWay] = useState(false);
    const [fetchTrigger, setFetchTrigger] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    async function buyItem() {
        setSubmitting(true);

        const request = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/bought`,
            {
                method: 'POST',
                credentials: 'include',
            }
        );

        const response = await request.json();
        if (request.ok) {
            setFetchTrigger((prev) => !prev);
            router.push('/ordersuccessful');
        }
    }

    useEffect(() => {
        async function getOrderData() {
            const data = await getOrders();
            setOrders(data);
        }
        if (localStorage.getItem('_id')) {
            setIsAuthenticate(true);
        }
        getOrderData();
    }, [fetchTrigger]);

    return (
        <main className={`${syne.className} checkout--items`}>
            {gateWay && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    exit={{ opacity: 0 }}
                    className="payment--gateway">
                    <button
                        className="edit--cart"
                        onClick={() => setGateWay(false)}>
                        Edit Cart
                    </button>
                    <div>
                        <div>
                            <p>Checkout</p>
                            <p>Confirm Details</p>
                            <div>
                                <p>
                                    <span>Total Price:</span> $
                                    {orders.orders
                                        .reduce(
                                            (x, y) =>
                                                x + y.book.price * y.quantity,
                                            0
                                        )
                                        .toFixed(2)}
                                </p>
                                <p>Location: Determined by location</p>
                            </div>
                            <div className="card--details">
                                <h5>Card details</h5>
                                <div>
                                    <div className="holder">
                                        <p>CARD HOLDER</p>
                                        <input
                                            type="number"
                                            placeholder="Card Holder"
                                            required={true}
                                        />
                                    </div>
                                    <div className="expire">
                                        <p>EXPIRATION DATE</p>
                                        <span>
                                            <input
                                                type="number"
                                                placeholder="MM / YY"
                                                required={true}
                                            />
                                        </span>
                                    </div>
                                    <div className="number">
                                        <p>CARD NUMBER</p>
                                        <input
                                            type="number"
                                            placeholder="Card Number"
                                            required={true}
                                        />
                                    </div>
                                    <div className="cvc">
                                        <p>CVC</p>
                                        <input
                                            type="number"
                                            placeholder="CVC"
                                            maxLength={3}
                                            required={true}
                                        />
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={buyItem}
                                disabled={submitting}>
                                {submitting ? 'Checking out...' : 'Checkout'}
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}

            {isAuthenticate ? (
                orders ? (
                    orders.orders.length >= 1 ? (
                        <>
                            {orders.orders.map((item, index) => (
                                <OrderItem
                                    item={item}
                                    setFetchTrigger={setFetchTrigger}
                                    key={index}
                                />
                            ))}
                            <div className="checkout">
                                <span className="total--price">
                                    Total Amount: $
                                    {orders &&
                                        orders.orders
                                            .reduce(
                                                (x, y) =>
                                                    x +
                                                    y.book.price * y.quantity,
                                                0
                                            )
                                            .toFixed(2)}
                                </span>
                                <button onClick={() => setGateWay(true)}>
                                    Buy
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="empty--cart">
                            <p>No item available in your Cart</p>
                            <p>
                                Explore our Catalog{' '}
                                <Link href={'/catalog'}>Here</Link>
                            </p>
                        </div>
                    )
                ) : (
                    <>
                        <OrderSkeleton />
                    </>
                )
            ) : (
                <div className="not--auth--cart">
                    <p>
                        You&apos;re currently not Logged In. <br />
                        Log in to see Cart Items{' '}
                    </p>
                    <Link href={'/user/login'}>Login</Link>
                </div>
            )}
        </main>
    );
}

function CheckoutForm() {
    return (
        <form>
            <label htmlFor="country"></label>
            <input
                type="text"
                name="Country"
                id="country"
            />
            <label htmlFor="state"></label>
            <input
                type="text"
                name="Country"
                id="country"
            />
            <label htmlFor=""></label>
        </form>
    );
}

function OrderSkeleton() {
    return Array(4)
        .fill(0)
        .map((item, index) => (
            <div
                className="order--skeleton"
                key={index}>
                <div className="image">
                    <Skeleton height={'100%'} />
                </div>
                <div className="desc">
                    <p>
                        <Skeleton
                            count={2}
                            style={{ marginBottom: 8 }}
                        />
                    </p>
                    <div className="amount">
                        <Skeleton />
                    </div>
                </div>
                <div className="price">
                    <p className="price">
                        <Skeleton count={3} />
                    </p>
                    <div className="delete">
                        <Skeleton height={'100%'} />
                    </div>
                </div>
            </div>
        ));
}
