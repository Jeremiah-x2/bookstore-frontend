'use client';
import React, { useState } from 'react';

export default function UpdateCartButton({ orders }) {
    const [count, setCount] = useState(orders.quantity);
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
            setCount((prev) => {
                if (incrementBy === -1 && prev === 0) {
                    return;
                }
                return prev + incrementBy;
            });
        }
    }

    return (
        <div className="update--cart">
            <button
                className="increase"
                onClick={() => updateQuantity(orders._id, -1)}>
                -
            </button>
            <span className="count">{count}</span>
            <button
                className="add"
                onClick={() => updateQuantity(orders._id, 1)}>
                +
            </button>
        </div>
    );
}
