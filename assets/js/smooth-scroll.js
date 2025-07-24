/**
 * Smooth scrolling for anchor links
 */
document.addEventListener('DOMContentLoaded', function() {
    // Select all links with hashes
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Prevent default anchor behavior
            e.preventDefault();
            
            // Get the target element
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate the scroll position
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                // Perform the smooth scroll
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL hash without jumping
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    window.location.hash = targetId;
                }
            }
        });
    });
    
    // Fix for :target selector after smooth scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            
            if (scrollPosition >= (sectionTop - navbarHeight - 50) && 
                scrollPosition < (sectionTop + sectionHeight - navbarHeight - 50)) {
                const id = section.getAttribute('id');
                if (history.replaceState) {
                    history.replaceState(null, null, '#' + id);
                }
            }
        });
    });
});