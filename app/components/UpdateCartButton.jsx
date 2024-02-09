'use client';
import './styles/updatebtn.scss';
import React, { useState } from 'react';
import { deleteOrder } from './Order';

export async function updateQuantity(id, incrementBy, setOrderQuantity) {
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ incValue: incrementBy }),
        credentials: 'include',
    });
    const res = await req.json();
    if (req.ok) {
        setOrderQuantity((prev) => {
            return prev + incrementBy;
        });
    }
}

export default function UpdateCartButton({
    book,
    orders,
    orderQuantity,
    setOrderQuantity,
    setFetchTrigger,
}) {
    // const [count, setCount] = useState(orderQuantity);

    return (
        <div className="update--cart">
            {orderQuantity === 1 ? (
                <button
                    className="increase"
                    onClick={() => {
                        deleteOrder(book._id);
                        setOrderQuantity(0);
                        // setFetchTrigger((prev) => !prev);
                    }}>
                    -
                </button>
            ) : (
                <button
                    className="increase"
                    onClick={() => {
                        updateQuantity(book._id, -1, setOrderQuantity);
                        // setFetchTrigger((prev) => !prev);
                    }}>
                    -
                </button>
            )}
            <span className="count">{orderQuantity}</span>
            <button
                className="add"
                onClick={() => {
                    updateQuantity(book._id, 1, setOrderQuantity);
                    // setFetchTrigger((prev) => !prev);
                }}>
                +
            </button>
        </div>
    );
}
