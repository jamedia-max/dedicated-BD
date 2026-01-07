/* =========================
   TYPEWRITER
========================= */
const text = "Happy Birthday!";
const el = document.getElementById("typewriter");
let i = 0, del = false;

function typeLoop() {
    if (!del && i < text.length) {
        el.textContent += text[i++];
    } else if (del && i > 0) {
        el.textContent = text.slice(0, --i);
    } else {
        del = !del;
    }
    setTimeout(typeLoop, del ? 80 : 120);
}
typeLoop();

/* =========================
   SECTION NAVIGATION
========================= */
const sections = document.querySelectorAll(".app-section");
let historyStack = [];

function hideAll() {
    sections.forEach(s => s.classList.add("none"));
}

function showSection(selector) {
    const current = document.querySelector(".app-section:not(.none)");
    if (current) historyStack.push(current);

    hideAll();
    document.querySelector(selector).classList.remove("none");
}

function goBack() {
    if (!historyStack.length) return;
    hideAll();
    historyStack.pop().classList.remove("none");
}

function openNoSec() { showSection(".no_section"); }
function opengiftSection() { showSection(".giftSection"); }

/* =========================
   GIFTS
========================= */
document.querySelectorAll(".gift-card").forEach(card => {
    card.onclick = () => {
        if (card.dataset.gift === "1") showSection(".slider-section");
        if (card.dataset.gift === "2") showSection(".message-section");
        if (card.dataset.gift === "3") showSection(".video-section");
    };
});

function toggleMusic() {
    if (bgMusic.paused) bgMusic.play();
    else bgMusic.pause();
}


/* =========================
   SLIDER
========================= */
let slide = 0;
const slides = document.getElementById("slides");
const dots = document.querySelectorAll(".dot");

function moveSlide(i) {
    slide = i;
    slides.style.transform = `translateX(-${i * 100}%)`;
    dots.forEach(d => d.classList.remove("active"));
    dots[i].classList.add("active");
}

setInterval(() => moveSlide((slide + 1) % dots.length), 4000);

/* =========================
   MUSIC
========================= */


/* =========================
   YOUTUBE + CONFETTI
========================= */
let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('yt-player', {
        events: {
            onStateChange: onPlayerStateChange
        }
    });
}

function onPlayerStateChange(event) {
    // When video starts playing
    if (event.data === YT.PlayerState.PLAYING) {
        bgMusic.pause();
        launchConfetti();
    }

    // When video is paused or ended
    if (
        event.data === YT.PlayerState.PAUSED ||
        event.data === YT.PlayerState.ENDED
    ) {
        bgMusic.play();
    }
}


const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
document.body.appendChild(tag);

function launchConfetti() {
    const confetti = document.querySelector(".confetti");
    ["🎉","🎊","❤️","💖"].forEach(e => {
        const s = document.createElement("span");
        s.textContent = e;
        s.style.left = Math.random()*100+"vw";
        confetti.appendChild(s);
        setTimeout(() => s.remove(), 4000);
    });
}

function restartExperience() {
    hideAll();
    historyStack = [];
    document.querySelector(".home_sec").classList.remove("none");
    if (player) player.stopVideo();
    music.pause(); music.currentTime = 0;
}



