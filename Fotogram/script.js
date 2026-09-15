const photos = [
    {
        src: "./assets/photo-1.webp",
        title: "Alaska-810433_1280",
        alt: "Gletscher und Berge in Alaska"
    },
    {
        src: "./assets/photo-2.webp",
        title: "Anime-8788959_1280",
        alt: "Beleuchtete Straße im Anime-Stil"
    },
    {
        src: "./assets/photo-3.webp",
        title: "Atmosphere-8752835_1280",
        alt: "Sonnenlicht zwischen dunklen Wolken"
    },
    {
        src: "./assets/photo-4.webp",
        title: "Blue-tit-8521052_1280",
        alt: "Blaumeise auf einem Zweig"
    },
    {
        src: "./assets/photo-5.webp",
        title: "Hurricane-92968_1280",
        alt: "Wirbelsturm aus dem Weltall"
    },
    {
        src: "./assets/photo-6.webp",
        title: "Lake-2896379_1280",
        alt: "Berge spiegeln sich in einem See"
    },
    {
        src: "./assets/photo-7.webp",
        title: "Moorente-8783210_1280",
        alt: "Ente auf dem Wasser"
    },
    {
        src: "./assets/photo-8.webp",
        title: "Sea-2563389_1280",
        alt: "Person auf einem Felsen am Meer"
    },
    {
        src: "./assets/photo-9.webp",
        title: "Snow-bunting-6781122_1280",
        alt: "Schneeammer auf einem Felsen"
    },
    {
        src: "./assets/photo-10.webp",
        title: "Snow-leopard-cubs-8039138_1280",
        alt: "Junge Schneeleoparden"
    },
    {
        src: "./assets/photo-11.webp",
        title: "Travel-8785493_1280",
        alt: "Berglandschaft unter blauem Himmel"
    },
    {
        src: "./assets/photo-12.webp",
        title: "Winter-1675197_1280",
        alt: "Verschneiter Baum"
    }
];


let currentIndex = 0;


function init() {
    renderGallery();
}


function renderGallery() {
    let gallery = document.getElementById("gallery");
    gallery.innerHTML = "";

    for (let i = 0; i < photos.length; i++) {
        gallery.innerHTML += getGalleryTemplate(i);
    }
}


function getGalleryTemplate(index) {
    let photo = photos[index];

    return `
        <button
            type="button"
            class="thumbnail"
            onclick="openDialog(${index})"
        >
            <img
                src="${photo.src}"
                alt="${photo.alt}"
                loading="lazy"
                onerror="showThumbnailError(this, ${index})"
            >
        </button>
    `;
}


function showThumbnailError(image, index) {
    let photo = photos[index];

    image.parentElement.innerHTML = `
        <span class="image-error">
            ${photo.title} – Bild nicht verfügbar
        </span>
    `;
}


function openDialog(index) {
    currentIndex = index;
    updateDialog();

    let dialog = document.getElementById("photoDialog");
    dialog.showModal();

    document.body.classList.add("dialog-open");
}


function updateDialog() {
    let photo = photos[currentIndex];

    updateDialogTitle(photo);
    updateCounter();
    updateDialogImage(photo);
}


function updateDialogTitle(photo) {
    document.getElementById("dialogTitle").innerHTML =
        photo.title;
}


function updateCounter() {
    document.getElementById("counter").innerHTML =
        `${currentIndex + 1} / ${photos.length}`;
}


function updateDialogImage(photo) {
    let container = document.getElementById("imageContainer");

    container.innerHTML = getDialogImageTemplate(photo);
}


function getDialogImageTemplate(photo) {
    return `
        <img
            class="large-image"
            src="${photo.src}"
            alt="${photo.alt}"
            onerror="showLargeImageError()"
        >
    `;
}


function showLargeImageError() {
    document.getElementById("imageContainer").innerHTML = `
        <p class="image-status">
            Bild konnte nicht geladen werden.
        </p>
    `;
}


function changePhoto(direction) {
    currentIndex += direction;

    checkCurrentIndex();
    updateDialog();
}


function checkCurrentIndex() {
    if (currentIndex < 0) {
        currentIndex = photos.length - 1;
    }

    if (currentIndex >= photos.length) {
        currentIndex = 0;
    }
}


function closeDialog() {
    document.getElementById("photoDialog").close();
}


function dialogClosed() {
    document.body.classList.remove("dialog-open");
}


function handleKey(event) {
    if (event.key == "ArrowLeft") {
        changePhoto(-1);
    }

    if (event.key == "ArrowRight") {
        changePhoto(1);
    }
}


function closeOnBackground(event) {
    let dialog = document.getElementById("photoDialog");

    if (event.target == dialog) {
        closeDialog();
    }
}