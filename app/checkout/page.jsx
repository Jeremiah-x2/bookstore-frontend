'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import OrderItem from '../components/Order';
import Link from 'next/link';

async function getOrders() {
    const request = await fetch('http://localhost:5000/orders', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    console.log(request);
    const response = await request.json();
    return response;
}

export default function page() {
    const router = useRouter();
    const [orders, setOrders] = useState(null);
    const [fetchTrigger, setFetchTrigger] = useState(false);

    async function buyItem() {
        const request = await fetch('http://localhost:5000/bought', {
            method: 'POST',
            credentials: 'include',
        });
        // console.log(request.status);
        const response = await request.json();
        if (request.ok) {
            setFetchTrigger((prev) => !prev);
            router.push('/ordersuccessful');
        }
        // console.log(response);
    }

    useEffect(() => {
        async function getOrderData() {
            const data = await getOrders();
            setOrders(data);
        }
        getOrderData();
    }, [fetchTrigger]);

    // console.log(orders);

    return (
        <>
            <div>
                {/* {orders && JSON.stringify(orders)} */}
                {orders && orders.orders.length > 0 ? (
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
                                $
                                {orders &&
                                    orders.orders
                                        .reduce(
                                            (x, y) =>
                                                x + y.book.price * y.quantity,
                                            0
                                        )
                                        .toFixed(2)}
                            </span>
                            <button onClick={buyItem}>Buy</button>
                        </div>
                    </>
                ) : (
                    <div>
                        <p>You have no pending items in your Cart</p>
                        <Link href={'/'}>
                            <button>Continue Shopping</button>
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}
