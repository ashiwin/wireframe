"use client";

import { Article } from "@/types/article";

interface ArticleCardProps {
	article: Article;
}

function formatDate(dateStr: string): string {
	const date = new Date(dateStr);
	return date.toLocaleDateString("en-MY", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});
}

export default function ArticleCard({ article }: ArticleCardProps) {
	return (
		<div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow duration-200">
			<span className="text-xs font-medium tracking-wide text-gray-400 font-body">
				{formatDate(article.published_at)}
			</span>
			<h3
				className="font-display font-bold text-[15px] leading-snug"
				style={{ color: "#343433" }}
			>
				{article.title}
			</h3>
			<p
				className="text-sm flex-1 leading-relaxed font-body line-clamp-4"
				style={{ color: "#343433", opacity: 0.75 }}
			>
				{article.summary}
			</p>
			<div className="pt-1">
				<a
					href={article.url}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-block px-4 py-2 text-sm font-medium font-body rounded transition-opacity duration-150 hover:opacity-85 active:opacity-70"
					style={{ backgroundColor: "#e00069", color: "#ffffff" }}
				>
					Read more
				</a>
			</div>
		</div>
	);
}
