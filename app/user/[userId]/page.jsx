'use client';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

async function getUser(id) {
    const request = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
        {
            credentials: 'include',
        }
    );
    const res = await request.json();
    return res;
}

export default function Account({ params }) {
    const [userData, setUserData] = useState(null);
    const [isUser, setIsUser] = useState(false);

    useEffect(() => {
        async function userDataGet() {
            const response = await getUser(params.userId);

            setUserData(response);
        }
        if (localStorage.getItem('_id')) {
            setIsUser(true);
            userDataGet();
        }
    }, []);
    return (
        <>
            {userData && (
                <div>
                    <h2>Name: {userData.name || <Skeleton />}</h2>
                    <p>Email: {userData.email}</p>
                </div>
            )}
            {!isUser && <div>Login to see your account details</div>}
        </>
    );
}
