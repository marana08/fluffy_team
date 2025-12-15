const menuButton = document.querySelector('.header-burger-menu');
const modal = document.querySelector(".header-modal")
const closeButton = document.querySelector(".modal-close-button")
const link = document.querySelector(".modal-navigation-item")
const nav = document.querySelector(".modal-navigation-list")
const takeButton = document.querySelector(".modal-button")

function closeModal(event) {
    modal.classList.remove("is-open")
}

document.addEventListener("keydown", (event) => {
    const isEscape = event.key === "Escape";
    const isModalOpen = modal.classList.contains("is-open");
    if (isEscape && isModalOpen) {
        modal.classList.remove("is-open");
    }
});

takeButton.addEventListener("click", closeModal)

menuButton.addEventListener("click", (event) => {
    event.preventDefault()
    modal.classList.add("is-open")
})

closeButton.addEventListener("click", closeModal)
nav.addEventListener("click", closeModal)