/* =========================================
   HEADER ON SCROLL
========================================= */

const header = document.getElementById("mainHeader");

function handleHeaderScroll() {

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }
}

window.addEventListener("scroll", handleHeaderScroll);


/* =========================================
   SMOOTH ANCHOR SCROLL
========================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (targetId === "#") return;

        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        const headerHeight = header.offsetHeight;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight -
            15;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });


        /* Fecha o menu mobile */

        const navbarCollapse =
            document.getElementById("navbarContent");

        if (
            navbarCollapse &&
            navbarCollapse.classList.contains("show")
        ) {

            const bsCollapse =
                bootstrap.Collapse.getInstance(navbarCollapse);

            if (bsCollapse) {
                bsCollapse.hide();
            }

        }

    });

});


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );

revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================
   SERVICE CARD INTERACTION
========================================= */

const serviceCards =
    document.querySelectorAll(".service-card");

serviceCards.forEach(card => {

    card.addEventListener("mousemove", event => {

        const rect = card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;

        const rotateX =
            ((y - centerY) / centerY) * -2;

        const rotateY =
            ((x - centerX) / centerX) * 2;

        card.style.transform =
            `translateY(-8px)
             perspective(800px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


/* =========================================
   WHATSAPP CTA FEEDBACK
========================================= */

const whatsappButtons =
    document.querySelectorAll(
        'a[href*="wa.me"]'
    );

whatsappButtons.forEach(button => {

    button.addEventListener("click", function () {

        const originalHTML =
            this.innerHTML;

        this.innerHTML =
            '<i class="bi bi-check-circle-fill"></i> Abrindo WhatsApp...';

        setTimeout(() => {

            this.innerHTML =
                originalHTML;

        }, 1800);

    });

});


/* =========================================
   AUTOMATIC YEAR
========================================= */

const yearElement =
    document.getElementById("currentYear");

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================================
   INITIALIZATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    handleHeaderScroll();

});