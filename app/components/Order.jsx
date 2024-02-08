import './styles/cartItem.scss';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { syne } from '../layout';
import CartButton from './CartButton';
import UpdateCartButton from './UpdateCartButton';

export async function deleteOrder(id) {
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`, {
        method: 'DELETE',
        credentials: 'include',
    });
    console.log(req);
    const res = await req.json();
    console.log(res);
}
export default function OrderItem({ item, setFetchTrigger }) {
    const [orderQuantity, setOrderQuantity] = useState(item.quantity);
    return (
        <div className={`order--item ${syne.className}`}>
            <Link href={`/catalog/${item.book._id}`}>
                <Image
                    src={item.book.image}
                    width={100}
                    height={150}
                    sizes="(max-width: 600) 50px"
                    alt="Order Item"
                />
            </Link>
            <div className="desc">
                <div>
                    <p>{item.book.title.slice(1, 10)}...</p>
                    <p>{item.book.author}</p>
                </div>
                <div className="cart--add">
                    {/* <span className="reduce">-</span>
                    <span className="count">{item.quantity}</span>
                    <span className="add">+</span> */}
                    {/* <CartButton book={item.book} /> */}
                    <UpdateCartButton
                        book={item.book}
                        orderQuantity={orderQuantity}
                        setOrderQuantity={setOrderQuantity}
                    />
                </div>
            </div>
            {/* {JSON.stringify(item)} */}
            <div className="p--delete">
                <p>
                    ${item.book.price} <br />{' '}
                    <span>{item.quantity} Item(s)</span>
                    <br />
                    <span>
                        Total:{' '}
                        {(item.book.price * item.quantity).toLocaleString()}
                    </span>
                </p>
                <button
                    className="delete--order"
                    onClick={() => {
                        deleteOrder(item.book._id);
                        setFetchTrigger((prev) => !prev);
                    }}>
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
