"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted! (This is a demo, no real submission occurs.)');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-customBackground">
      {/* In Next.js App Router, head tags are defined in a separate metadata object or layout.js file */}

      {/* Navigation */}
      <nav className="bg-gray-900 shadow-md fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-06 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-600">devansh.</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="#home" className="text-gray-400 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link href="#about" className="text-gray-400 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">About</Link>
              <Link href="#projects" className="text-gray-400 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Projects</Link>
              <Link href="#contact" className="text-gray-400 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-26 pb-15 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img src="/last.jpg" alt='Devansh' className='w-65 h-65 mx-auto rounded-full border-4 border-white shadow-lg object-cover'> 
          </img>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-8">Hello, I'm Devansh</h2>
          <p className="mt-4 text-lg md:text-xl">a physicist/software developer thing excited about solving problems with code.</p>
          <a href="#contact" className="mt-6 inline-block bg-white text-blue-600 font-semibold py-2 px-4 rounded-md hover:bg-gray-200">Get in Touch</a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-blue-500 text-center">About Me</h2>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            I'm a software developer with a passion for learning and problem-solving. Proficient in various programming languages and frameworks, I strive to build efficient and scalable solutions. Currently, I'm [add your current role or status, e.g., studying at XYZ University or working at ABC Company].
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-700">Skills</h3>
              <ul className="mt-2 text-gray-600">
                <li>JavaScript</li>
                <li>React & Next.js</li>
                <li>Python</li>
                <li>Tailwind CSS</li>
              </ul>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-700">Experience</h3>
              <p className="mt-2 text-gray-600">[Add your experience, e.g., Internship at XYZ, Freelance Developer]</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-700">Education</h3>
              <p className="mt-2 text-gray-600">[Add your education, e.g., B.S. in Computer Science, XYZ University]</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center">Projects</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900">Project 1</h3>
              <p className="mt-2 text-gray-600">A brief description of your project, technologies used, and its impact.</p>
              <a href="#" className="mt-4 inline-block text-blue-600 hover:underline">View Project</a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900">Project 2</h3>
              <p className="mt-2 text-gray-600">A brief description of your project, technologies used, and its impact.</p>
              <a href="#" className="mt-4 inline-block text-blue-600 hover:underline">View Project</a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900">Project 3</h3>
              <p className="mt-2 text-gray-600">A brief description of your project, technologies used, and its impact.</p>
              <a href="#" className="mt-4 inline-block text-blue-600 hover:underline">View Project</a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-customBackground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center">Contact Me</h2>
          <form onSubmit={handleSubmit} className="mt-8 max-w-lg mx-auto">
            <div className="mb-4">
              <label htmlFor="name" className="block text-white font-medium">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email " className="block text-white font-medium">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-white font-medium">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                rows="4"
                required
              ></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© {new Date().getFullYear()} Your Name. All rights reserved.</p>
          <div className="mt-2">
            <a href="https://github.com/yourusername" className="text-gray-400 hover:text-white mx-2">GitHub</a>
            <a href="https://linkedin.com/in/yourusername" className="text-gray-400 hover:text-white mx-2">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
