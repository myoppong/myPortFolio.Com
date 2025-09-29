
// =========================================================================
document.addEventListener("DOMContentLoaded", function () {
    // Initialize all functionalities once the document is loaded
    initMobileMenu();
    initTypewriter();
    initSectionNavigation();
    initContactForm();
    initProjectFiltering();
});



// MOBILE MENU LOGIC
// =========================================================================
function initMobileMenu() {
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");

    if (!menuToggle || !mobileMenu) return;

    // Toggle the mobile menu on button click
    menuToggle.addEventListener("click", (event) => {
        event.stopPropagation();
        mobileMenu.classList.toggle("-translate-x-full");
    });

    // Close menu when clicking outside of it
    document.addEventListener("click", (event) => {
        if (!mobileMenu.classList.contains('-translate-x-full') && !menuToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
            mobileMenu.classList.add("-translate-x-full");
        }
    });
}


// TYPEWRITER EFFECT LOGIC
// =========================================================================
function initTypewriter() {
    const typewriterElement = document.getElementById("typewriter");
    const cursorElement = document.getElementById("cursor");

    if (!typewriterElement || !cursorElement) return;

    const skills = ["Web Developer", "Software Engineer"];
    let skillIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentSkill = skills[skillIndex];
        let displayText = isDeleting ?
            currentSkill.substring(0, charIndex--) :
            currentSkill.substring(0, charIndex++);

        typewriterElement.textContent = displayText;

        if (!isDeleting && charIndex === currentSkill.length + 1) {
            isDeleting = true;
            setTimeout(type, 1500); // Pause at the end of the word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            skillIndex = (skillIndex + 1) % skills.length;
            setTimeout(type, 500); // Pause before typing the next word
        } else {
            setTimeout(type, isDeleting ? 75 : 150);
        }
    }

    // Blinking cursor effect
    setInterval(() => {
        cursorElement.classList.toggle("invisible");
    }, 500);

    type(); // Start the effect
}


// =========================================================================
// SECTION NAVIGATION LOGIC
// =========================================================================
function initSectionNavigation() {
    const menuItems = document.querySelectorAll(".menu-item, #mobile-menu a");
    const sections = document.querySelectorAll(".content-section");
    const mobileMenu = document.getElementById("mobile-menu");

    if (menuItems.length === 0 || sections.length === 0) return;

    function activateSection(targetId) {
        // Show only the active section
        sections.forEach(section => {
            section.classList.toggle("hidden", section.id !== targetId);
        });

        // Update active menu link styles for the desktop sidebar
        document.querySelectorAll(".menu-item").forEach(item => {
            const isTarget = item.getAttribute("data-target") === targetId;
            item.classList.toggle("bg-gradient-to-r", isTarget);
            item.classList.toggle("from-purple-500", isTarget);
            item.classList.toggle("to-blue-500", isTarget);
            item.classList.toggle("text-white", isTarget);
            item.classList.toggle("rounded-lg", isTarget);
            item.classList.toggle("p-2", isTarget);
        });
    }

    // Load active section from localStorage or default to "home"
    const activeSectionId = localStorage.getItem("activeSection") || "home";
    activateSection(activeSectionId);

    menuItems.forEach(item => {
        item.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = item.getAttribute("data-target") || item.getAttribute("href").substring(1);
            
            activateSection(targetId);
            localStorage.setItem("activeSection", targetId);

            // Close the mobile menu if it's open
            if (mobileMenu) {
                mobileMenu.classList.add("-translate-x-full");
            }
        });
    });
}


// =========================================================================
// CONTACT FORM LOGIC
// =========================================================================
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const form = e.target;
        const submitButton = form.querySelector('button[type="submit"]');

        const data = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            message: form.message.value.trim()
        };

        submitButton.disabled = true;
        submitButton.textContent = 'Sending Message...';

        try {
            const res = await fetch('https://michaeloppongbackend.onrender.com/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!res.ok) throw new Error(await res.text());
            alert('Thanks! Your message has been sent.');
            form.reset();
        } catch (err) {
            console.error(err);
            alert('Oops! There was a problem sending your message.');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
    });
}


// =========================================================================
// PROJECT FILTERING LOGIC
// =========================================================================
function initProjectFiltering() {
    const filterContainer = document.querySelector("#project-filters");
    const projectCards = document.querySelectorAll("#projects-grid .project-card");

    if (!filterContainer || projectCards.length === 0) return;

    const activeClasses = ['bg-gradient-to-r', 'from-violet-500', 'to-blue-500', 'text-white', 'shadow-lg', 'shadow-violet-500/25'];
    const inactiveClasses = ['bg-gray-800', 'text-gray-300', 'hover:bg-violet-700', 'hover:text-white'];

    function styleButtons(activeButton) {
        filterContainer.querySelectorAll('.filter-btn').forEach(button => {
            button.classList.remove(...activeClasses);
            button.classList.add(...inactiveClasses);
        });
        activeButton.classList.remove(...inactiveClasses);
        activeButton.classList.add(...activeClasses);
    }
    
    styleButtons(filterContainer.querySelector('[data-filter="all"]'));

    filterContainer.addEventListener("click", (e) => {
        const clickedButton = e.target.closest('.filter-btn');
        if (!clickedButton) return;

        const filterValue = clickedButton.getAttribute("data-filter");
        styleButtons(clickedButton);

        projectCards.forEach(card => {
            const cardCategory = card.getAttribute("data-category");
            const shouldBeVisible = (filterValue === "all" || filterValue === cardCategory);
            card.classList.toggle('hidden', !shouldBeVisible);
        });
    });
}


// =========================================================================
// PROJECT GALLERY MODAL LOGIC
// =========================================================================

// 1. DATA: Store image URLs for each project gallery here.
const projectImageData = {
    'stock-mart': {
        images: [
            // ACTION: Replace these placeholder images with your actual screenshots for Stock Mart
            './images/a.jpeg',
            './images/b.jpeg',
            './images/c.jpeg',
            './images/d.jpeg',
            './images/e.jpeg',
            './images/f.jpeg',
            './images/g.jpeg',
            './images/h.jpeg',
            './images/i.jpeg',
            './images/j.jpeg',
            './images/k.jpeg',
            './images/l.jpeg',
            './images/m.jpeg',
            './images/n.jpeg',
            './images/o.jpeg',
            './images/p.jpeg',
        ]
    }
    // You can add more projects here in the future. For example:
    // 'evently': {
    //     images: [ 'path/to/evently1.jpg', 'path/to/evently2.jpg' ]
    // }
};

// Global variable to hold the active Swiper instance
let projectSwiper = null;

/**
 * Opens the project gallery modal and populates it with images.
 * @param {string} projectKey - The key corresponding to the project in projectImageData.
 */
function openProjectModal(projectKey) {
    const project = projectImageData[projectKey];
    const modal = document.getElementById('project-gallery-modal');

    if (!project || !project.images || !modal) {
        console.error("Project data or modal not found for key:", projectKey);
        return;
    }
    
    const swiperWrapper = modal.querySelector('#project-swiper .swiper-wrapper');
    swiperWrapper.innerHTML = ''; // Clear old slides to prepare for new ones

    // 2. CREATE & INSERT SLIDES: Dynamically create slides from the image data.
    project.images.forEach(imgUrl => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        // Set the background image for each slide
        slide.style.backgroundImage = `url('${imgUrl}')`;
        slide.style.backgroundSize = 'contain';
        slide.style.backgroundPosition = 'center';
        slide.style.backgroundRepeat = 'no-repeat';
        swiperWrapper.appendChild(slide);
    });
    
    // Show the modal with a fade-in effect
    modal.classList.remove('opacity-0', 'pointer-events-none');
    
    // 3. INITIALIZE SWIPER: Create a new gallery instance.
    // First, destroy any old instance to prevent conflicts
    if (projectSwiper) {
        projectSwiper.destroy(true, true);
    }
    
    projectSwiper = new Swiper('#project-swiper', {
        loop: true,
        grabCursor: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction', // Shows slide numbers e.g., "1 / 5"
        },
    });
}

/**
 * Closes the project gallery modal.
 */
function closeProjectModal() {
    const modal = document.getElementById('project-gallery-modal');
    if (modal) {
        // Fade out and hide the modal
        modal.classList.add('opacity-0', 'pointer-events-none');
        
        // 4. DESTROY SWIPER: Clean up the gallery instance to free up resources.
        if (projectSwiper) {
            projectSwiper.destroy(true, true);
            projectSwiper = null;
        }
    }
}

// Add event listener to close modal on escape key press
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('project-gallery-modal');
        if (modal && !modal.classList.contains('pointer-events-none')) {
            closeProjectModal();
        }
    }
});
