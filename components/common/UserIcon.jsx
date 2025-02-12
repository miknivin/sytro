
"use client";
import { useSelector } from 'react-redux'
import Link from 'next/link'
export default function UserIcon() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    return (
        <>
        <Link
            href={isAuthenticated?'/my-account':'#login'}
            data-bs-toggle={isAuthenticated?"":"modal"}
            className="nav-icon-item"
        >
            <i className="icon icon-account" />
            </Link>
        </>
    );
}