
const profile = document.querySelector('.profile__btn');
const dropdown = document.querySelector('.dropdown__wrapper');

if (profile && dropdown) {
    profile.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('active');
    });

    document.addEventListener("click", (event) => {
        if (!dropdown.contains(event.target) && !profile.contains(event.target)) {
            dropdown.classList.remove('active');
        }
    });

    // Prevent dropdown from closing when clicking inside it
    dropdown.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

