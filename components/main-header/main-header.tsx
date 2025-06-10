"use client";

import Link from "next/link";
import Image from "next/image";

import MainHeaderBackground from "@/components/main-header/background/main-header-background";
import logoImage from '@/assets/logo.png'
import classes from './main-header.module.css';
import {usePathname} from "next/navigation";
import NavLink from "@/components/nav-link/nav-link";

export default function MainHeader() {
    const pathName = usePathname();
    return (
        <>
            <MainHeaderBackground/>
            <header className={classes.header}>
                <Link className={classes.logo} href="/">
                    <Image
                        src={logoImage.src}
                        alt="A plate with food on it"
                        width={40}
                        height={40}
                        priority
                        quality={100}
                    />
                    NextLevel Food
                </Link>
                <nav className={classes.nav}>
                    <ul>
                        <li><NavLink href={"/meals"} children="Browse Meals" /></li>
                        <li><NavLink href={"/community"} children="Foodies Community" /></li>
                    </ul>
                </nav>
            </header>
        </>
    )
}