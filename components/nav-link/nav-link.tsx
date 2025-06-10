"use client";

import classes from "@/components/nav-link/nav-link.module.css";
import Link from "next/link";
import {usePathname} from "next/navigation";

interface NavLinkProps {
    children?: Readonly<React.ReactNode>;
    href: string;
}

export default function NavLink({href, children}) {
    const pathName = usePathname();

    return (
        <Link href={href} className={pathName.startsWith(href) ? `${classes.link} ${classes.active}` : classes.link}>
            {children}
        </Link>
    )
}