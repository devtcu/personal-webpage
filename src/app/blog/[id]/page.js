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
      title: "Graph Neural Networks in Biological Systems",
      date: "2024-09-30",
      category: "Machine Learning",
      readTime: "8 min read",
      content: `
        <h2>Introduction</h2>
        <p>Graph Neural Networks (GNNs) have emerged as a powerful tool for analyzing complex biological systems. Unlike traditional machine learning approaches that work with Euclidean data, GNNs can directly process graph-structured data, making them particularly suited for biological applications where relationships between entities are as important as the entities themselves.</p>
        
        <h2>Applications in Cellular Biology</h2>
        <p>In our research, we focus on applying Graph Convolutional Networks to understand spatial patterns in cellular systems. By representing cellular assays as graphs where nuclei serve as nodes and spatial relationships define edges, we can leverage the power of GNNs to predict complex biological behaviors.</p>
        
        <h2>Implementation Challenges</h2>
        <p>One of the primary challenges in applying GNNs to biological data is the semi-supervised nature of the problem. Biological labels are often sparse or expensive to obtain, requiring innovative approaches to leverage unlabeled data effectively.</p>
        
        <h2>Future Directions</h2>
        <p>The integration of persistent homology with GNN architectures represents an exciting frontier for understanding biological systems at multiple scales. By combining topological data analysis with graph-based learning, we can capture both local interactions and global structural patterns.</p>
      `
    },
    "2": {
      id: 2,
      title: "Topological Data Analysis: Beyond Euclidean Space",
      date: "2024-09-25",
      category: "Mathematics", 
      readTime: "12 min read",
      content: `
        <h2>Understanding Non-Euclidean Data</h2>
        <p>Traditional data analysis methods often assume that data lies in Euclidean space, but many real-world datasets exhibit complex topological structures that cannot be captured by conventional approaches. Topological Data Analysis (TDA) provides a mathematical framework for understanding these structures.</p>
        
        <h2>Persistent Homology</h2>
        <p>At the heart of TDA lies persistent homology, a method that tracks topological features across multiple scales. By examining how holes, connected components, and higher-dimensional voids persist as we change resolution, we gain insights into the underlying structure of our data.</p>
        
        <h2>Applications in Scientific Computing</h2>
        <p>From protein folding to cosmological data analysis, TDA has found applications across diverse scientific domains. The ability to quantify shape and structure in a scale-invariant manner makes it particularly valuable for understanding complex systems.</p>
        
        <h2>Computational Considerations</h2>
        <p>While powerful, TDA computations can be computationally intensive. Recent advances in GPU acceleration and parallel algorithms are making these methods more accessible for large-scale applications.</p>
      `
    },
    "3": {
      id: 3,
      title: "CUDA Optimization for Scientific Computing",
      date: "2024-09-20",
      category: "Programming",
      readTime: "10 min read", 
      content: `
        <h2>The Need for Parallel Computing</h2>
        <p>Modern scientific applications often require processing vast amounts of data or performing computationally intensive algorithms. Traditional CPU-based approaches can become bottlenecks, necessitating the use of parallel computing architectures like GPUs.</p>
        
        <h2>CUDA Programming Model</h2>
        <p>NVIDIA's CUDA platform provides a framework for leveraging GPU parallelism in scientific applications. Understanding the CUDA programming model, including concepts like threads, blocks, and grids, is essential for effective GPU programming.</p>
        
        <h2>Optimization Strategies</h2>
        <p>Effective CUDA optimization requires careful consideration of memory access patterns, thread divergence, and occupancy. Techniques like coalesced memory access and shared memory utilization can dramatically improve performance.</p>
        
        <h2>Real-world Applications</h2>
        <p>In our research, we've successfully applied CUDA optimization to accelerate topological computations, achieving significant speedups over CPU implementations while maintaining numerical accuracy.</p>
      `
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
