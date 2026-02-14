/**
 * Arabic Birthday Experience - Premium JavaScript
 * For Mother مروة from Daughter منى
 *
 * Features:
 * - YouTube IFrame API integration (music starts only on envelope click)
 * - 4 Cinematic Sections with smooth transitions
 * - Envelope opening with sparkle effects
 * - Letter typing animation
 * - Counter animation (0% → 100%)
 * - Share functionality
 */

// ===================================
// Configuration
// ===================================
const CONFIG = {
    // YouTube Video ID
    youtubeVideoId: 'dCFbqvjGDl8',

    // Animation speeds
    paragraphDelay: 1200,
    counterDuration: 3000,

    // Colors for effects
    confettiColors: ['#c6a769', '#dfc89a', '#e8cfc3', '#f6efe7', '#a88a4d']
};

// ===================================
// Global Variables
// ===================================
let ytPlayer = null;
let musicStarted = false;
let isMuted = false;
let currentSection = 1;

// ===================================
// DOM Elements
// ===================================
const elements = {
    // Loading & Effects
    loadingScreen: document.getElementById('loadingScreen'),
    musicToggle: document.getElementById('musicToggle'),
    musicOnIcon: document.getElementById('musicOnIcon'),
    musicOffIcon: document.getElementById('musicOffIcon'),
    sparkleContainer: document.getElementById('sparkleContainer'),
    celebrationConfetti: document.getElementById('celebrationConfetti'),
    floatingHearts: document.getElementById('floatingHearts'),
    particles: document.getElementById('particles'),
    toast: document.getElementById('toast'),

    // Pages
    page1: document.getElementById('page1'),
    page2: document.getElementById('page2'),
    page3: document.getElementById('page3'),
    page4: document.getElementById('page4'),

    // Section 1 - Intro
    introContinueBtn: document.getElementById('introContinueBtn'),

    // Section 2 - Envelope
    envelopeWrapper: document.getElementById('envelopeWrapper'),
    envelope: document.getElementById('envelope'),
    openBtn: document.getElementById('openBtn'),

    // Section 3 - Letter
    letterText: document.getElementById('letterText'),
    letterSignature: document.getElementById('letterSignature'),
    letterImage: document.getElementById('letterImage'),
    letterContinueBtn: document.getElementById('letterContinueBtn'),

    // Section 4 - Finale
    counterValue: document.getElementById('counterValue'),
    loveMessage: document.getElementById('loveMessage'),
    copyLinkBtn: document.getElementById('copyLinkBtn'),
    shareBtn: document.getElementById('shareBtn'),

    // YouTube
    youtubePlayer: document.getElementById('youtubePlayer')
};

// ===================================
// Letter Content
// ===================================
const letterParagraphs = [
    'ماما…',
    '',
    'اليوم ليس مجرد يوم ميلاد…',
    'اليوم هو اليوم الذي أشرق فيه النور في حياتي…',
    '',
    '43 سنة وأنتِ تكبرين جمالًا في عيوني…',
    'وتكبرين فخرًا في قلبي…',
    '',
    'أنتِ الأمان حين أخاف…',
    'أنتِ الدعاء الذي يسبقني…',
    'أنتِ الحضن الذي يشبه الوطن…',
    '',
    'كل لحظة تعب مرّت عليكِ…',
    'كانت من أجلي…',
    '',
    'كل مرة ابتسمتِ لي…',
    'كنتِ تخفين خلفها تعبًا لم أشعر به…',
    '',
    'ماما…',
    'إن كان للحب مقياس…',
    'فحبّي لكِ يتجاوز كل الأرقام…',
    '',
    'كل عام وأنتِ نور حياتي…',
    'كل عام وأنتِ قلبي…',
    'كل عام وأنتِ بخير يا أغلى إنسانة في عمري 🤍'
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
        ytPlayer.setVolume(60);
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
        ytPlayer.setVolume(60);
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
// Page Transitions
// ===================================
function goToSection(fromPage, toPageNumber, callback) {
    fromPage.classList.remove('active');
    currentSection = toPageNumber;

    setTimeout(() => {
        const toPage = toPageNumber === 2 ? elements.page2 :
                       toPageNumber === 3 ? elements.page3 :
                       elements.page4;
        toPage.classList.add('active');

        if (callback) callback();
    }, 600);
}

// ===================================
// Effects
// ===================================
function createSparkles() {
    elements.sparkleContainer.innerHTML = '';
    elements.sparkleContainer.classList.add('active');

    const count = 40;
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 60 + '%';
            sparkle.style.backgroundColor = CONFIG.confettiColors[Math.floor(Math.random() * CONFIG.confettiColors.length)];
            sparkle.style.animationDelay = Math.random() * 0.3 + 's';
            elements.sparkleContainer.appendChild(sparkle);
        }, i * 30);
    }

    // Hide after 1.5 seconds
    setTimeout(() => {
        elements.sparkleContainer.classList.remove('active');
    }, 1500);
}

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

function createFloatingHearts() {
    const hearts = ['💕', '💖', '💗', '💝', '❤️'];

    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDelay = Math.random() * 3 + 's';
            heart.style.animationDuration = (10 + Math.random() * 5) + 's';
            elements.floatingHearts.appendChild(heart);
        }, i * 1500);
    }
}

function createParticles() {
    const particleCount = 15;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        elements.particles.appendChild(particle);
    }
}

// ===================================
// Letter Animation
// ===================================
async function animateLetter() {
    elements.letterText.innerHTML = '';

    for (let i = 0; i < letterParagraphs.length; i++) {
        const text = letterParagraphs[i];
        const para = document.createElement('p');

        if (text === '') {
            para.className = 'paragraph empty';
        } else {
            para.className = 'paragraph';
            para.textContent = text;
        }

        para.style.transitionDelay = (i * CONFIG.paragraphDelay / 1000) + 's';
        elements.letterText.appendChild(para);

        // Trigger animation
        await new Promise(resolve => setTimeout(resolve, 50));
    }

    // Show signature after all paragraphs
    setTimeout(() => {
        elements.letterSignature.classList.add('visible');
    }, letterParagraphs.length * CONFIG.paragraphDelay + 500);
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

            // Show love message
            elements.loveMessage.classList.add('visible');

            // Trigger celebration
            createCelebrationConfetti();
        } else {
            elements.counterValue.textContent = Math.floor(current) + '%';
        }
    }, 20);
}

// ===================================
// Section Handlers
// ===================================
function handleIntroContinue() {
    goToSection(elements.page1, 2);
}

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
        goToSection(elements.page2, 3, () => {
            // Start letter animation
            animateLetter();

            // Start counter after letter completes
            setTimeout(() => {
                animateCounter();
            }, letterParagraphs.length * CONFIG.paragraphDelay + 2000);
        });
    }, 1200);
}

function handleLetterContinue() {
    goToSection(elements.page3, 4);
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
        showToast('تم نسخ الرابط! 📋');
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
    }, 2800);
}

// ===================================
// Event Listeners
// ===================================
function initEventListeners() {
    // Section 1
    elements.introContinueBtn.addEventListener('click', handleIntroContinue);

    // Section 2
    elements.envelopeWrapper.addEventListener('click', handleEnvelopeOpen);
    elements.openBtn.addEventListener('click', handleEnvelopeOpen);

    // Section 3
    elements.letterContinueBtn.addEventListener('click', handleLetterContinue);

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
    // Create background effects
    createFloatingHearts();
    createParticles();

    // Initialize event listeners
    initEventListeners();

    // Hide loading screen after content loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            elements.loadingScreen.classList.add('hidden');
        }, 1000);
    });
}

// Start everything
document.addEventListener('DOMContentLoaded', init);
