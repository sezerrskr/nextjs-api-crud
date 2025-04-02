import React from 'react'
import styles from "./navbar.module.css";
import Link from 'next/link';

const Navbar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h1 className={styles.logo}>CRUD</h1>
            </div>
            <div className={styles.links}>
                <button>Post</button>
                <Link href="/">Hesap</Link>
            </div>
        </div>
    )
}

export default Navbar