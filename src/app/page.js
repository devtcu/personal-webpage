"use client";

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import Typewriter from 'typewriter-effect';

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  const projectCardsRef = useRef([]);
  const parallaxRef = useRef(null);
  const birdsRef = useRef(null);

  useEffect(() => {
    // Animation for section headers
    const sectionRefs = [aboutRef, projectsRef, contactRef];
    
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    sectionRefs.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });
    
    // Animation for project cards
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate-fade-in');
          }, index * 150); // Staggered delay
          cardObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    projectCardsRef.current.forEach(card => {
      if (card) {
        cardObserver.observe(card);
      }
    });
    
    return () => {
      sectionRefs.forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
      
      projectCardsRef.current.forEach(card => {
        if (card) {
          cardObserver.unobserve(card);
        }
      });
    };
  }, []);

  // Add parallax effect for Japanese wave background
  useEffect(() => {
    const handleParallax = () => {
      if (!parallaxRef.current) return;
      
      const scrollPosition = window.scrollY;
      const heroSection = document.getElementById('home');
      
      if (!heroSection) return;
      
      const heroHeight = heroSection.offsetHeight;
      const headerHeight = document.querySelector('nav')?.offsetHeight || 0;
      
      // Calculate how far we've scrolled within the section as a percentage
      // We start calculating from when the section is at the top of the viewport
      const scrollPercent = Math.min(1, scrollPosition / (heroHeight - headerHeight));
      
      // Apply parallax effect to the wave background - horizontal movement
      const waveBg = parallaxRef.current.querySelector('.wave-bg');
      
      if (waveBg) {
        // Move the wave background horizontally as we scroll
        waveBg.style.transform = `translateX(-${scrollPercent * 10}%)`;
      }
    };
    
    window.addEventListener('scroll', handleParallax);
    // Run once on mount
    handleParallax();
    
    return () => {
      window.removeEventListener('scroll', handleParallax);
    };
  }, []);
  
  // Add horizontal bird movement across About Me title - simplified approach
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    // Simple function to animate birds flying across the About section
    const updateBirds = () => {
      if (!birdsRef.current || !aboutRef.current) return;
      
      const aboutSection = document.getElementById('about');
      if (!aboutSection) return;
      
      const aboutRect = aboutSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Only activate birds when about section is visible or approaching
      const isSectionVisible = aboutRect.top < windowHeight && aboutRect.bottom > 0;
      const isSectionApproaching = aboutRect.top < windowHeight + 200;
      
      if (isSectionApproaching) {
        // Calculate scroll position relative to the about section
        // 0 = section just entered viewport, 1 = section is at top of viewport
        const scrollProgress = Math.min(1, Math.max(0, 
          (windowHeight - aboutRect.top) / windowHeight
        ));
        
        const birds = Array.from(birdsRef.current.querySelectorAll('.bird'));
        
        // Animate each bird
        birds.forEach((bird, index) => {
          // Stagger the birds
          const delay = index * 0.15;
          
          // Calculate position - adjust these multipliers to change speed
          // CUSTOMIZATION POINT: Modify these values to change bird movement
          const viewportWidth = window.innerWidth;
          const moveDistance = viewportWidth * 1.5; // ADJUST THIS: higher = faster movement, ensure birds exit screen
          
          // Calculate position based on scroll progress
          let position = (scrollProgress - delay) * moveDistance;
          
          // Keep the birds offscreen until they should enter
          if (scrollProgress < delay) {
            position = -bird.offsetWidth;
            bird.style.opacity = '0';
          } else {
            // Fade in as they enter
            if (position < 0) {
              // Gradually fade in as they enter the viewport
              bird.style.opacity = String(Math.min(1, (position + bird.offsetWidth) / bird.offsetWidth));
            } 
            // Fade out as they exit
            else if (position > viewportWidth - bird.offsetWidth) {
              // Gradually fade out as they leave the viewport
              bird.style.opacity = String(Math.max(0, 1 - (position - (viewportWidth - bird.offsetWidth)) / bird.offsetWidth));
            } 
            // Full opacity while in viewport
            else {
              bird.style.opacity = '1';
            }
            
            // Allow birds to move all the way across and off screen
            // No limit applied to position, so birds will continue to move based on scroll progress
          }
          
          // CUSTOMIZATION POINT: Adjust these constants for fine-tuning bird movement
          const aboutTitlePositionPercent = 0.5; // Assuming title is centered (0.5 = 50% of screen width)
          const titleWidth = aboutRef.current.offsetWidth;
          const titlePosition = viewportWidth * aboutTitlePositionPercent - titleWidth/2;
          
          // Debug message to console when bird is crossing title
          if (position >= titlePosition - 20 && position <= titlePosition + titleWidth + 20 && index === 0) {
            console.log("Bird crossing title area!");
          }
          
          // Apply transform in pixels rather than percentages for more reliable positioning
          bird.style.transform = `translateX(${position}px)`;
        });
      } else {
        // Reset birds when section not visible
        const birds = birdsRef.current.querySelectorAll('.bird');
        birds.forEach(bird => {
          bird.style.opacity = '0';
          bird.style.transform = 'translateX(-120px)'; // Reset to starting position off-screen
        });
      }
      
      ticking = false;
    };
    
    const onScroll = () => {
      lastScrollY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateBirds();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Run once on mount
    setTimeout(updateBirds, 300);
    
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector('nav');
      const profileImage = document.querySelector('.profile-image');
      
      if (nav && profileImage) {
        const imageRect = profileImage.getBoundingClientRect();
        const imageBottom = imageRect.bottom;
        const navHeight = nav.offsetHeight;
        const scrollY = window.scrollY;
        
        // Calculate how much we've scrolled past the bottom of the image
        // We subtract the nav height so we start hiding when the image bottom reaches the nav bottom
        const scrollPastImage = Math.max(0, -imageBottom + navHeight);
        
        // Set the maximum amount the header can be hidden (its own height)
        const maxScroll = nav.offsetHeight;
        
        // Calculate how much to translate the header up
        const translateY = Math.min(scrollPastImage, maxScroll);
        
        // Make the header translucent when scrolling down
        const startFade = 20; // Start fading after scrolling this many pixels
        const endFade = 100; // Fully translucent at this scroll position
        
        if (scrollY > startFade) {
          // Calculate opacity between 1 (solid) and 0.7 (translucent)
          const scrollRange = endFade - startFade;
          const scrollProgress = Math.min(1, (scrollY - startFade) / scrollRange);
          const finalOpacity = 1 - (scrollProgress * 0.3); // Opacity between 1 and 0.7
          
          // Apply background with transparency
          nav.style.backgroundColor = `rgba(17, 24, 39, ${finalOpacity})`;
          nav.style.backdropFilter = 'blur(8px)';
          nav.style.webkitBackdropFilter = 'blur(8px)';
        } else {
          // Reset to solid when at top
          nav.style.backgroundColor = 'rgb(17, 24, 39)'; // bg-gray-900
          nav.style.backdropFilter = 'none';
          nav.style.webkitBackdropFilter = 'none';
        }
        
        // Apply the hide-on-scroll effect
        nav.style.transform = `translateY(-${translateY}px)`;
        nav.style.transition = 'transform 0.4s linear, background-color 0.3s ease';
      }
    };

    // Run once on mount to set initial state
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted! (This is a demo, no real submission occurs.)');
    setFormData({ name: '', email: '', message: '' });
  };

  // Animation classes
  const animationStyles = `
    @keyframes slideIn {
      from { transform: translateX(-50px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .animate-slide-in {
      animation: slideIn 0.8s forwards;
    }
    
    .animate-fade-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
      
    }

    .parallax-layer {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    transition: transform 0.2s ease-out;
  }

  .wave-bg {
    background: url('/parallax/wave1.jpg') repeat-x;
    background-size: cover;
    width: 200%;
    height: 100%;
    opacity: 0.3; /* More subtle to allow text to be readable */
    position: absolute;
    left: 0;
    top: 0;
  }

  /* Ensure profile image and text are above the waves */
  #home {
    overflow: hidden;
  }
  
  /* --- BIRDS CUSTOMIZATION GUIDE ---
   * To experiment quickly with bird positioning and speed:
   * 
   * 1. Position:
   *    - Adjust 'top' values in .bird-1, .bird-2, .bird-3 to move birds up/down
   *    - For vertical position, negative values move up, positive values move down
   *
   * 2. Size:
   *    - Modify width/height of each bird to make them larger/smaller
   *
   * 3. Speed (in JS):
   *    - Find the moveDistance variable in the updateBirds function
   *    - Increase the number (default: viewportWidth * 1.5) to make birds move faster
   *    - Decrease to make birds move slower
   *
   * 4. Starting position:
   *    - Modify the 'left' values in .bird-1, .bird-2, .bird-3
   *    - More negative values start birds further to the left
   */
  .birds-container {
    position: absolute;
    pointer-events: none;
    width: 100%;
    height: 100px;
    overflow: visible;
    z-index: 0;
    left: 0;
    top: -9px; /* Moved higher to center better with title */
  }
  
  .bird {
    position: absolute;
    width: 120px;
    height: 100px;
    background: url('/parallax/bird.webp') no-repeat;
    background-size: contain;
    opacity: 0;
    transition: transform 0.2s linear, opacity 0.3s ease;
    filter: brightness(1.2) contrast(1.1) drop-shadow(0 0 5px rgba(255, 255, 255, 0.5));
    z-index: 5;
  }
  
  .bird-1 {
    top: -20px; /* Moved higher to better align with text center */
    left: -120px;
  }
  
  .bird-2 {
    top: -15px; /* Moved higher to better align with text center */
    left: -120px;
    width: 90px;
    height: 75px;
  }
  
  .bird-3 {
    top: -30px; /* Moved higher to better align with text center */
    left: -160px;
    width: 150px;
    height: 130px;
  }
  `;

  return (
    <div className="min-h-screen bg-black">
      <style jsx global>{animationStyles}</style>
      {/* In Next.js App Router, head tags are defined in a separate metadata object or layout.js file */}

      {/* Navigation */}
      <nav className="shadow-md fixed w-full z-50 transition-all duration-300 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-400">devansh.</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="#home" className="text-gray-400 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link href="#about" className="text-gray-400 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Myself</Link>
              <Link href="#projects" className="text-gray-400 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">My Work</Link>
              <Link href="#contact" className="text-gray-400 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Reach Me</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Parallax Wave Background */}
      <section id="home" className="pt-32 pb-15 relative bg-gray-900 text-white">
        {/* Parallax Wave Background */}
        <div className="absolute inset-0 overflow-hidden" ref={parallaxRef}>
          <div className="parallax-layer wave-bg"></div>
        </div>
        
        {/* Hero content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-5 mt-6">
          <img src="/last.jpg" alt='Devansh' className='profile-image mx-auto rounded-full border-4 border-white shadow-lg object-cover hover:scale-105 w-48 h-48'></img>
          <div className="min-h-[40px] md:min-h-[48px] mt-6">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .changeDelay(70)
                  .typeString("Hello, I'm Devansh")
                  .start();
              }}
              options={{
                cursor: '', // Empty string removes the cursor
                wrapperClassName: 'text-4xl md:text-5xl font-extrabold',
                loop: false,
                autoStart: false
              }}
            />
          </div>
          {/* Typewriter for subtitle */}
          <div className="min-h-[56px] md:min-h-[64px] mt-4 mb-12">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .changeDelay(40)
                  .pauseFor(2000) // Wait for the name to finish typing
                  .typeString("Physicist")
                  .pauseFor(800)
                  .deleteAll()
                  .typeString("Number guy")
                  .pauseFor(800)
                  .deleteAll()
                  .typeString("AND...Human")
                  .pauseFor(800)
                  .deleteAll()
                  .start();
              }}
              options={{
                cursor: '|',
                cursorClassName: 'text-blue-500 animate-pulse',
                wrapperClassName: 'text-lg md:text-xl',
                loop: true,
                autoStart: false,
                cursorBlinkSpeed: 800
              }}
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="pt-4 pb-16 bg-gray-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="relative text-center">
            {/* Birds container positioned precisely for the About Me heading */}
            <div className="birds-container" ref={birdsRef}>
              <div className="bird bird-1"></div>
              <div className="bird bird-2"></div>
              <div className="bird bird-3"></div>
            </div>
            <h2 ref={aboutRef} className="text-3xl font-bold text-blue-500 inline-block opacity-0 relative z-10">About Me</h2>
          </div>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            I'm a software developer with a passion for learning and problem-solving. Proficient in various programming languages and frameworks, I strive to build efficient and scalable solutions. Currently, I'm [add your current role or status, e.g., studying at XYZ University or working at ABC Company].
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white">Skills</h3>
              <ul className="mt-2 text-gray-400">
                <li>JavaScript</li>
                <li>React & Next.js</li>
                <li>Python</li>
                <li>Tailwind CSS</li>
              </ul>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white">Experience</h3>
              <p className="mt-2 text-gray-400">[Add your experience, e.g., Internship at XYZ, Freelance Developer]</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white">Education</h3>
              <p className="mt-2 text-gray-400">B.S. in Physics, Math, Texas Christian University</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 ref={projectsRef} className="text-3xl font-bold text-blue-600 text-center opacity-0">Projects</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              ref={el => projectCardsRef.current[0] = el}
              className="bg-white p-6 rounded-lg shadow-md opacity-0 transform translate-y-4 transition-all duration-500">
              <h3 className="text-xl font-semibold text-gray-900">Project 1</h3>
              <p className="mt-2 text-gray-600">A brief description of your project, technologies used, and its impact.</p>
              <a href="#" className="mt-4 inline-block text-blue-600 hover:underline">View Project</a>
            </div>
            <div 
              ref={el => projectCardsRef.current[1] = el}
              className="bg-white p-6 rounded-lg shadow-md opacity-0 transform translate-y-4 transition-all duration-500">
              <h3 className="text-xl font-semibold text-gray-900">Project 2</h3>
              <p className="mt-2 text-gray-600">A brief description of your project, technologies used, and its impact.</p>
              <a href="#" className="mt-4 inline-block text-blue-600 hover:underline">View Project</a>
            </div>
            <div 
              ref={el => projectCardsRef.current[2] = el}
              className="bg-white p-6 rounded-lg shadow-md opacity-0 transform translate-y-4 transition-all duration-500">
              <h3 className="text-xl font-semibold text-gray-900">Project 3</h3>
              <p className="mt-2 text-gray-600">A brief description of your project, technologies used, and its impact.</p>
              <a href="#" className="mt-4 inline-block text-blue-600 hover:underline">View Project</a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 ref={contactRef} className="text-3xl font-bold text-white text-center opacity-0">Contact Me</h2>
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
          <p>© {new Date().getFullYear()} Devansh KM. All rights reserved.</p>
          <div className="mt-2">
            <a href="https://github.com/devtcu" target='_blank' className="text-gray-400 hover:text-white mx-2">GitHub</a>
            <a href="https://www.linkedin.com/in/devansh-km/" target='_blank'  className="text-gray-400 hover:text-white mx-2">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
