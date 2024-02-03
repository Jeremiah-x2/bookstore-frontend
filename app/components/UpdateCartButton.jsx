import React from 'react';

export default function UpdateCartButton({ quantity }) {
    return (
        <div className="update--cart">
            <button className="increase">-</button>
            <span className="count">{quantity}</span>
            <button className="add">+</button>
        </div>
    );
}
