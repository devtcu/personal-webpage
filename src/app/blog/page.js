"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const [articles] = useState([
    {
      id: 1,
      title: "Trial Article",
      excerpt: "Tired of reading everything being written using ChatGPT so here's to writing with plenty of errors like a human",
      date: "2025-10-02",
      category: "Life",
      readTime: "2 min read"
    }
  ]);

  const categories = ["All", "Machine Learning", "Mathematics", "Life"];
  
  const filteredArticles = selectedCategory === "All" 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="shadow-md fixed w-full z-50 transition-all duration-300 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-3xl font-bold text-gray-400">devansh.</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/blog" className="text-blue-400 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Blog</Link>
              <Link href="/#about" className="text-gray-400 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Myself</Link>
              <Link href="/#projects" className="text-gray-400 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">My Work</Link>
              <Link href="/#contact" className="text-gray-400 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Reach Me</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              kernel space
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              where the thoughts (and the grammar) are questionable
            </p>
          </div>

          <div className="mb-12 overflow-x-auto">
            <div className="flex space-x-3 pb-2 min-w-max">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            {filteredArticles.map((article) => (
              <article key={article.id} className="bg-gray-900 rounded-lg p-8 border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:transform hover:translate-y-[-2px]">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {article.category}
                  </span>
                  <span className="text-gray-400 text-sm">{article.date}</span>
                  <span className="text-gray-400 text-sm">{article.readTime}</span>
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-4 hover:text-blue-400 transition-colors duration-300">
                  <Link href={`/blog/${article.id}`}>
                    {article.title}
                  </Link>
                </h2>
                
                <p className="text-gray-300 leading-relaxed mb-6">
                  {article.excerpt}
                </p>
                
                <Link 
                  href={`/blog/${article.id}`}
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300"
                >
                  Read more
                  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </article>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-gray-400">
              Pinky promise, there's more articles coming soon
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
