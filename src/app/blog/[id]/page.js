"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function BlogPost() {
  const params = useParams();
  const [post, setPost] = useState(null);

  const articles = {
    "1": {
      id: 1,
      title: "A Safe Space",
      date: "2025-10-02",
      category: "Life",
      readTime: "2 min read",
      content: `
        <h2>Introduction</h2>
        <p>Give me a minute or two to come up with something meaningful to actually put here. In the meantime, I will continue building the rest of the website</p>`
    }
  };

  useEffect(() => {
    if (params.id && articles[params.id]) {
      setPost(articles[params.id]);
    }
  }, [params.id]);

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <Link href="/blog" className="text-blue-400 hover:text-blue-300">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

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

      <article className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors duration-300">
            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>

          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
              <span className="text-gray-400 text-sm">{post.date}</span>
              <span className="text-gray-400 text-sm">{post.readTime}</span>
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>
          </div>

          <div 
            className="prose prose-lg prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={{
              color: '#d1d5db',
              lineHeight: '1.75'
            }}
          />

          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex justify-between items-center">
              <Link href="/blog" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
                ← More Articles
              </Link>
              <div className="text-gray-400 text-sm">
                Published on {post.date}
              </div>
            </div>
          </div>
        </div>
      </article>

      <style jsx global>{`
        .prose h2 {
          color: #60a5fa;
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        
        .prose p {
          margin-bottom: 1.5rem;
          line-height: 1.75;
        }
        
        .prose h2:first-of-type {
          margin-top: 0;
        }
      `}</style>
    </div>
  );
}
