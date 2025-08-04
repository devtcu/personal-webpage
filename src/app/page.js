"use client";

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import Typewriter from 'typewriter-effect';
import { getAssetPath } from '../utils/assetHelpers';

// helper functions for browser detection and environment...
const isBrowser = () => typeof window !== 'undefined';
const isProduction = process.env.NODE_ENV === 'production';
const safeDomOperation = (callback) => {
  if (isBrowser()) {
    // a delay execution to ensure DOM is fully loaded
    setTimeout(() => {
      try {
        callback();
      } catch (error) {
        console.warn('DOM operation failed:', error);
      }
    }, 0);
  }
};

export default function Home() {
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  const projectCardsRef = useRef([]);
  const parallaxRef = useRef(null);
  const birdsRef = useRef(null);
  const starsRef = useRef(null);

  useEffect(() => {
    // Skip on server-side
    if (!isBrowser()) return;
    
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

  // parallax effect for wave background
  useEffect(() => {
    // Skip on server-side
    if (!isBrowser()) return;
    
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
  
  // horizontal bird movement across About Me title - simplified approach
  useEffect(() => {
    // Skip on server-side
    if (!isBrowser()) return;
    
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
  
  // Add effect for the single giant star in About Me section
  useEffect(() => {
    // Skip on server-side
    if (!isBrowser()) return;
    
    // Verify star.gif loading
    const debugImg = new Image();
    debugImg.onload = () => console.log('Giant star image loaded successfully');
    debugImg.onerror = () => console.error('Failed to load giant star image');
    debugImg.src = '/parallax/star.gif';
    
    // Ensure star is properly contained in the About section
    const setupStar = () => {
      if (!starsRef.current) return;
      
      const aboutSection = document.getElementById('about');
      if (!aboutSection) return;
      
      // Get section dimensions
      const rect = aboutSection.getBoundingClientRect();
      
      // Ensure the star container has the correct dimensions
      starsRef.current.style.position = 'absolute';
      starsRef.current.style.top = '0';
      starsRef.current.style.left = '0';
      starsRef.current.style.width = '100%';
      starsRef.current.style.height = '100%';
      starsRef.current.style.zIndex = '0';
      starsRef.current.style.overflow = 'hidden';
      
      console.log('Star effect is set up and contained within About section');
    };
    
    // Apply immediately and on window resize
    setupStar();
    window.addEventListener('resize', setupStar);
    
    return () => {
      window.removeEventListener('resize', setupStar);
    };
  }, []);

  useEffect(() => {
    // Skip on server-side
    if (!isBrowser()) return;
    
    let isHoveringTopArea = false;
    let lastScrollY = 0;
    let headerTimeout = null;
    
    const handleScroll = () => {
      const nav = document.querySelector('nav');
      const profileImage = document.querySelector('.profile-image');
      
      if (nav && profileImage) {
        const imageRect = profileImage.getBoundingClientRect();
        const imageBottom = imageRect.bottom;
        const navHeight = nav.offsetHeight;
        const scrollY = window.scrollY;
        lastScrollY = scrollY;
        
        // Calculate how much we've scrolled past the bottom of the image
        // We subtract the nav height so we start hiding when the image bottom reaches the nav bottom
        const scrollPastImage = Math.max(0, -imageBottom + navHeight);
        
        // Set the maximum amount the header can be hidden (its own height)
        const maxScroll = nav.offsetHeight;
        
        // Calculate how much to translate the header up
        // Consider hover state if not actively scrolling down
        const translateY = (isHoveringTopArea && !activeScrolling) ? 0 : Math.min(scrollPastImage, maxScroll);
        
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
        
        // Use different transition timing for appearing (faster) vs disappearing (slower)
        const transitionTiming = translateY === 0 
          ? 'transform 0.25s ease-out, background-color 0.3s ease' // Faster when appearing
          : 'transform 0.4s ease-in, background-color 0.3s ease';  // Slower when disappearing
        
        nav.style.transition = transitionTiming;
      }
    };
    
    // Show header when mouse is in top area
    const showHeader = () => {
      if (!isHoveringTopArea) {
        isHoveringTopArea = true;
        handleScroll(); // Update header visibility immediately
        
        // Clear existing timeout if any
        if (headerTimeout) {
          clearTimeout(headerTimeout);
        }
      }
    };
    
    // Hide header after delay when mouse leaves top area
    const hideHeaderAfterDelay = () => {
      // Clear existing timeout if any
      if (headerTimeout) {
        clearTimeout(headerTimeout);
      }
      
      // Set a timeout to hide the header after a delay
      headerTimeout = setTimeout(() => {
        isHoveringTopArea = false;
        handleScroll();
      }, 1000); // 1 second delay before hiding header
    };
    
    // Store last scroll position to detect direction
    let lastScrollPos = window.scrollY;
    let scrollTimer = null;
    let activeScrolling = false;
    
    // Handle scroll events to override hover behavior when scrolling down
    const handleScrollDirection = () => {
      const currentScrollPos = window.scrollY;
      // Consider scrolling down only if we've moved more than a few pixels
      // This prevents tiny scroll fluctuations from hiding the header
      const scrollingDown = currentScrollPos > (lastScrollPos + 5);
      lastScrollPos = currentScrollPos;
      
      // Track active scrolling
      activeScrolling = true;
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        activeScrolling = false;
      }, 100); // Reset after 100ms of no scrolling
      
      // If scrolling down significantly and not at the top, hide header immediately regardless of hover
      if (scrollingDown && currentScrollPos > 100) {
        if (isHoveringTopArea) {
          isHoveringTopArea = false;
          handleScroll(); // Update header visibility immediately
        }
      }
    };
    
    // Handle mouse position to show header when near top of screen
    const handleMouseMove = (e) => {
      // Check if mouse is in the top 20% (approximately) of the viewport
      const topFifthHeight = window.innerHeight * 0.2;
      const isInTopArea = e.clientY <= topFifthHeight;
      
      // Only show header if mouse is in top area and we're not actively scrolling down
      if (isInTopArea) {
        showHeader();
      } else if (isHoveringTopArea) {
        hideHeaderAfterDelay();
      }
    };
    
    // Handle touch events for the header trigger area
    const setupTouchEvents = () => {
      const triggerArea = document.getElementById('header-trigger-area');
      
      if (triggerArea) {
        // Show header when touching trigger area
        triggerArea.addEventListener('touchstart', (e) => {
          e.preventDefault(); // Prevent default touch behavior
          showHeader();
        });
        
        // Setup mouse events for the trigger area
        triggerArea.addEventListener('mouseenter', showHeader);
        triggerArea.addEventListener('mouseleave', hideHeaderAfterDelay);
      }
      
      // Also handle direct nav interaction
      const nav = document.querySelector('nav');
      if (nav) {
        nav.addEventListener('mouseenter', showHeader);
        nav.addEventListener('mouseleave', hideHeaderAfterDelay);
        nav.addEventListener('touchstart', (e) => {
          showHeader();
        }, { passive: true });
      }
    };

    // Run initial setup
    handleScroll();
    setTimeout(setupTouchEvents, 100); // Short delay to ensure DOM is ready
    
    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleScrollDirection); // Add scroll direction detection
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      // Clean up all event listeners
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScrollDirection);
      window.removeEventListener('mousemove', handleMouseMove);
      
      const triggerArea = document.getElementById('header-trigger-area');
      if (triggerArea) {
        triggerArea.removeEventListener('touchstart', showHeader);
        triggerArea.removeEventListener('mouseenter', showHeader);
        triggerArea.removeEventListener('mouseleave', hideHeaderAfterDelay);
      }
      
      const nav = document.querySelector('nav');
      if (nav) {
        nav.removeEventListener('mouseenter', showHeader);
        nav.removeEventListener('mouseleave', hideHeaderAfterDelay);
        nav.removeEventListener('touchstart', showHeader);
      }
      
      if (headerTimeout) {
        clearTimeout(headerTimeout);
      }
      
      if (scrollTimer) {
        clearTimeout(scrollTimer);
      }
    };
  }, []);

  // Contact functionality now uses direct mailto link

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
    
    @keyframes sectionFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    .animate-slide-in {
      animation: slideIn 0.8s forwards;
    }
    
    .animate-fade-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    
    /* Project card hover effect */
    .project-card {
      transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
    }
    
    .project-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }
    
    .section-fade-in {
      opacity: 0;
      transition: opacity 1.2s ease-out;
    }
    
    .section-visible {
      opacity: 1;
    }
    
    .content-fade-in {
      opacity: 0;
      transform: translateY(15px);
      transition: opacity 1s ease-out, transform 0.8s ease-out;
    }
    
    .content-visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    /* Social link styles */
    .social-icon {
      transition: transform 0.3s ease, color 0.3s ease;
    }
    
    .social-icon:hover {
      transform: translateY(-5px);
    }

    /* Big cursor for main heading typewriter */
    .big-cursor {
      font-size: 2.75rem; /* Adjusted size for better match */
      font-weight: bold;
      line-height: 0.8; /* Lowered to align better with text */
      animation: pulse 1.2s ease-in-out infinite; /* Smoother pulse animation */
      vertical-align: middle; /* Better alignment with text */
      margin-left: 2px; /* Closer to the text */
      opacity: 0.9; /* Slightly softer appearance */
      transform: translateY(-14px); /* Move the cursor up slightly */
      display: inline-block; /* Ensures transform works properly */
    }
    
    @keyframes pulse {
      0% { opacity: 0.9; }
      50% { opacity: 0.4; }
      100% { opacity: 0.9; }
    }

    .parallax-layer {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    transition: transform 0.2s ease-out;
  }

  .wave-bg {
    background: url('./parallax/wave1.jpg') repeat-x;
    background-size: cover;
    background-position: center;
    background-color: rgba(17, 24, 39, 0.9); /* Fallback if image doesn't load */
    width: 200%;
    height: 100%;
    opacity: 0.3; /* More subtle to allow text to be readable */
    position: absolute;
    left: -12%; /* Initial position, moved to the right */
    top: 0;
    transform: translateX(0); /* Ensure initial position is set for animation */
    will-change: transform; /* Hint to browser for better performance */
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
    background: url('./parallax/bird.webp') no-repeat center center;
    background-size: contain;
    background-color: transparent; /* Ensure transparent background */
    opacity: 0;
    transition: transform 0.2s linear, opacity 0.3s ease;
    filter: brightness(1.2) contrast(1.1) drop-shadow(0 0 5px rgba(255, 255, 255, 0.5));
    z-index: 5;
    transform-origin: center center; /* Better transformation behavior */
  }
  
  .bird-1 {
    top: -20px; /* Positioned to align with "About Me" text */
    left: -120px;
  }
  
  .bird-2 {
    top: -15px; /* Positioned to align with "About Me" text */
    left: -120px;
    width: 90px;
    height: 75px;
  }
  
  .bird-3 {
    top: -30px; /* Positioned to align with "About Me" text */
    left: -160px;
    width: 150px;
    height: 130px;
  }
  
  /* Simplified stars effect - one giant centered star */
  .stars-container {
    position: absolute;
    width: 100%;
    height: 100%; 
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 0; /* Lowest z-index to keep it behind everything */
    overflow: hidden; /* Hide overflow to prevent seeping */
    opacity: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
  }
  
  .giant-star {
    position: relative;
    width: 1800px; /* Increased from 1200px to 1800px for much bigger coverage */
    height: 1800px; /* Increased from 1200px to 1800px for much bigger coverage */
    background: url('./parallax/star.gif') no-repeat center center;
    background-size: contain;
    opacity: 0.3; /* Much fainter opacity */
    filter: brightness(1.5) contrast(1.2) drop-shadow(0 0 15px rgba(255, 255, 255, 0.2));
    animation: giant-twinkle 15s infinite ease-in-out; /* Increased from 8s to 15s for slower pulsation */
    
    /* Ultra-aggressive edge blending - almost no solid center */
    mask-image: radial-gradient(circle at center, 
      black 15%, 
      rgba(0,0,0,0.9) 20%, 
      rgba(0,0,0,0.8) 25%, 
      rgba(0,0,0,0.7) 30%, 
      rgba(0,0,0,0.6) 35%, 
      rgba(0,0,0,0.5) 40%, 
      rgba(0,0,0,0.4) 45%, 
      rgba(0,0,0,0.3) 50%, 
      rgba(0,0,0,0.2) 60%, 
      rgba(0,0,0,0.1) 70%, 
      rgba(0,0,0,0.05) 80%, 
      rgba(0,0,0,0.02) 90%, 
      transparent 100%
    );
    -webkit-mask-image: radial-gradient(circle at center, 
      black 15%, 
      rgba(0,0,0,0.9) 20%, 
      rgba(0,0,0,0.8) 25%, 
      rgba(0,0,0,0.7) 30%, 
      rgba(0,0,0,0.6) 35%, 
      rgba(0,0,0,0.5) 40%, 
      rgba(0,0,0,0.4) 45%, 
      rgba(0,0,0,0.3) 50%, 
      rgba(0,0,0,0.2) 60%, 
      rgba(0,0,0,0.1) 70%, 
      rgba(0,0,0,0.05) 80%, 
      rgba(0,0,0,0.02) 90%, 
      transparent 100%
    );
    
    /* Multiple layered inset shadows for smoother edge blending */
    box-shadow: 
      inset 0 0 50px rgba(0,0,0,0.1),
      inset 0 0 100px rgba(0,0,0,0.2),
      inset 0 0 200px rgba(0,0,0,0.3),
      inset 0 0 300px rgba(0,0,0,0.4),
      inset 0 0 400px rgba(0,0,0,0.5),
      0 0 30px rgba(255,255,255,0.03);
  }
  
  /* Responsive scaling for different screen sizes */
  @media (max-width: 1536px) {
    .giant-star {
      width: 1600px;
      height: 1600px;
    }
  }
  
  @media (max-width: 1280px) {
    .giant-star {
      width: 1400px;
      height: 1400px;
    }
  }
  
  @media (max-width: 1024px) {
    .giant-star {
      width: 1200px;
      height: 1200px;
    }
  }
  
  @media (max-width: 768px) {
    .giant-star {
      width: 1000px;
      height: 1000px;
    }
  }
  
  @media (max-width: 640px) {
    .giant-star {
      width: 800px;
      height: 800px;
    }
  }
  
  @keyframes giant-twinkle {
    0% { opacity: 0.2; transform: scale(0.95); filter: brightness(1.2) drop-shadow(0 0 5px rgba(255, 255, 255, 0.1)); }
    50% { opacity: 0.3; transform: scale(1.05); filter: brightness(1.5) drop-shadow(0 0 10px rgba(255, 255, 255, 0.2)); }
    100% { opacity: 0.2; transform: scale(0.95); filter: brightness(1.2) drop-shadow(0 0 5px rgba(255, 255, 255, 0.1)); }
  }
  `;

  // Add gentle fade-in effect for sections and paragraphs as user scrolls down
  useEffect(() => {
    // Skip on server-side
    if (!isBrowser()) return;
    
    // DISABLED - commenting out section fade animations that might be causing gradient effects
    /*
    // Create refs for all sections that should fade in
    const aboutSection = document.getElementById('about');
    const projectsSection = document.getElementById('projects');
    const contactSection = document.getElementById('contact');
    
    // Add the initial class to make sections start transparent
    [aboutSection, projectsSection, contactSection].forEach(section => {
      if (section) {
        section.classList.add('section-fade-in');
      }
    });

    // Find paragraph elements and other content to animate
    const paragraphs = document.querySelectorAll('p:not(.animate-excluded)');
    const contentGroups = document.querySelectorAll('.mt-8, .grid, form');
    
    // Add fade-in class to paragraphs and content groups
    [...paragraphs, ...contentGroups].forEach(element => {
      element.classList.add('content-fade-in');
    });

    // Options for the intersection observer
    const fadeOptions = {
      root: null, // Use the viewport
      rootMargin: '-5% 0px', // Trigger when 5% of the section is visible
      threshold: 0.05 // Trigger when 5% of the target is visible
    };
    
    // Create the observer for sections
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // When section comes into view
        if (entry.isIntersecting) {
          // Get section ID to apply different timings for a more natural flow
          const sectionId = entry.target.id;
          let delay = 100;
          
          // Slightly different delays based on section
          if (sectionId === 'about') delay = 100;
          else if (sectionId === 'projects') delay = 150;
          else if (sectionId === 'contact') delay = 200;
          
          // Apply the fade-in with the appropriate delay
          setTimeout(() => {
            entry.target.classList.add('section-visible');
          }, delay);
          
          // Once we've shown the section, we can stop observing it
          sectionObserver.unobserve(entry.target);
        }
      });
    }, fadeOptions);
    
    // Create the observer for paragraphs with slightly different options
    const contentOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1 // A bit higher threshold for content elements
    };
    
    const contentObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Staggered delay for cascade effect
          const staggerDelay = 150 + (index % 5) * 100; // Different delays for varied animation
          
          setTimeout(() => {
            entry.target.classList.add('content-visible');
          }, staggerDelay);
          
          contentObserver.unobserve(entry.target);
        }
      });
    }, contentOptions);
    
    // Observe all sections
    [aboutSection, projectsSection, contactSection].forEach(section => {
      if (section) {
        sectionObserver.observe(section);
      }
    });
    
    // Observe paragraphs and content groups
    [...paragraphs, ...contentGroups].forEach(element => {
      contentObserver.observe(element);
    });

    return () => {
      // Clean up all observers
      [aboutSection, projectsSection, contactSection].forEach(section => {
        if (section) {
          sectionObserver.unobserve(section);
        }
      });
      
      [...paragraphs, ...contentGroups].forEach(element => {
        contentObserver.unobserve(element);
      });
    };
    */
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <style jsx global>{animationStyles}</style>
      {/* In Next.js App Router, head tags are defined in a separate metadata object or layout.js file */}

      {/* Top touch/hover area for showing header */}
      <div 
        className="fixed top-0 left-0 w-full h-12 z-40 cursor-default" 
        style={{ pointerEvents: 'auto' }}
        aria-hidden="true"
        id="header-trigger-area"
      ></div>

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
      <section id="home" className="pt-28 pb-24 relative bg-gray-900 text-white">
        {/* Parallax Wave Background */}
        <div className="absolute inset-0 overflow-hidden" ref={parallaxRef}>
          <div className="parallax-layer wave-bg"></div>
        </div>
        
        {/* Gradient overlay for smooth transition to About Me section */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-900 to-transparent"></div>
        
        {/* Hero content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 mt-12">
          <div className="relative mx-auto" style={{ width: '270px', height: '270px' }}>
            <img 
              src="./profile-1753671946.jpg" 
              alt='Devansh' 
              className='profile-image mx-auto rounded-full border-4 border-white shadow-lg object-cover hover:scale-105 transition-transform duration-300'
              style={{ width: '100%', height: '100%' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.backgroundColor = '#4B5563'; // bg-gray-600 as fallback
                e.target.alt = 'Profile Image';
              }}
            ></img>
          </div>
          <div className="min-h-[40px] md:min-h-[48px] mt-8">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .changeDelay(40)
                  .typeString("Hello, I'm Devansh")
                  .start();
              }}
              options={{
                cursor: '|', 
                cursorClassName: 'big-cursor', // Use our custom big cursor class
                wrapperClassName: 'text-4xl md:text-5xl font-extrabold',
                loop: false,
                autoStart: false
                // Not using cursorBlinkSpeed since we're using our custom animation
              }}
            />
          </div>
          {/* Typewriter for subtitle */}
          <div className="min-h-[56px] md:min-h-[64px] mt-6 mb-16">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .changeDelay(40)
                  .pauseFor(2000) // Wait for the name to finish typing
                  .typeString("Physics enthusiast")
                  .pauseFor(800)
                  .deleteAll()
                  .typeString("Number guy")
                  .pauseFor(800)
                  .deleteAll()
                  .typeString("Human")
                  .pauseFor(800)
                  .deleteAll()
                  .typeString(":)")
                  .pauseFor(800)
                  .deleteAll()
                  .start();
              }}
              options={{
                cursor: '|',
                cursorClassName: 'text-white animate-pulse',
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
      <section id="about" className="pt-20 pb-28 bg-gray-900 relative overflow-hidden">
        {/* Single Giant Star - Centered and positioned at bottom layer with lowest z-index */}
        <div className="stars-container" ref={starsRef}>
          {/* One giant star using CSS background approach for better control */}
          <div className="giant-star"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 2 }}>
          {/* Social Links Area */}
          <div className="flex justify-center space-x-8 mb-16">
            <a href="https://github.com/devtcu" target="_blank" rel="noopener noreferrer" className="social-icon text-gray-400 hover:text-white transition-all duration-300">
              <span className="sr-only">GitHub</span>
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/devansh-km/" target="_blank" rel="noopener noreferrer" className="social-icon text-gray-400 hover:text-blue-400 transition-all duration-300">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" clipRule="evenodd"></path>
              </svg>
            </a>
            <a 
              href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/files/CV.pdf`} 
              download 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon text-gray-400 hover:text-green-400 transition-all duration-300">
              <span className="sr-only">Resume/CV</span>
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM16 18H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
              </svg>
            </a>
          </div>
          
          <div className="relative text-center">
            {/* Birds container positioned precisely for the About Me heading */}
            <div className="birds-container" ref={birdsRef} style={{ zIndex: 2 }}>
              <div className="bird bird-1"></div>
              <div className="bird bird-2"></div>
              <div className="bird bird-3"></div>
            </div>
            <h2 ref={aboutRef} className="text-3xl font-bold text-blue-500 inline-block opacity-0 relative z-10 mb-11">About Me</h2>
          </div>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto relative" style={{ zIndex: 2 }}>
            &nbsp;&nbsp;&nbsp;&nbsp;I'm a physics major who graduated from Texas Christian University with a B.S in Physics in May 2025. 
            I've been actively involved in a variety of project, including computational, solid state, and atomic physics. 
             <br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;Currently, I'm working on researching and developing a computational framework to quantify
            spatial heterogeneity in syncytial cells. By leveraging Agent-Based Modelling, I simulate cell-cell 
            fusion dynamics, and apply topoligcal data analysis techniques to compute alpha shapes
            and persistent homology features! You can find some of my work below.
             <br /><br />
            &nbsp;&nbsp;&nbsp;&nbsp;My previous research endeavors include working as an undergraduate research assistant at Texas Christian University,
            where I studied surface properties of nanocrystalline oxides through spectroscopy, while also engineering UHV components
            to enable cathodoluminescence imaging. I have presented my research at various APS conferences
            around Texas and won multiple best presenter awards.   
             <br /><br />
          </p>
          
          {/* Commenting out skills, experience, and education section so we can use it for later
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 relative" style={{ zIndex: 2 }}>
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
          */}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 bg-gray-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 ref={projectsRef} className="text-3xl font-bold text-blue-600 text-center opacity-0 mb-16">Projects</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <a 
              href="https://github.com/devtcu/Topological-Data-Analysis"
              target='_blank'
              rel="noopener noreferrer"
              ref={el => projectCardsRef.current[0] = el}
              className="bg-white p-6 rounded-lg shadow-md opacity-0 transform hover:translate-y-[-5px] transition-all duration-300 block hover:bg-black group">
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-white transition-colors duration-300">Topological Data Analysis</h3>
              <p className="mt-2 text-gray-600 group-hover:text-gray-300 transition-colors duration-300">Using persistence homology to evaluate data</p>
            </a>
            <a 
              href="https://abm-sigma.vercel.app"
              target='_blank'
              rel="noopener noreferrer"
              ref={el => projectCardsRef.current[1] = el}
              className="bg-white p-6 rounded-lg shadow-md opacity-0 transform hover:translate-y-[-5px] transition-all duration-300 block hover:bg-black group">
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-white transition-colors duration-300">Agent-Based Model</h3>
              <p className="mt-2 text-gray-600 group-hover:text-gray-300 transition-colors duration-300">Web-based simulation of cell-cell fusion, utilising Flask for backend and allowing users to adjust parameters.</p>
            </a>
            <a 
              href="https://github.com/devtcu/Pandemic-Simulation"
              target='_blank'
              rel="noopener noreferrer"
              ref={el => projectCardsRef.current[2] = el}
              className="bg-white p-6 rounded-lg shadow-md opacity-0 transform hover:translate-y-[-5px] transition-all duration-300 block hover:bg-black group">
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-white transition-colors duration-300">Pandemic Simulation</h3>
              <p className="mt-2 text-gray-600 group-hover:text-gray-300 transition-colors duration-300">Tuneable Python script that uses physical perturbation to model human movement and track virus spread in a pandemic.</p>
            </a>
            
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-black relative">
        {/* Gradient overlay for smooth transition from previous section */}
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black to-black opacity-95"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 ref={contactRef} className="text-3xl font-bold text-white text-center opacity-0">Contact Me</h2>
          <div className="mt-8 flex flex-col items-center justify-center">
            <a href="mailto:d.kalluholematham@tcu.edu" className="social-icon text-gray-400 hover:text-red-400 transition-all duration-300 transform hover:scale-110 p-2 text-center">
              <span className="sr-only">Email</span>
              <svg className="h-20 w-20 mx-auto" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path>
              </svg>
              <p className="text-center text-gray-400 mt-3 font-medium">d.kalluholematham@tcu.edu</p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© {new Date().getFullYear()} Devansh KM. All rights reserved.</p>
          
         
        </div>
      </footer>
    </div>
  );
}
