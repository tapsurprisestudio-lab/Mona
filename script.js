/**
 * Arabic Birthday Experience - JavaScript
 * For Mother مروة from Daughter منى
 *
 * Features:
 * - YouTube IFrame API integration
 * - Envelope opening animation
 * - Typing animation for letter
 * - Counter animation
 * - Share functionality
 */

// ===================================
// Configuration
// ===================================
const CONFIG = {
    // YouTube Video ID
    youtubeVideoId: 'dCFbqvjGDl8',

    // Animation speeds
    typingSpeed: 60,
    lineDelay: 400,
    counterDuration: 2500,

    // Colors for confetti
    confettiColors: ['#c6a769', '#dfc89a', '#e8cfc3', '#f6efe7', '#a88a4d']
};

// ===================================
// Global Variables
// ===================================
let ytPlayer = null;
let musicStarted = false;
let isMuted = false;
let currentPage = 1;

// ===================================
// DOM Elements
// ===================================
const elements = {
    loadingScreen: document.getElementById('loadingScreen'),
    musicToggle: document.getElementById('musicToggle'),
    musicOnIcon: document.getElementById('musicOnIcon'),
    musicOffIcon: document.getElementById('musicOffIcon'),
    sparkleContainer: document.getElementById('sparkleContainer'),
    celebrationConfetti: document.getElementById('celebrationConfetti'),
    floatingHearts: document.getElementById('floatingHearts'),
    page1: document.getElementById('page1'),
    page2: document.getElementById('page2'),
    page3: document.getElementById('page3'),
    envelope: document.getElementById('envelope'),
    envelopeWrapper: document.getElementById('envelopeWrapper'),
    openBtn: document.getElementById('openBtn'),
    letterContent: document.getElementById('letterContent'),
    letterSignature: document.getElementById('letterSignature'),
    counterValue: document.getElementById('counterValue'),
    copyLinkBtn: document.getElementById('copyLinkBtn'),
    shareBtn: document.getElementById('shareBtn'),
    toast: document.getElementById('toast'),
    youtubePlayer: document.getElementById('youtubePlayer')
};

// ===================================
// Letter Content
// ===================================
const letterLines = [
    'ماما مروة الغالية 🤍',
    'اليوم يوم ميلادك...',
    'يوم النور اللي دخل حياتي...',
    'يوم صرتِ فيه أمي وصديقتي وقلبي وكل أمانيّ...',
    '',
    '43 سنة وأنتِ تكبرين جمالًا في عيوني...',
    'وتكبرين فخرًا في قلبي...',
    '',
    'أحبك بحجم السما...',
    'بحجم تعبك...',
    'بحجم كل مرة ضحكتي عشاني وخبيتي تعبك...',
    '',
    'كل عام وأنتِ بخير يا أغلى هدية في حياتي 💌'
];

// ===================================
// YouTube IFrame API
// ===================================
let ytReady = false;

// This function is called by YouTube API when ready
function onYouTubeIframeAPIReady() {
    ytPlayer = new YT.Player('youtubePlayer', {
        height: '1',
        width: '1',
        videoId: CONFIG.youtubeVideoId,
        playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            loop: 1,
            playlist: CONFIG.youtubeVideoId,
            fs: 0,
            cc_load_policy: 0,
            iv_load_policy: 3
        },
        events: {
            onReady: function(event) {
                ytReady = true;
                console.log('YouTube Player Ready');
            },
            onStateChange: function(event) {
                // Loop the video
                if (event.data === YT.PlayerState.ENDED) {
                    ytPlayer.seekTo(0);
                }
            }
        }
    });
}

// Load YouTube API
const tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// ===================================
// Music Controls
// ===================================
function startMusic() {
    if (ytReady && ytPlayer && !musicStarted) {
        ytPlayer.setVolume(70);
        ytPlayer.playVideo();
        musicStarted = true;
        console.log('Music started');
    }
}

function toggleMusic() {
    if (!ytReady || !ytPlayer) return;

    if (isMuted) {
        // Unmute
        ytPlayer.unMute();
        ytPlayer.setVolume(70);
        isMuted = false;
        elements.musicOnIcon.style.display = 'block';
        elements.musicOffIcon.style.display = 'none';
        elements.musicToggle.querySelector('.tooltip').textContent = 'إيقاف الموسيقى 🔇';
    } else {
        // Mute
        ytPlayer.mute();
        isMuted = true;
        elements.musicOnIcon.style.display = 'none';
        elements.musicOffIcon.style.display = 'block';
        elements.musicToggle.querySelector('.tooltip').textContent = 'تشغيل الموسيقى 🔊';
    }
}

// ===================================
// Sparkle Effects (Envelope Opening)
// ===================================
function createSparkles() {
    elements.sparkleContainer.innerHTML = '';
    elements.sparkleContainer.classList.add('active');

    const count = 30;
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.backgroundColor = CONFIG.confettiColors[Math.floor(Math.random() * CONFIG.confettiColors.length)];
            sparkle.style.animationDelay = Math.random() * 0.5 + 's';
            elements.sparkleContainer.appendChild(sparkle);
        }, i * 50);
    }

    // Hide after 2.5 seconds
    setTimeout(() => {
        elements.sparkleContainer.classList.remove('active');
    }, 2500);
}

// ===================================
// Celebration Confetti
// ===================================
function createCelebrationConfetti() {
    elements.celebrationConfetti.innerHTML = '';
    elements.celebrationConfetti.classList.add('active');

    const count = 80;
    for (let i = 0; i < count; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + '%';
        piece.style.backgroundColor = CONFIG.confettiColors[Math.floor(Math.random() * CONFIG.confettiColors.length)];
        piece.style.animationDelay = Math.random() * 2 + 's';
        piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        elements.celebrationConfetti.appendChild(piece);
    }

    // Hide after 5 seconds
    setTimeout(() => {
        elements.celebrationConfetti.classList.remove('active');
    }, 5000);
}

// ===================================
// Floating Hearts Background
// ===================================
function createFloatingHearts() {
    const hearts = ['💕', '💖', '💗', '💝', '❤️', '🤍'];

    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDelay = Math.random() * 5 + 's';
            heart.style.animationDuration = (10 + Math.random() * 5) + 's';
            elements.floatingHearts.appendChild(heart);
        }, i * 1000);
    }
}

// ===================================
// Typing Animation
// ===================================
async function typeLetter() {
    elements.letterContent.innerHTML = '';

    for (let i = 0; i < letterLines.length; i++) {
        const line = letterLines[i];
        const lineElement = document.createElement('p');
        lineElement.className = 'line';
        lineElement.style.animationDelay = (i * CONFIG.lineDelay / 1000) + 's';
        elements.letterContent.appendChild(lineElement);

        // Trigger animation
        await new Promise(resolve => setTimeout(resolve, 50));
    }

    // Show signature after typing
    setTimeout(() => {
        elements.letterSignature.classList.add('visible');
    }, letterLines.length * CONFIG.lineDelay + 500);
}

// ===================================
// Counter Animation
// ===================================
function animateCounter(targetValue = 100) {
    let current = 0;
    const increment = targetValue / (CONFIG.counterDuration / 20);

    const timer = setInterval(() => {
        current += increment;
        if (current >= targetValue) {
            current = targetValue;
            clearInterval(timer);
            elements.counterValue.textContent = '100%';
            elements.counterValue.classList.add('complete');

            // Trigger celebration
            createCelebrationConfetti();

            // Show footer
            document.querySelector('.page-footer').classList.add('visible');
        } else {
            elements.counterValue.textContent = Math.floor(current) + '%';
        }
    }, 20);
}

// ===================================
// Page Navigation
// ===================================
function goToPage(fromPage, toPageNumber, callback) {
    fromPage.classList.remove('active');
    currentPage = toPageNumber;

    setTimeout(() => {
        const toPage = toPageNumber === 2 ? elements.page2 : elements.page3;
        toPage.classList.add('active');

        if (callback) callback();
    }, 500);
}

// ===================================
// Envelope Click Handler
// ===================================
function handleEnvelopeOpen() {
    // Prevent double clicks
    if (elements.envelope.classList.contains('open')) return;

    // Open envelope
    elements.envelope.classList.add('open');

    // Create sparkles
    createSparkles();

    // Start music
    startMusic();

    // Navigate to letter page after envelope animation
    setTimeout(() => {
        goToPage(elements.page1, 2, () => {
            // Start typing animation
            typeLetter();

            // Start counter after typing completes
            setTimeout(() => {
                animateCounter();
            }, letterLines.length * CONFIG.lineDelay + 1500);
        });
    }, 1000);
}

// ===================================
// Share Functions
// ===================================
function copyLink() {
    const url = window.location.href;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
            showToast('تم نسخ الرابط بنجاح! 📋');
        }).catch(() => {
            fallbackCopy(url);
        });
    } else {
        fallbackCopy(url);
    }
}

function fallbackCopy(url) {
    const textArea = document.createElement('textarea');
    textArea.value = url;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        showToast('تم نسخ الرابط بنicially! 📋');
    } catch (err) {
        showToast('يمكنك مشاركة الرابط يدويًا 📝');
    }
    document.body.removeChild(textArea);
}

function sharePage() {
    const shareData = {
        title: 'عيد ميلاد سعيد يا أمي ❤️',
        text: 'رسالة حب خاصة من منى إلى أمها مروة',
        url: window.location.href
    };

    if (navigator.share) {
        navigator.share(shareData).catch(console.error);
    }
}

function showToast(message) {
    elements.toast.textContent = message;
    elements.toast.classList.add('show');
    setTimeout(() => {
        elements.toast.classList.remove('show');
    }, 2500);
}

// ===================================
// Event Listeners
// ===================================
function initEventListeners() {
    // Envelope click
    elements.envelopeWrapper.addEventListener('click', handleEnvelopeOpen);
    elements.openBtn.addEventListener('click', handleEnvelopeOpen);

    // Music toggle
    elements.musicToggle.addEventListener('click', toggleMusic);

    // Share buttons
    elements.copyLinkBtn.addEventListener('click', copyLink);
    elements.shareBtn.addEventListener('click', sharePage);

    // Check if native share is available
    if (navigator.share) {
        elements.shareBtn.style.display = 'flex';
    }
}

// ===================================
// Initialize
// ===================================
function init() {
    // Initialize floating hearts
    createFloatingHearts();

    // Initialize event listeners
    initEventListeners();

    // Hide loading screen after content loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            elements.loadingScreen.classList.add('hidden');
        }, 800);
    });
}

// Start everything
document.addEventListener('DOMContentLoaded', init);
