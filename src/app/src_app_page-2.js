import Link from 'next/link';
import Head from 'next/head';
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
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Your Name - Portfolio</title>
        <meta name="description" content="Portfolio of Your Name, a passionate software developer." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <nav className="bg-white shadow-md fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-06 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Your Name</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="#home" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link href="#about" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">About</Link>
              <Link href="#projects" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Projects</Link>
              <Link href="#contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-12 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold">Welcome to My Portfolio</h2>
          <p className="mt-4 text-lg md:text-xl">I'm Your Name, a passionate software developer skilled in solving problems with code.</p>
          <a href="#contact" className="mt-6 inline-block bg-white text-blue-600 font-semibold py-2 px-4 rounded-md hover:bg-gray-200">Get in Touch</a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center">About Me</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            I'm a software developer with a passion for learning and problem-solving. Proficient in various programming languages and frameworks, I strive to build efficient and scalable solutions. Currently, I'm [add your current role or status, e.g., studying at XYZ University or working at ABC Company].
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900">Skills</h3>
              <ul className="mt-2 text-gray-600">
                <li>JavaScript</li>
                <li>React & Next.js</li>
                <li>Python</li>
                <li>Tailwind CSS</li>
              </ul>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900">Experience</h3>
              <p className="mt-2 text-gray-600">[Add your experience, e.g., Internship at XYZ, Freelance Developer]</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900">Education</h3>
              <p className="mt-2 text-gray-600">[Add your education, e.g., B.S. in Computer Science, XYZ University]</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 bg-gray-100">
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
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center">Contact Me</h2>
          <form onSubmit={handleSubmit} className="mt-8 max-w-lg mx-auto">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium">Name</label>
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
              <label htmlFor="email " className="block text-gray-700 font-medium">Email</label>
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
              <label htmlFor="message" className="block text-gray-700 font-medium">Message</label>
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
