'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import OrderItem from '../components/Order';
import Link from 'next/link';

async function getOrders() {
    console.log('Get orders from server');
    try {
        const request = await fetch('http://localhost:5000/orders', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!request.ok) {
            throw new Error('Failed to fetch orders');
        }

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
    const [fetchTrigger, setFetchTrigger] = useState(false);

    async function buyItem() {
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
        console.log(response);
    }

    useEffect(() => {
        async function getOrderData() {
            const data = await getOrders();
            setOrders(data);
        }
        if (
            document.cookie
                .split(';')
                .some((cookie) => cookie.trim().startsWith('token='))
        ) {
            setIsAuthenticate(true);
            getOrderData();
        }
    }, [fetchTrigger]);

    return (
        <>
            {/* {orders && JSON.stringify(orders.orders.length)} */}
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
                                    $
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
                                <button onClick={buyItem}>Buy</button>
                            </div>
                        </>
                    ) : (
                        <div>No item!</div>
                    )
                ) : (
                    <div>Opps! something wrong. Can't get orders</div>
                )
            ) : (
                <div>Login to see cart Items</div>
            )}
        </>
    );
}

// <>

//     <div>
//         {isAuthenticate ? (
//             orders && (
//                 <>
//                     {orders.length > 0 ? (
//                         <>
//                             {orders.orders.map((item, index) => (
//                                 <OrderItem
//                                     item={item}
//                                     setFetchTrigger={setFetchTrigger}
//                                     key={index}
//                                 />
//                             ))}
//                             <div className="checkout">
//                                 <span className="total--price">
//                                     $
//                                     {orders &&
//                                         orders.orders
//                                             .reduce(
//                                                 (x, y) =>
//                                                     x +
//                                                     y.book.price * y.quantity,
//                                                 0
//                                             )
//                                             .toFixed(2)}
//                                 </span>
//                                 <button onClick={buyItem}>Buy</button>
//                             </div>
//                         </>
//                     ) : (
//                         <div>No items</div>
//                     )}
//                 </>
//             )
//         ) : (
//             <div>Login to see your items</div>
//         )}
//     </div>
// </>;

{
    /* {orders && orders.orders.length > 0 ? (
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
)} */
}
