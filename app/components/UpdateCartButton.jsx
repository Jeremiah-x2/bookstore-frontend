'use client';
import './styles/updatebtn.scss';
import React, { useState } from 'react';
import { deleteOrder } from './Order';

export default function UpdateCartButton({
    book,
    orders,
    orderQuantity,
    setOrderQuantity,
}) {
    // const [count, setCount] = useState(orderQuantity);
    async function updateQuantity(id, incrementBy) {
        const req = await fetch(`http://localhost:5000/orders/${id}`, {
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

    return (
        <div className="update--cart">
            {orderQuantity === 1 ? (
                <button
                    className="increase"
                    onClick={() => {
                        deleteOrder(book._id);
                        setOrderQuantity(0);
                    }}>
                    -
                </button>
            ) : (
                <button
                    className="increase"
                    onClick={() => updateQuantity(book._id, -1)}>
                    -
                </button>
            )}
            <span className="count">{orderQuantity}</span>
            <button
                className="add"
                onClick={() => updateQuantity(book._id, 1)}>
                +
            </button>
        </div>
    );
}
