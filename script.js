document.addEventListener('DOMContentLoaded', () => {
  // Contact button alert
  const contactButtons = document.querySelectorAll('.contact-btn');
  contactButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      alert('יצירת קשר');
    });
  });

  // Hamburger toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
});
