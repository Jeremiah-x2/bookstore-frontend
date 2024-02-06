'use client';
import { syne } from '@/app/layout';
import '@/app/components/styles/authenticate.scss';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    function setValue(e) {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    }

    async function createUser(e) {
        e.preventDefault();
        if (formData.password === formData.confirmPassword) {
            const request = await fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const response = await request.json();
            if (request.status === 409) {
                toast('Email already exists');
            }
            return;
        } else {
            console.log('passwords do not match', formData);
            toast('Passwords do not match');
        }
    }

    return (
        <div className={`form ${syne.className}`}>
            <form onSubmit={createUser}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    placeholder="Enter your name"
                    onChange={setValue}
                />
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
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={setValue}
                    placeholder="Confirm Password"
                />
                <button className="create--acct--btn btn">Signup</button>
            </form>
            <p>
                Already have an account? <Link href={'/user/login'}>Login</Link>
            </p>
            <ToastContainer />
        </div>
    );
}
