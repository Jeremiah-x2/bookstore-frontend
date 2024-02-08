'use client';
import React, { useEffect, useState } from 'react';

async function getUser(id) {
    const request = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
        {
            credentials: 'include',
        }
    );
    console.log(request);
    const res = await request.json();
    console.log(res);
    return res;
}

export default function Account({ params }) {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        async function userDataGet() {
            const response = await getUser(params.userId);
            setUserData(response);
        }
        userDataGet();
    }, []);
    return (
        <>
            {userData && (
                <div>
                    <h2>Name: {userData.name}</h2>
                    <p>Email: {userData.email}</p>
                </div>
            )}
        </>
    );
}
