"use client"

interface ErrorPageProps {
    error: Error & { digest?: string };
}

export default function ErrorPage({error}: ErrorPageProps) {
    return (
        <main className="error">
            <h1>An error occurred!</h1>
            <p>Failed to fetch meal data! Please try again later</p>
            <p>{error.message}</p>
        </main>
    )
}