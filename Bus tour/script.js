 // Load Navbar
 fetch('navbar.html')
 .then(response => response.text())
 .then(data => {document.getElementById('navbar').innerHTML = data;
})
.catch(error => console.error("Error loading navbar:", error));


// Load Footer
fetch('footer.html')
 .then(response => response.text())
 .then(data => {document.getElementById('footer').innerHTML = data;
 })
 .catch(error => console.error("Error loading navbar:", error));

/*navbar*/
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

/*button contact us*/
// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Get the button element
    const button = document.getElementById('contactButton');
  
    // Add a click event listener
    button.addEventListener('click', (event) => {
      // Prevent default navigation
      event.preventDefault();
  
      // Add a dynamic "clicked" class for animation
      button.classList.add('clicked');
      button.textContent = 'Loading...'; // Update text
      button.style.pointerEvents = 'none'; // Disable further clicks
  
      // Delay before navigating to the link
      setTimeout(() => {
        window.location.href = button.href; // Navigate to the href
      }, 1000); // 1-second delay
    });
  });
  
// slideshow start 
// Object to store current slide indices for each slideshow
const slideIndices = {};

// Initialize slideshows
function initializeSlideshow(slideshowId) {
    slideIndices[slideshowId] = 0;
    showSlides(slideshowId, slideIndices[slideshowId]);
}

// Change slide for a specific slideshow
function changeSlide(slideshowId, step) {
    slideIndices[slideshowId] += step;
    showSlides(slideshowId, slideIndices[slideshowId]);
}

// Set slide based on dot click
function setCurrentSlide(slideshowId, slideIndex) {
    slideIndices[slideshowId] = slideIndex;
    showSlides(slideshowId, slideIndex);
}

// Display slides for a specific slideshow
function showSlides(slideshowId, slideIndex) {
    const slideshow = document.getElementById(`slideshow${slideshowId}`);
    const slides = slideshow.querySelectorAll('.slide');
    const dots = document.querySelectorAll(`#slideshow${slideshowId} .dot`);

    if (slideIndex >= slides.length) slideIndices[slideshowId] = 0;
    if (slideIndex < 0) slideIndices[slideshowId] = slides.length - 1;

    slides.forEach((slide) => (slide.style.display = 'none'));
    slides[slideIndices[slideshowId]].style.display = 'block';

    // Update dot indicators
    if (dots.length > 0) {
        dots.forEach((dot) => dot.classList.remove('active'));
        dots[slideIndices[slideshowId]].classList.add('active');
    }
}

// Initialize all slideshows
document.addEventListener('DOMContentLoaded', () => {
    initializeSlideshow(1); // Initialize Slideshow 1
    initializeSlideshow(2); // Initialize Slideshow 2

    // Add auto-slide functionality
    setInterval(() => changeSlide(1, 1), 5000); // Auto-slide for Slideshow 1
    setInterval(() => changeSlide(2, 1), 7000); // Auto-slide for Slideshow 2
});

 //load form
 fetch("form.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("form-container").innerHTML = data;
    });
  
   // Process booking with SendGrid API
function processBooking(event) {
    event.preventDefault();
    const formData = new FormData(document.getElementById('bookingForm'));
    fetch('process_booking.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('responseMessage').innerText = data.message;
    })
    .catch(error => console.error('Error:', error));
}

document.getElementById('bookingForm').addEventListener('submit', processBooking);
