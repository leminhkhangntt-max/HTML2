document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------------
       1. Sticky Navigation + Active Link
    ----------------------------------- */
    const nav = document.querySelector("nav");
    const navLinks = document.querySelectorAll("nav a");

    window.addEventListener("scroll", () => {
        nav.classList.toggle("scrolled", window.scrollY > 50);
    });

    // Highlight active link based on current page
    navLinks.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add("active");
        }
    });

    /* -----------------------------------
       2. Smooth Scrolling for Internal Links
    ----------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(anchor.getAttribute("href"))
                .scrollIntoView({ behavior: "smooth" });
        });
    });

    /* -----------------------------------
       3. Reveal Animation on Scroll
    ----------------------------------- */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

    /* -----------------------------------
       4. Lightbox for Gallery Images
    ----------------------------------- */
    document.body.addEventListener("click", (e) => {
        if (e.target.classList.contains("project-img")) {
            openLightbox(e.target.src);
        }
    });

    /* -----------------------------------
       5. Contact Form Validation
    ----------------------------------- */
    const contactForm = document.querySelector("#contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = contactForm.querySelector("#name").value.trim();
            if (name.length < 2) {
                alert("Please enter a valid name.");
                return;
            }

            alert(`Thanks, ${name}! Your message has been sent (simulated).`);
            contactForm.reset();
        });
    }

    /* -----------------------------------
       6. Dark / Light Mode Toggle
    ----------------------------------- */
    const toggleBtn = document.querySelector("#theme-toggle");
    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");
            toggleBtn.textContent = 
                document.body.classList.contains("light-mode")
                ? "Dark Mode"
                : "Light Mode";
        });
    }
});

/* -----------------------------------
   Lightbox Helper
----------------------------------- */
function openLightbox(src) {
    const modal = document.createElement("div");
    modal.className = "lightbox-modal";

    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <img src="${src}" alt="Full size view">
        </div>
    `;

    document.body.appendChild(modal);

    modal.addEventListener("click", (e) => {
        if (e.target.classList.contains("close-btn") || e.target === modal) {
            modal.remove();
        }
    });
}
