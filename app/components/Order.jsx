import './styles/cartItem.scss';
import React from 'react';
import Image from 'next/image';
import { syne } from '../layout';

export default function OrderItem({ item }) {
    return (
        <div className={`order--item ${syne.className}`}>
            <Image
                src={item.book.image}
                width={100}
                height={150}
                alt="Order Item"
            />
            <div className="desc">
                <div>
                    <p>{item.book.title.slice(1, 10)}...</p>
                    <p>{item.book.author}</p>
                </div>
                <div className="cart--add">
                    <span className="reduce">-</span>
                    <span className="count">{item.quantity}</span>
                    <span className="add">+</span>
                </div>
            </div>
            <div className="p--delete">
                <p>${item.book.price}</p>
                <button className="delete--order">
                    <Image
                        src={'/images/TRASH.svg'}
                        width={30}
                        height={32}
                        alt="Delete"
                    />
                </button>
            </div>
        </div>
    );
}
