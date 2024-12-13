// On cible les éléments à modifier
const toggle = document.querySelector(".menu-btn");
const nav = document.querySelector(".menu");
const page = document.body;

// Vérifier si les éléments existent avant d'ajouter l'événement
if (toggle && nav) {
    toggle.addEventListener("click", () => {
        const isOpen = toggle.ariaExpanded === "true";
        const isClosed = !isOpen;
        // Mise à jour des attributs ARIA pour accessibilité
        toggle.ariaExpanded = isClosed;
        nav.ariaHidden = isOpen;
        page.classList.toggle("noscroll", isClosed);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const carrouselParent = document.getElementById('carrouselParent');
    const prevButton = document.querySelector('.carrousel_btn-avant');
    const nextButton = document.querySelector('.carrousel_btn-apres');
    const screens = document.querySelectorAll('.carrousel_ecran');

    let currentIndex = 0;

    // Fonction pour déplacer le carrousel
    const scrollToScreen = (index) => {
        const screenWidth = carrouselParent.clientWidth;
        carrouselParent.scrollTo({
            left: index * screenWidth,
            behavior: 'smooth',
        });
    };

    // Mise à jour des boutons
    const updateButtons = () => {
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === screens.length - 1;
    };

    // Écouteurs pour les boutons
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            scrollToScreen(currentIndex);
            updateButtons();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < screens.length - 1) {
            currentIndex++;
            scrollToScreen(currentIndex);
            updateButtons();
        }
    });

    // Gestion du scroll pour synchroniser l'index
    carrouselParent.addEventListener('scroll', () => {
        const screenWidth = carrouselParent.clientWidth;
        const newIndex = Math.round(carrouselParent.scrollLeft / screenWidth);

        if (newIndex !== currentIndex) {
            currentIndex = newIndex;
            updateButtons();
        }
    });

    // Initialisation des boutons
    updateButtons();
});

document.querySelectorAll('.accordion-header').forEach((button) => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;

        // Masquer tous les contenus d'accordéon
        document.querySelectorAll('.accordion-content').forEach((item) => {
            if (item !== content) {
                item.classList.remove('active');
                item.style.display = 'none';
            }
        });

        // Afficher ou masquer le contenu cliqué
        if (content.style.display === 'block') {
            content.style.display = 'none';
        } else {
            content.style.display = 'block';
        }
    });
});
