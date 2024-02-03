import React from 'react';
import '../components/styles/loading.scss';

export default function Loading() {
    return (
        <div className="loading">
            <span className="spinner"></span>
            Loading...
        </div>
    );
}
