'use client';
import { syne } from '@/app/layout';
import '@/app/components/styles/authenticate.scss';
import Link from 'next/link';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    function setValue(e) {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    }

    async function loginUser(e) {
        e.preventDefault();
        const request = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData),
            }
        );
        const response = await request.json();
        if (request.status === 401) {
            toast('Wrong Password');
        }
        if (request.status === 404) {
            toast('User does not exist');
        }
        if (request.status === 201) {
            window.localStorage.setItem('_id', response.user._id);
            toast('Logged in successfully');
            router.refresh();
            router.push('/');
            router.refresh();
            // router.push('/');
        }
    }

    return (
        <div className={`form ${syne.className}`}>
            <form onSubmit={loginUser}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={setValue}
                    placeholder="Email"
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={setValue}
                    placeholder="Create a password"
                />
                <button className="create--acct--btn btn">Login</button>
            </form>
            <p>
                Don&apos;t have and account{' '}
                <Link href={'/user/signup'}>Sign Up</Link>
            </p>
            <ToastContainer />
        </div>
    );
}
