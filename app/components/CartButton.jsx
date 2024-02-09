'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import UpdateCartButton from './UpdateCartButton';

export default function CartButton({ book }) {
    const [orderQuantity, setOrderQuantity] = useState(
        book.orders ? book.orders.quantity : null
    );

    const router = useRouter();
    async function addItem() {
        const request = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/orders/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ book: book._id }),
            }
        );
        const response = await request.json();
        console.log(response);
        if (request.status === 201) {
            setOrderQuantity(1);
        }

        console.log(request.status);
    }
    return (
        <>
            {orderQuantity && orderQuantity > 0 ? (
                <>
                    <UpdateCartButton
                        book={book}
                        orders={book.orders}
                        orderQuantity={orderQuantity}
                        setOrderQuantity={setOrderQuantity}
                    />
                </>
            ) : (
                <>
                    <button
                        className="buy--btn"
                        onClick={addItem}>
                        <Image
                            src={'/images/SHOPPING_CART.svg'}
                            width={26}
                            height={24}
                            alt="shopping cart"
                        />
                    </button>
                </>
            )}
        </>
    );
}
