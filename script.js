document.addEventListener("DOMContentLoaded", () => {

    /* ==============================
       ELEMENTS
    ============================== */

    const gift = document.getElementById("gift");
    const birthdayContent = document.getElementById("birthdayContent");
    const clickText = document.getElementById("clickText");

    const music = document.getElementById("music");
    const musicButton = document.getElementById("musicButton");

    const slide = document.getElementById("slide");

    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    const dots = document.querySelectorAll(".dot");

    const timeElement = document.getElementById("time");


    /* ==============================
       PHOTO SLIDESHOW
    ============================== */

    const photos = [
        "photo1.jpeg",
        "photo2.jpeg",
        "photo3.jpeg",
        "photo4.jpeg",
        "photo5.jpeg"
    ];

    let currentPhoto = 0;


    function updatePhoto() {

        slide.style.opacity = "0";

        setTimeout(() => {

            slide.src = photos[currentPhoto];

            slide.style.opacity = "1";

        }, 200);


        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentPhoto
            );

        });

    }


    function nextPhoto() {

        currentPhoto++;

        if (currentPhoto >= photos.length) {

            currentPhoto = 0;

        }

        updatePhoto();

    }


    function previousPhoto() {

        currentPhoto--;

        if (currentPhoto < 0) {

            currentPhoto = photos.length - 1;

        }

        updatePhoto();

    }


    nextBtn.addEventListener(
        "click",
        nextPhoto
    );

    prevBtn.addEventListener(
        "click",
        previousPhoto
    );


    /* AUTO SLIDESHOW */

    setInterval(() => {

        nextPhoto();

    }, 4000);


    /* ==============================
       GIFT
    ============================== */

    let giftOpened = false;


    gift.addEventListener("click", () => {

        if (giftOpened) return;

        giftOpened = true;

        gift.classList.add("open");

        clickText.textContent =
            "Your surprise is waiting ↓";


        /* PLAY MUSIC */

        music.play()
            .then(() => {

                musicButton.classList.add("playing");

            })
            .catch(() => {

                console.log(
                    "Music needs user interaction."
                );

            });


        /* SHOW MESSAGE */

        setTimeout(() => {

            birthdayContent.classList.add("show");

            birthdayContent.scrollIntoView({
                behavior: "smooth"
            });

        }, 900);

    });


    /* ==============================
       MUSIC BUTTON
    ============================== */

    musicButton.addEventListener("click", () => {

        if (music.paused) {

            music.play();

            musicButton.classList.add("playing");

        } else {

            music.pause();

            musicButton.classList.remove("playing");

        }

    });


    /* ==============================
       PHONE TIME
    ============================== */

    function updateTime() {

        const now = new Date();

        let hours = now.getHours();

        let minutes = now.getMinutes();

        if (minutes < 10) {

            minutes = "0" + minutes;

        }

        if (hours > 12) {

            hours -= 12;

        }

        if (hours === 0) {

            hours = 12;

        }

        timeElement.textContent =
            `${hours}:${minutes}`;

    }


    updateTime();

    setInterval(
        updateTime,
        30000
    );


    /* ==============================
       IMAGE ERROR CHECK
    ============================== */

    slide.addEventListener(
        "error",
        () => {

            console.error(
                "Photo could not be loaded:",
                slide.src
            );

        }
    );


    console.log(
        "🖤 Birthday website loaded successfully."
    );

});