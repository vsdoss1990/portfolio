// ====================
// BOOT LOADER SEQUENCE
// ====================
const bootMessages = [
    { text: '> ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM', delay: 100 },
    { text: '> COPYRIGHT 2025-2077 ROBCO INDUSTRIES', delay: 100 },
    { text: '> ', delay: 200 },
    { text: '> CHECKING SYSTEM INTEGRITY...', delay: 300 },
    { text: '> BIOS VERIFICATION...................[OK]', delay: 400, class: 'success' },
    { text: '> MEMORY TEST..........................[OK]', delay: 300, class: 'success' },
    { text: '> CPU DETECTION........................[OK]', delay: 300, class: 'success' },
    { text: '> ', delay: 200 },
    { text: '> LOADING SYSTEM MODULES...', delay: 300 },
    { text: '> KERNEL.SYS...........................[OK]', delay: 250, class: 'success' },
    { text: '> DRIVERS.SYS..........................[OK]', delay: 250, class: 'success' },
    { text: '> NETWORK.SYS..........................[OK]', delay: 250, class: 'success' },
    { text: '> SECURITY.SYS.........................[OK]', delay: 250, class: 'success' },
    { text: '> INTERFACE.SYS........................[OK]', delay: 250, class: 'success' },
    { text: '> ', delay: 200 },
    { text: '> INITIALIZING PERIPHERALS...', delay: 300 },
    { text: '> TERMINAL DISPLAY.....................[OK]', delay: 200, class: 'success' },
    { text: '> KEYBOARD INPUT.......................[OK]', delay: 200, class: 'success' },
    { text: '> AUDIO OUTPUT.........................[OK]', delay: 200, class: 'success' },
    { text: '> ', delay: 200 },
    { text: '> LOADING USER PROFILE...', delay: 300 },
    { text: '> USER: VIDHYASAGAR C. DOSS', delay: 300 },
    { text: '> ACCESS LEVEL: ADMINISTRATOR', delay: 300 },
    { text: '> ', delay: 300 },
    { text: '> SYSTEM INITIATED', delay: 500, class: 'success' },
    { text: '> ALL SYSTEMS STABLE', delay: 500, class: 'success' },
    { text: '> ', delay: 300 },
    { text: '> WELCOME TO THE TERMINAL', delay: 500, class: 'success' }
];

let bootMessageIndex = 0;
let bootProgress = 0;

function addBootMessage(message, className = '') {
    const bootConsole = document.getElementById('boot-console');
    if (!bootConsole) return;

    const line = document.createElement('div');
    line.className = `console-line ${className}`;
    line.textContent = message;
    bootConsole.appendChild(line);
    bootConsole.scrollTop = bootConsole.scrollHeight;
}

function updateProgress(percent) {
    const progressBar = document.getElementById('progress-bar');
    const progressPercent = document.getElementById('progress-percent');
    if (progressBar && progressPercent) {
        progressBar.style.width = percent + '%';
        progressPercent.textContent = Math.floor(percent) + '%';
    }
}

function showNextBootMessage() {
    if (bootMessageIndex >= bootMessages.length) {
        completeBootSequence();
        return;
    }

    const message = bootMessages[bootMessageIndex];
    addBootMessage(message.text, message.class || '');

    bootProgress = ((bootMessageIndex + 1) / bootMessages.length) * 100;
    updateProgress(bootProgress);

    bootMessageIndex++;

    setTimeout(showNextBootMessage, message.delay);
}

function completeBootSequence() {
    const bootStatus = document.getElementById('boot-status');
    if (bootStatus) {
        bootStatus.textContent = 'SYSTEM STABLE - LAUNCHING...';
    }

    setTimeout(() => {
        const bootLoader = document.getElementById('boot-loader');
        const mainTerminal = document.getElementById('main-terminal');

        if (bootLoader && mainTerminal) {
            bootLoader.classList.add('fade-out');
            setTimeout(() => {
                bootLoader.style.display = 'none';
                mainTerminal.style.display = 'block';

                // Request fullscreen after terminal loads
                requestFullscreenOnLoad();
            }, 1000);
        }
    }, 1000);
}

// Start boot sequence when page loads
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(showNextBootMessage, 500);

    // Try to start audio immediately
    setTimeout(() => {
        initializeAudio();
    }, 100);
});

// ====================
// TERMINAL CLOCK
// ====================
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
}

// Update clock every second
setInterval(updateClock, 1000);
updateClock();

// ====================
// SECTION NAVIGATION
// ====================
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.terminal-section');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Remove active class from all links and sections
        navLinks.forEach(l => l.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));

        // Add active class to clicked link
        link.classList.add('active');

        // Show corresponding section
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');

            // Scroll to terminal screen
            const terminalScreen = document.querySelector('.terminal-screen');
            terminalScreen.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ====================
// TYPING EFFECT FOR SUBTITLE
// ====================
const typingElement = document.querySelector('.typing-text');
if (typingElement) {
    const phrases = [
        '> PROTOTYPER | MAKER | PROBLEM SOLVER',
        '> I BUILD THINGS THAT WORK',
        '> CODE + MACHINES + ELECTRONICS',
        '> FROM IDEA TO WORKING PROTOTYPE'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing effect after page load
    setTimeout(type, 1500);
}

// ====================
// BOOT SEQUENCE ANIMATION
// ====================
const bootLines = document.querySelectorAll('.boot-line');
bootLines.forEach((line, index) => {
    line.style.opacity = '0';
    setTimeout(() => {
        line.style.transition = 'opacity 0.3s ease';
        line.style.opacity = '1';
    }, index * 300);
});

// ====================
// CONTACT FORM HANDLING
// ====================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Create mailto link
        const mailtoLink = `mailto:vsdoss1990@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
            `FROM: ${name}\nEMAIL: ${email}\n\nMESSAGE:\n${message}`
        )}`;

        // Open email client
        window.location.href = mailtoLink;

        // Show success message
        alert('>>> MESSAGE TRANSMISSION INITIATED\n>>> YOUR EMAIL CLIENT WILL OPEN');

        // Reset form
        contactForm.reset();
    });
}

// ====================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && !this.classList.contains('nav-link')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection && targetSection.classList.contains('terminal-section')) {
                // Remove active class from all sections and nav links
                sections.forEach(s => s.classList.remove('active'));
                navLinks.forEach(l => l.classList.remove('active'));

                // Add active class to target section
                targetSection.classList.add('active');

                // Add active class to corresponding nav link
                const correspondingNavLink = document.querySelector(`.nav-link[href="#${targetId}"]`);
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }

                // Scroll to terminal screen
                const terminalScreen = document.querySelector('.terminal-screen');
                if (terminalScreen) {
                    terminalScreen.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        }
    });
});

// ====================
// RANDOM GLITCH EFFECT
// ====================
function randomGlitch() {
    const glitchElements = document.querySelectorAll('.glitch');
    glitchElements.forEach(element => {
        if (Math.random() > 0.95) {
            element.style.textShadow = `
                ${Math.random() * 5}px ${Math.random() * 5}px rgba(0, 255, 65, 0.8),
                ${Math.random() * -5}px ${Math.random() * -5}px rgba(255, 170, 0, 0.8)
            `;
            setTimeout(() => {
                element.style.textShadow = '0 0 5px rgba(0, 255, 65, 0.7)';
            }, 100);
        }
    });
}

// Random glitch every few seconds
setInterval(randomGlitch, 3000);

// ====================
// CRT FLICKER EFFECT (SUBTLE)
// ====================
function subtleFlicker() {
    const terminalScreen = document.querySelector('.terminal-screen');
    if (terminalScreen && Math.random() > 0.98) {
        terminalScreen.style.opacity = '0.95';
        setTimeout(() => {
            terminalScreen.style.opacity = '1';
        }, 50);
    }
}

setInterval(subtleFlicker, 2000);

// ====================
// STAT BAR ANIMATION ON SCROLL
// ====================
const statBars = document.querySelectorAll('.stat-bar');

const observerOptions = {
    threshold: 0.5
};

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'none';
            setTimeout(() => {
                entry.target.style.animation = '';
            }, 10);
        }
    });
}, observerOptions);

statBars.forEach(bar => {
    statObserver.observe(bar);
});

// ====================
// AUDIO CONTROL SYSTEM
// ====================
let staticNoiseNode = null;
let staticGainNode = null;
let audioContext = null;
let muteState = 0; // 0: all on, 1: static muted, 2: all muted
let buttonSoundsEnabled = true;

function createStaticNoise() {
    if (staticNoiseNode) return; // Already created

    try {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }

        // Resume context if suspended
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }

        // Create buffer for white noise
        const bufferSize = audioContext.sampleRate * 2;
        const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);

        // Generate white noise with some variations for radio static effect
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }

        // Create buffer source
        staticNoiseNode = audioContext.createBufferSource();
        staticNoiseNode.buffer = noiseBuffer;
        staticNoiseNode.loop = true;

        // Create gain node for volume control
        staticGainNode = audioContext.createGain();
        staticGainNode.gain.value = 0.02; // Very low volume for background ambience

        // Create a filter to make it sound more like radio static
        const bandpassFilter = audioContext.createBiquadFilter();
        bandpassFilter.type = 'bandpass';
        bandpassFilter.frequency.value = 2000;
        bandpassFilter.Q.value = 0.5;

        // Connect the nodes
        staticNoiseNode.connect(bandpassFilter);
        bandpassFilter.connect(staticGainNode);
        staticGainNode.connect(audioContext.destination);

        // Start the static noise
        staticNoiseNode.start();

    } catch (e) {
        console.log('Audio context not available:', e);
    }
}

// ====================
// TERMINAL STARTUP SOUND AND STATIC
// ====================
function initializeAudio() {
    try {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }

        // Start static noise immediately
        if (!staticNoiseNode) {
            createStaticNoise();
        }

        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);

    } catch (e) {
        console.log('Audio context not available');
    }
}

// Try to initialize audio on page load
window.addEventListener('DOMContentLoaded', () => {
    initializeAudio();
});

// Also try on first user interaction (for browsers with strict autoplay policies)
let audioInitialized = false;
const initAudioOnInteraction = () => {
    if (!audioInitialized) {
        audioInitialized = true;
        if (audioContext && audioContext.state === 'suspended') {
            audioContext.resume();
        }
        if (!staticNoiseNode) {
            createStaticNoise();
        }
    }
};

document.addEventListener('click', initAudioOnInteraction, { once: true });
document.addEventListener('keydown', initAudioOnInteraction, { once: true });

// ====================
// MUTE TOGGLE (TWO-STAGE)
// ====================
function toggleMute() {
    const muteBtn = document.getElementById('mute-toggle');
    const muteIcon = document.getElementById('mute-icon');
    const muteText = document.getElementById('mute-text');

    muteState = (muteState + 1) % 3;

    switch(muteState) {
        case 0: // All audio on
            if (staticGainNode) {
                staticGainNode.gain.value = 0.02;
            }
            buttonSoundsEnabled = true;
            if (muteIcon) muteIcon.className = 'fas fa-volume-up';
            if (muteText) muteText.textContent = 'AUDIO: ON';
            if (muteBtn) muteBtn.classList.remove('muted');
            break;

        case 1: // Static muted, buttons still on
            if (staticGainNode) {
                staticGainNode.gain.value = 0;
            }
            buttonSoundsEnabled = true;
            if (muteIcon) muteIcon.className = 'fas fa-volume-down';
            if (muteText) muteText.textContent = 'STATIC: OFF';
            if (muteBtn) muteBtn.classList.add('muted');
            break;

        case 2: // All audio muted
            if (staticGainNode) {
                staticGainNode.gain.value = 0;
            }
            buttonSoundsEnabled = false;
            if (muteIcon) muteIcon.className = 'fas fa-volume-mute';
            if (muteText) muteText.textContent = 'AUDIO: OFF';
            if (muteBtn) muteBtn.classList.add('muted');
            break;
    }
}

// Add event listener to mute button
const muteBtn = document.getElementById('mute-toggle');
if (muteBtn) {
    muteBtn.addEventListener('click', toggleMute);
}

// ====================
// FULLSCREEN TOGGLE
// ====================
function toggleFullscreen() {
    const elem = document.documentElement;
    const icon = document.getElementById('fullscreen-icon');
    const textElem = document.getElementById('fullscreen-text');

    if (!document.fullscreenElement) {
        // Enter fullscreen
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
        if (icon) {
            icon.className = 'fas fa-compress';
        }
        if (textElem) {
            textElem.textContent = 'EXIT FULLSCREEN';
        }
    } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        if (icon) {
            icon.className = 'fas fa-expand';
        }
        if (textElem) {
            textElem.textContent = 'FULLSCREEN';
            textElem.style.display = 'none';
        }
    }
}

// Add event listener to fullscreen button
const fullscreenBtn = document.getElementById('fullscreen-toggle');
if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', toggleFullscreen);
}

// Update icon and text when fullscreen changes (e.g., user presses ESC)
function updateFullscreenIcon() {
    const icon = document.getElementById('fullscreen-icon');
    const textElem = document.getElementById('fullscreen-text');

    if (icon) {
        if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
            icon.className = 'fas fa-compress';
            if (textElem) {
                textElem.textContent = 'EXIT FULLSCREEN';
            }
        } else {
            icon.className = 'fas fa-expand';
            if (textElem) {
                textElem.textContent = 'FULLSCREEN';
                textElem.style.display = 'none';
            }
        }
    }
}

document.addEventListener('fullscreenchange', updateFullscreenIcon);
document.addEventListener('webkitfullscreenchange', updateFullscreenIcon);
document.addEventListener('msfullscreenchange', updateFullscreenIcon);

// Request fullscreen on page load (after boot sequence completes)
function requestFullscreenOnLoad() {
    const elem = document.documentElement;
    const icon = document.getElementById('fullscreen-icon');
    const textElem = document.getElementById('fullscreen-text');

    const doFullscreen = () => {
        if (elem.requestFullscreen) {
            elem.requestFullscreen().then(() => {
                if (icon) icon.className = 'fas fa-compress';

                // Show "EXIT FULLSCREEN" text after 5 seconds
                setTimeout(() => {
                    if (textElem && document.fullscreenElement) {
                        textElem.textContent = 'EXIT FULLSCREEN';
                        textElem.style.display = 'inline';
                    }
                }, 5000);
            }).catch(err => {
                console.log('Fullscreen request failed:', err);
            });
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
            if (icon) icon.className = 'fas fa-compress';

            // Show text after 5 seconds
            setTimeout(() => {
                if (textElem && (document.fullscreenElement || document.webkitFullscreenElement)) {
                    textElem.textContent = 'EXIT FULLSCREEN';
                    textElem.style.display = 'inline';
                }
            }, 5000);
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
            if (icon) icon.className = 'fas fa-compress';

            // Show text after 5 seconds
            setTimeout(() => {
                if (textElem && (document.fullscreenElement || document.msFullscreenElement)) {
                    textElem.textContent = 'EXIT FULLSCREEN';
                    textElem.style.display = 'inline';
                }
            }, 5000);
        }
    };

    // Try immediately
    doFullscreen();
}

// Also add fullscreen listener on any interaction
let fullscreenAttempted = false;
function attemptFullscreenOnInteraction() {
    if (!fullscreenAttempted && !document.fullscreenElement) {
        fullscreenAttempted = true;
        requestFullscreenOnLoad();
    }
}

document.addEventListener('click', attemptFullscreenOnInteraction, { once: true });
document.addEventListener('keydown', attemptFullscreenOnInteraction, { once: true });

// ====================
// CONSOLE EASTER EGG
// ====================
console.log('%c>>> ROBCO INDUSTRIES TERMINAL', 'color: #00ff41; font-size: 20px; font-family: monospace;');
console.log('%c>>> SYSTEM VERSION 4.5', 'color: #00cc33; font-size: 14px; font-family: monospace;');
console.log('%c>>> WELCOME, USER', 'color: #ffaa00; font-size: 14px; font-family: monospace;');
console.log('%c>>> FOR COLLABORATION: VSDOSS1990@GMAIL.COM', 'color: #00ff41; font-size: 12px; font-family: monospace;');

// ====================
// PREVENT DRAG ON IMAGES
// ====================
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('dragstart', (e) => e.preventDefault());
});

// ====================
// TERMINAL BEEP ON BUTTON CLICK
// ====================
function playClickBeep() {
    if (!buttonSoundsEnabled) return; // Skip if button sounds are muted

    try {
        const clickAudioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = clickAudioContext.createOscillator();
        const gainNode = clickAudioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(clickAudioContext.destination);

        oscillator.frequency.value = 600;
        oscillator.type = 'square';

        gainNode.gain.setValueAtTime(0.05, clickAudioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, clickAudioContext.currentTime + 0.05);

        oscillator.start(clickAudioContext.currentTime);
        oscillator.stop(clickAudioContext.currentTime + 0.05);
    } catch (e) {
        // Audio context not available
    }
}

document.querySelectorAll('.terminal-button, .nav-link').forEach(button => {
    button.addEventListener('click', function(e) {
        playClickBeep();

        // Visual feedback
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 100);
    });
});

// ====================
// PAGE LOAD ANIMATION
// ====================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ====================
// ACCESSIBILITY: KEYBOARD NAVIGATION
// ====================
document.addEventListener('keydown', (e) => {
    // Tab through navigation with arrow keys
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const activeNav = document.querySelector('.nav-link.active');
        if (activeNav) {
            const navArray = Array.from(navLinks);
            const currentIndex = navArray.indexOf(activeNav);
            let newIndex;

            if (e.key === 'ArrowRight') {
                newIndex = (currentIndex + 1) % navArray.length;
            } else {
                newIndex = (currentIndex - 1 + navArray.length) % navArray.length;
            }

            navArray[newIndex].click();
        }
    }
});
