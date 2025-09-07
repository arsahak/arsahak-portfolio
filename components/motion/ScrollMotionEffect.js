'use client';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useRef } from 'react';

const ScrollMotionEffect = ({ children, effect, duration }) => {
  const isInitialized = useRef(false);

  useEffect(() => {
    // Check if AOS is available and window exists (for SSR compatibility)
    if (typeof window !== 'undefined' && AOS && !isInitialized.current) {
      try {
        AOS.init({
          // Disable AOS on mobile devices to prevent issues
          disable: 'mobile',
          // Prevent AOS from running on small screens
          startEvent: 'DOMContentLoaded',
          // Use a more stable initialization
          initClassName: 'aos-init',
          animatedClassName: 'aos-animate',
          useClassNames: true,
          // Disable debounced resize listener
          disableMutationObserver: false,
          // Debounce settings
          debounceDelay: 50,
          throttleDelay: 99,
          // Prevent multiple initializations
          once: true,
        });
        
        isInitialized.current = true;
        
        // Refresh AOS after a short delay to ensure proper initialization
        const refreshTimer = setTimeout(() => {
          if (AOS && typeof AOS.refresh === 'function') {
            try {
              AOS.refresh();
            } catch (error) {
              console.warn('AOS refresh error:', error);
            }
          }
        }, 100);

        return () => {
          clearTimeout(refreshTimer);
        };
      } catch (error) {
        console.warn('AOS initialization error:', error);
      }
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Only cleanup if this is the last instance
      if (typeof window !== 'undefined' && AOS && isInitialized.current) {
        try {
          // Check if there are other AOS elements before destroying
          const aosElements = document.querySelectorAll('[data-aos]');
          if (aosElements.length <= 1) {
            // This is likely the last AOS element, safe to cleanup
            setTimeout(() => {
              try {
                if (AOS && typeof AOS.refresh === 'function') {
                  AOS.refresh();
                }
              } catch (error) {
                console.warn('AOS cleanup error:', error);
              }
            }, 0);
          }
        } catch (error) {
          console.warn('AOS cleanup error:', error);
        }
      }
    };
  }, []);

  return (
    <div
      data-aos={effect}
      data-aos-duration={duration}
      data-aos-delay={0}
      data-aos-once={true}
    >
      {children}
    </div>
  );
};

export default ScrollMotionEffect;
