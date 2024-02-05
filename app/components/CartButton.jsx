'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

export default function CartButton({ bookId }) {
    const router = useRouter();
    const pathName = usePathname();
    async function addItem() {
        const request = await fetch(`http://localhost:5000/orders/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${window.localStorage.getItem(
                    'userToken'
                )}`,
            },
            credentials: 'include',
            body: JSON.stringify({ book: bookId }),
        });
        const response = await request.json();
        router.refresh();
        router.push(`/catalog/${bookId}`);
        if (request.status === 201) {
            // toast('order created successfully');
        }

        console.log(request.status);
    }
    return (
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
            {/* <ToastContainer /> */}
        </>
    );
}
