"use client";

import { useState, useEffect, useCallback } from "react";
import ArticleCard from "@/components/ArticleCard";
import { Article, ArticlesResponse } from "@/types/article";

const API_BASE = "https://api.spaceflightnewsapi.net/v4/articles/";
const PAGE_SIZE = 6;

export default function Home() {
	const [articles, setArticles] = useState<Article[]>([]);
	const [offset, setOffset] = useState<number>(0);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const fetchArticles = useCallback(async (currentOffset: number) => {
		setLoading(true);
		setError(null);
		try {
			const url = `${API_BASE}?limit=${PAGE_SIZE}&offset=${currentOffset}`;
			const res = await fetch(url);
			if (!res.ok) {
				throw new Error(`API responded with status ${res.status}`);
			}
			const data: ArticlesResponse = await res.json();
			setArticles((prev) =>
				currentOffset === 0 ? data.results : [...prev, ...data.results],
			);
			setHasMore(data.next !== null);
			setOffset(currentOffset + PAGE_SIZE);
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: "Failed to fetch articles.",
			);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchArticles(0);
	}, [fetchArticles]);

	const handleLoadMore = () => {
		if (!loading && hasMore) {
			fetchArticles(offset);
		}
	};

	return (
		<div style={{ backgroundColor: "#ffeb01", minHeight: "100vh" }}>
			{/* Navbar */}
			<header
				className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between shadow-sm"
				style={{ backgroundColor: "#11326e" }}
			>
				<span
					className="text-lg font-display font-bold tracking-tight"
					style={{ color: "#ffeb01" }}
				>
					{/* Wireframe by Ashiwin */}
					&nbsp;
				</span>
				{/* <span
					className="text-xs font-body font-medium px-2 py-1 rounded"
					style={{ backgroundColor: "#e00069", color: "#ffffff" }}
				>
					Spaceflight News
				</span> */}
			</header>

			{/* Main content */}
			<main className="max-w-5xl mx-auto px-6 py-10">
				{/* Page heading */}
				<div className="mb-8">
					<h1
						className="text-3xl font-display font-extrabold mb-3"
						style={{ color: "#11326e" }}
					>
						Wireframe by Ashiwin
					</h1>
					<p
						className="text-base font-body max-w-2xl leading-relaxed"
						style={{ color: "#343433" }}
					>
						News and updates from the world of spaceflight,
						rocketry, and space exploration.
					</p>
				</div>

				{/* Error state */}
				{error && (
					<div
						className="mb-6 px-4 py-3 rounded-lg text-sm font-body font-medium"
						style={{ backgroundColor: "#e00069", color: "#ffffff" }}
					>
						{error}
					</div>
				)}

				{/* Initial loading skeleton */}
				{loading && articles.length === 0 && (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
						{Array.from({ length: 6 }).map((_, i) => (
							<div
								key={i}
								className="bg-white rounded-lg p-5 flex flex-col gap-3 animate-pulse"
							>
								<div className="h-3 bg-gray-200 rounded w-1/3" />
								<div className="h-4 bg-gray-300 rounded w-3/4" />
								<div className="h-4 bg-gray-200 rounded w-full" />
								<div className="h-4 bg-gray-200 rounded w-5/6" />
								<div className="h-4 bg-gray-200 rounded w-4/6" />
								<div className="h-8 bg-gray-200 rounded w-24 mt-2" />
							</div>
						))}
					</div>
				)}

				{/* Article grid */}
				{articles.length > 0 && (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
						{articles.map((article) => (
							<ArticleCard key={article.id} article={article} />
						))}
					</div>
				)}

				{/* Load more */}
				{hasMore && articles.length > 0 && (
					<div className="mt-10 flex justify-center">
						<button
							onClick={handleLoadMore}
							disabled={loading}
							className="px-8 py-2.5 text-sm font-body font-semibold rounded transition-opacity duration-150 hover:opacity-85 active:opacity-70 disabled:opacity-50 disabled:cursor-not-allowed"
							style={{
								backgroundColor: "#e00069",
								color: "#ffffff",
							}}
						>
							{loading ? "Loading..." : "Load more"}
						</button>
					</div>
				)}

				{/* End of results */}
				{!hasMore && articles.length > 0 && (
					<p
						className="mt-10 text-center text-sm font-body opacity-60"
						style={{ color: "#343433" }}
					>
						You have reached the end of the articles.
					</p>
				)}
			</main>

			{/* Footer */}
			<footer
				className="mt-16 px-6 py-6 text-center text-xs font-body"
				style={{ backgroundColor: "#11326e", color: "#ffeb01" }}
			>
				Wireframe by Ashiwin, Powered by{" "}
				<a
					href="https://api.spaceflightnewsapi.net/v4/docs/"
					target="_blank"
					rel="noopener noreferrer"
					className="underline underline-offset-2 hover:opacity-75"
				>
					Spaceflight News API v4
				</a>{" "}
			</footer>
		</div>
	);
}
