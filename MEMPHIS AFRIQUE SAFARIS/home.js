//full width slideshows
document.addEventListener("DOMContentLoaded", function () {
    let slideIndexFW = 0;
    let autoSlideIntervalFW;
    let slidesFW = document.querySelectorAll("#fullWidthSlideshow .slide");
    let dotsFW = document.querySelectorAll("#fullWidthSlideshow .dot");

    function showSlidesFW(n) {
        if (!slidesFW.length) return; // Ensure the slideshow exists

        if (n > slidesFW.length) { slideIndexFW = 1; }
        else if (n < 1) { slideIndexFW = slidesFW.length; }
        else { slideIndexFW = n; }

        slidesFW.forEach(slide => (slide.style.display = "none"));
        dotsFW.forEach(dot => dot.classList.remove("active-dot"));

        slidesFW[slideIndexFW - 1].style.display = "block";
        dotsFW[slideIndexFW - 1].classList.add("active-dot");
    }

    function currentSlideFW(n) {
        clearInterval(autoSlideIntervalFW); // Stop auto-slide on user interaction
        showSlidesFW(n);
        autoSlideIntervalFW = setInterval(() => nextSlideFW(), 4000); // Restart auto-slide
    }

    function nextSlideFW() {
        showSlidesFW(slideIndexFW + 1);
    }

    function initSlideshowFW() {
        if (!slidesFW.length) return; // Prevent running if no slideshow exists

        showSlidesFW(1);
        autoSlideIntervalFW = setInterval(() => nextSlideFW(), 4000); // Auto-slide every 4 sec

        dotsFW.forEach((dot, index) => {
            dot.addEventListener("click", () => currentSlideFW(index + 1));
        });
    }

    // Initialize only this specific slideshow
    initSlideshowFW();
});
