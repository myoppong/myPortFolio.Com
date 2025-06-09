const menuToggle = document.getElementById("menu-toggle");
        const mobileMenu = document.getElementById("mobile-menu");
        const menuItems = document.querySelectorAll(".menu-item");

        // Toggle the mobile menu
        menuToggle.addEventListener("click", (event) => {
            event.stopPropagation(); // Prevent this click from closing the menu
            mobileMenu.classList.toggle("-translate-x-full");
        });

        // Close menu when clicking outside
        document.addEventListener("click", (event) => {
            if (!menuToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.add("-translate-x-full");
            }
        });

        // Close the menu when resizing to desktop view
        window.addEventListener("resize", () => {
            if (window.innerWidth >= 768) {
                mobileMenu.classList.add("-translate-x-full");
            }
        });

        // Close menu when clicking a menu item & scroll smoothly
        menuItems.forEach(item => {
            item.addEventListener("click", function (event) {
                event.preventDefault();
                let selectedTab = this.getAttribute("href").substring(1); // Get the section ID

                // Close menu after selecting an option
                mobileMenu.classList.add("-translate-x-full");

                // Smooth scroll to the section
                document.getElementById(selectedTab).scrollIntoView({ behavior: "smooth" });
            });
        });


        document.addEventListener("DOMContentLoaded", function () {
            const menuItems = document.querySelectorAll(".menu-item, nav ul li a"); // Select both sidebar & mobile menu links
            const sections = document.querySelectorAll(".content-section");
            const mobileMenu = document.getElementById("mobile-menu");

            // Load active section from localStorage or default to "home"
            let activeSectionId = localStorage.getItem("activeSection") || "home";
            activateSection(activeSectionId);

            menuItems.forEach(item => {
                item.addEventListener("click", function (event) {
                    event.preventDefault();

                    // Get the target section from either data-target or href
                    const targetId = item.getAttribute("data-target") || item.getAttribute("href").substring(1);
                    activateSection(targetId);

                    // Save the active section to localStorage
                    localStorage.setItem("activeSection", targetId);

                    // Close the mobile menu after clicking a link
                    mobileMenu.classList.add("-translate-x-full");

                    // Scroll smoothly to the section
                    document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
                });
            });

            function activateSection(targetId) {
                // Show only the active section
                sections.forEach(section => {
                    section.classList.add("hidden");
                    if (section.id === targetId) {
                        section.classList.remove("hidden");
                    }
                });

                // Update active menu link styles (Colorful tab effect in Sidebar)
                document.querySelectorAll(".menu-item").forEach(item => {
                    if (item.getAttribute("data-target") === targetId) {
                        item.classList.add("bg-gradient-to-r", "from-purple-500", "to-blue-500", "text-white", "rounded-lg", "p-2");
                    } else {
                        item.classList.remove("bg-gradient-to-r", "from-purple-500", "to-blue-500", "text-white", "rounded-lg", "p-2");
                    }
                });
            }
        });


        const skills = ["Web developer", "Software engineer"];
        let index = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            let currentSkill = skills[index];
            let displayText = isDeleting
                ? currentSkill.substring(0, charIndex--)
                : currentSkill.substring(0, charIndex++);

            document.getElementById("typewriter").textContent = displayText;

            if (!isDeleting && charIndex === currentSkill.length + 1) {
                isDeleting = true;
                setTimeout(type, 1000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                index = (index + 1) % skills.length;
                setTimeout(type, 800);
            } else {
                setTimeout(type, isDeleting ? 50 : 150);
            }
        }

        // Blinking cursor effect
        setInterval(() => {
            document.getElementById("cursor").classList.toggle("invisible");
        }, 500);

        type();


        document.getElementById('contact-form').addEventListener('submit', async e => {
      e.preventDefault();
      const form = e.target;
      const data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        message: form.message.value.trim()
      };

      try {
        const res = await fetch('https://my-port-folio-backend-4s81zf92r-myoppongs-projects.vercel.app/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error(await res.text());
        alert('✅ Thanks! Your message has been sent.');
        form.reset();
      } catch (err) {
        console.error(err);
        alert('❌ Oops! There was a problem sending your message.');
      }
    });