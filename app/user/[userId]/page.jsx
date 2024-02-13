'use client';
import React, { useEffect, useState } from 'react';

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
            userDataGet();
            setIsUser(true);
        }
    }, []);
    return (
        <>
            {userData && (
                <div>
                    <h2>Name: {userData.name}</h2>
                    <p>Email: {userData.email}</p>
                </div>
            )}
            {!isUser && <div>Login to see your account details</div>}
        </>
    );
}
