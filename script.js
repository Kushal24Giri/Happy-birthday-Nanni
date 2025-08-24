/* ========================================
   BIRTHDAY WEBSITE JAVASCRIPT
   ======================================== */

// 🎯 EASY CUSTOMIZATION - Edit these values
const TARGET_TIME = { hour: 0, minute: 0 }; // 🎯 Countdown to midnight (12:00 AM)
const OWNER_NAME = "Your Name"; // 🎯 Change to your name
const FRIEND_NAME = "Nandini"; // 🎯 Change if needed

// 🎂 Birthday Wishes for the Generator
const BIRTHDAY_WISHES = [
    "May your day be filled with laughter, love, and endless joy! 🎉",
    "Wishing you a year ahead that's as amazing and beautiful as you are! ✨",
    "May all your dreams take flight and your heart be light on this special day! 🦋",
    "Here's to another year of being absolutely fabulous! You deserve the world! 🌟",
    "May your birthday be the beginning of a year filled with good luck, good health, and much happiness! 🍀",
    "Wishing you a day that's just as special and wonderful as you are! 🎂",
    "May your birthday bring you all the happiness your heart can hold! 💝",
    "Here's to celebrating the incredible person you are and all the amazing things you do! 🎊",
    "May your special day be filled with love, laughter, and all the things that make you smile! 😊",
    "Wishing you a birthday that's as bright and beautiful as your spirit! 🌈"
];

// 🎵 Audio Management
let autoplayAttempted = false;
let musicMonitorInterval = null;

// 🎆 Animation Management
let confettiAnimation = null;
let fireworksAnimation = null;

// 🖼️ Gallery Management
let currentImageIndex = 0;
let galleryImages = [];

// 🧠 Memory Wall Management
let clientId = generateClientId();

// 🎨 Theme Management
let currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// ========================================
// INITIALIZATION
// ========================================

(function() {
    'use strict';
    
    // Initialize everything when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM loaded, starting initialization...');
        
        initializeTheme();
        initializeCountdown();
        initializeMusic();
        initializeGallery();
        initializeWishGenerator();
        initializeConfetti();
        initializeEventListeners();
        
        // Debug theme state
        console.log('Final theme state:', currentTheme);
        console.log('HTML data-theme:', document.documentElement.getAttribute('data-theme'));
        console.log('Body data-theme:', document.body.getAttribute('data-theme'));
        
        // Add theme info to page for debugging
        addThemeDebugInfo();
        
        console.log('🎂 Birthday website loaded successfully!');
    });
})();

// ========================================
// THEME MANAGEMENT
// ========================================

function initializeTheme() {
    console.log('Initializing theme:', currentTheme);
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
    
    // Apply theme to body as well for better compatibility
    document.body.setAttribute('data-theme', currentTheme);
}

function toggleTheme() {
    console.log('Toggling theme from:', currentTheme);
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    console.log('New theme:', currentTheme);
    
    // Apply theme to both html and body elements
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.body.setAttribute('data-theme', currentTheme);
    
    // Save to localStorage
    localStorage.setItem('theme', currentTheme);
    
    // Update the icon
    updateThemeIcon();
    
    // Force a repaint to ensure theme changes are applied
    document.body.offsetHeight;
    
    console.log('Theme toggle completed');
}

function updateThemeIcon() {
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        const newIcon = currentTheme === 'light' ? '🌙' : '☀️';
        themeIcon.textContent = newIcon;
        console.log('Theme icon updated to:', newIcon, 'for theme:', currentTheme);
        
        // Add visual indicator to the button
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.setAttribute('data-current-theme', currentTheme);
            themeToggle.style.border = currentTheme === 'dark' ? '2px solid #fff' : '2px solid #000';
        }
    } else {
        console.warn('Theme icon element not found');
    }
}

// ========================================
// COUNTDOWN TIMER
// ========================================

function initializeCountdown() {
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    const now = new Date();
    
    // Set target time to 11:30 AM today
    const targetTime = new Date(now);
    targetTime.setHours(TARGET_TIME.hour, TARGET_TIME.minute, 0, 0);
    
    // If 11:30 AM has passed today, set to tomorrow
    if (now > targetTime) {
        targetTime.setDate(targetTime.getDate() + 1);
    }
    
    const timeDifference = targetTime - now;
    
    if (timeDifference <= 0) {
        // It's 11:30 AM! 🎂
        showBirthdayMessage();
        triggerFireworks();
    } else {
        // Calculate time units
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        
        // Update display
        updateCountdownDisplay(days, hours, minutes, seconds);
    }
}

function updateCountdownDisplay(days, hours, minutes, seconds) {
    const countdownTimer = document.getElementById('countdownTimer');
    const countdownMessage = document.getElementById('countdownMessage');
    
    if (countdownTimer && countdownMessage) {
        countdownTimer.style.display = 'flex';
        countdownMessage.style.display = 'none';
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
}

function showBirthdayMessage() {
    const countdownTimer = document.getElementById('countdownTimer');
    const countdownMessage = document.getElementById('countdownMessage');
    
    if (countdownTimer && countdownMessage) {
        countdownTimer.style.display = 'none';
        countdownMessage.style.display = 'block';
    }
}

// ========================================
// MUSIC MANAGEMENT
// ========================================

function initializeMusic() {
    const audio = document.getElementById('birthdayAudio');
    if (audio) {
        audio.volume = 0.5;
        audio.loop = true; // Ensure looping is enabled
        
        // Handle audio errors
        audio.addEventListener('error', function() {
            console.warn('Audio file not found. Please add birthday-song.mp3 to assets/audio/ folder');
        });
        
        // Handle when audio ends or pauses unexpectedly
        audio.addEventListener('ended', function() {
            console.log('Audio ended, restarting...');
            audio.play().catch(function(error) {
                console.log('Restart failed:', error);
            });
        });
        
        audio.addEventListener('pause', function() {
            console.log('Audio paused, resuming...');
            setTimeout(() => {
                audio.play().catch(function(error) {
                    console.log('Resume failed:', error);
                });
            }, 100);
        });
        
        // Start playing music automatically on first user interaction
        document.addEventListener('click', function startMusic() {
            if (!autoplayAttempted) {
                autoplayAttempted = true;
                startContinuousMusic();
                document.removeEventListener('click', startMusic);
            }
        }, { once: true });
        
        // Also try on scroll
        document.addEventListener('scroll', function startMusic() {
            if (!autoplayAttempted) {
                autoplayAttempted = true;
                startContinuousMusic();
                document.removeEventListener('scroll', startMusic);
            }
        }, { once: true });
        
        // Try to start music after a delay
        setTimeout(() => {
            if (!autoplayAttempted) {
                startContinuousMusic();
            }
        }, 3000);
        
        // Add event listeners for better audio handling
        document.addEventListener('visibilitychange', handleVisibilityChange);
        document.addEventListener('focus', handleAudioContextState);
        window.addEventListener('focus', handleAudioContextState);
    }
}

function startContinuousMusic() {
    const audio = document.getElementById('birthdayAudio');
    if (!audio) return;
    
    // Function to ensure music keeps playing
    function ensureMusicPlaying() {
        if (audio.paused && !document.hidden) {
            console.log('Music stopped, restarting...');
            audio.play().catch(function(error) {
                console.log('Restart failed:', error);
                // Try again after a short delay
                setTimeout(ensureMusicPlaying, 1000);
            });
        }
    }
    
    // Start playing
    audio.play().then(() => {
        console.log('Music started successfully');
        // Set up periodic checks to ensure music keeps playing
        if (musicMonitorInterval) {
            clearInterval(musicMonitorInterval);
        }
        musicMonitorInterval = setInterval(ensureMusicPlaying, 2000);
    }).catch(function(error) {
        console.log('Initial play failed:', error);
        // Try again after user interaction
        document.addEventListener('click', function() {
            audio.play().catch(console.log);
        }, { once: true });
    });
}

// Handle page visibility changes
function handleVisibilityChange() {
    const audio = document.getElementById('birthdayAudio');
    if (!audio) return;
    
    if (document.hidden) {
        // Page is hidden, pause music to save resources
        audio.pause();
    } else {
        // Page is visible again, resume music
        if (autoplayAttempted) {
            audio.play().catch(console.log);
        }
    }
}

// Handle audio context suspension
function handleAudioContextState() {
    const audio = document.getElementById('birthdayAudio');
    if (!audio) return;
    
    // If audio context is suspended, try to resume
    if (audio.context && audio.context.state === 'suspended') {
        audio.context.resume().then(() => {
            console.log('Audio context resumed');
            if (autoplayAttempted && audio.paused) {
                audio.play().catch(console.log);
            }
        });
    }
}

// Add theme debug information to the page
function addThemeDebugInfo() {
    const debugDiv = document.createElement('div');
    debugDiv.className = 'debug-panel';
    
    debugDiv.innerHTML = `
        <div><strong>Theme Debug Panel</strong></div>
        <div>Current Theme: <span id="debug-theme">${currentTheme}</span></div>
        <div>HTML Attribute: <span id="debug-html-theme">${document.documentElement.getAttribute('data-theme')}</span></div>
        <div>Body Attribute: <span id="debug-body-theme">${document.body.getAttribute('data-theme')}</span></div>
        <button onclick="testThemeToggle()">Test Theme Toggle</button>
        <button onclick="forceLightTheme()">Force Light</button>
        <button onclick="forceDarkTheme()">Force Dark</button>
    `;
    
    document.body.appendChild(debugDiv);
    
    // Update debug info when theme changes
    const updateDebugInfo = () => {
        const themeSpan = document.getElementById('debug-theme');
        const htmlSpan = document.getElementById('debug-html-theme');
        const bodySpan = document.getElementById('debug-body-theme');
        
        if (themeSpan) themeSpan.textContent = currentTheme;
        if (htmlSpan) htmlSpan.textContent = document.documentElement.getAttribute('data-theme');
        if (bodySpan) bodySpan.textContent = document.body.getAttribute('data-theme');
    };
    
    // Store the original function
    window.originalToggleTheme = toggleTheme;
    
    // Override toggleTheme to update debug info
    window.toggleTheme = function() {
        console.log('Toggle theme called from debug panel');
        window.originalToggleTheme();
        updateDebugInfo();
    };
    
    // Test functions
    window.testThemeToggle = function() {
        console.log('Testing theme toggle...');
        toggleTheme();
    };
    
    window.forceLightTheme = function() {
        console.log('Forcing light theme...');
        currentTheme = 'light';
        document.documentElement.setAttribute('data-theme', 'light');
        document.body.setAttribute('data-theme', 'light');
        updateThemeIcon();
        updateDebugInfo();
        console.log('Light theme forced');
    };
    
    window.forceDarkTheme = function() {
        console.log('Forcing dark theme...');
        currentTheme = 'dark';
        document.documentElement.setAttribute('data-theme', 'dark');
        document.body.setAttribute('data-theme', 'dark');
        updateThemeIcon();
        updateDebugInfo();
        console.log('Dark theme forced');
    };
}

// Test function for the hero button
window.testThemeSystem = function() {
    console.log('=== THEME SYSTEM TEST ===');
    console.log('Current theme variable:', currentTheme);
    console.log('HTML data-theme:', document.documentElement.getAttribute('data-theme'));
    console.log('Body data-theme:', document.body.getAttribute('data-theme'));
    console.log('Theme toggle button:', document.getElementById('themeToggle'));
    console.log('Theme icon element:', document.querySelector('.theme-icon'));
    
    // Test the toggle function
    console.log('Testing toggleTheme function...');
    toggleTheme();
    
    // Show alert with current state
    setTimeout(() => {
        alert(`Theme test completed!\nCurrent theme: ${currentTheme}\nHTML: ${document.documentElement.getAttribute('data-theme')}\nBody: ${document.body.getAttribute('data-theme')}`);
    }, 100);
};







// ========================================
// GALLERY MODAL
// ========================================

function initializeGallery() {
    // Get all gallery images and videos
    const galleryImages = document.querySelectorAll('.gallery-item img');
    const galleryVideos = document.querySelectorAll('.gallery-item video');
    
    // Combine all media sources for modal
    const imageSources = Array.from(galleryImages).map(img => img.src);
    const videoSources = Array.from(galleryVideos).map(video => video.src);
    galleryImages = [...imageSources, ...videoSources];
    
    // Add click event to images to open modal
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => openModal(index));
    });
    
    // Initialize all videos for auto-play and loop
    initializeGalleryVideos();
}

function initializeGalleryVideos() {
    const videos = document.querySelectorAll('.gallery-item video');
    
    videos.forEach((video, index) => {
        // Ensure video has all required attributes
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.preload = 'metadata';
        
        // Handle video loading and autoplay
        video.addEventListener('loadedmetadata', function() {
            console.log(`Video ${index + 1} loaded, starting autoplay...`);
            video.play().catch(function(error) {
                console.log(`Video ${index + 1} autoplay failed:`, error);
                // Show play button if autoplay fails
                showVideoPlayButton(video);
            });
        });
        
        // Handle video errors
        video.addEventListener('error', function() {
            console.log(`Video ${index + 1} loading error`);
            showVideoError(video);
        });
        
        // Ensure video continues playing when scrolled into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play().catch(() => {});
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(video);
        
        // Handle video pause/play to ensure looping
        video.addEventListener('ended', function() {
            video.currentTime = 0;
            video.play().catch(console.log);
        });
        
        video.addEventListener('pause', function() {
            // Only auto-resume if it's not intentionally paused
            if (!video.paused && !document.hidden) {
                setTimeout(() => {
                    video.play().catch(console.log);
                }, 100);
            }
        });
    });
}

function openModal(index) {
    const modal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    
    if (modal && modalImage) {
        currentImageIndex = index;
        const mediaSrc = galleryImages[index];
        
        // Check if it's a video or image
        if (mediaSrc.includes('.mp4') || mediaSrc.includes('.webm') || mediaSrc.includes('.mov')) {
            // It's a video, replace img with video
            const video = document.createElement('video');
            video.src = mediaSrc;
            video.autoplay = true;
            video.loop = true;
            video.muted = true;
            video.playsInline = true;
            video.controls = true; // Show controls in modal
            video.className = 'modal-image';
            
            modalImage.parentNode.replaceChild(video, modalImage);
            modalImage = video; // Update reference
        } else {
            // It's an image, ensure img element exists
            if (!modalImage.tagName || modalImage.tagName.toLowerCase() !== 'img') {
                const img = document.createElement('img');
                img.id = 'modalImage';
                img.className = 'modal-image';
                modalImage.parentNode.replaceChild(img, modalImage);
                modalImage = img;
            }
            modalImage.src = mediaSrc;
            modalImage.alt = `Gallery media ${index + 1}`;
        }
        
        modal.classList.add('show');
        modal.style.display = 'flex';
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('galleryModal');
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

function navigateModal(direction) {
    if (direction === 'next') {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    } else {
        currentImageIndex = currentImageIndex === 0 ? galleryImages.length - 1 : currentImageIndex - 1;
    }
    
    const modalImage = document.getElementById('modalImage');
    if (modalImage) {
        const mediaSrc = galleryImages[currentImageIndex];
        
        // Check if it's a video or image
        if (mediaSrc.includes('.mp4') || mediaSrc.includes('.webm') || mediaSrc.includes('.mov')) {
            // It's a video, replace current element with video
            const video = document.createElement('video');
            video.src = mediaSrc;
            video.autoplay = true;
            video.loop = true;
            video.muted = true;
            video.playsInline = true;
            video.controls = true;
            video.className = 'modal-image';
            
            modalImage.parentNode.replaceChild(video, modalImage);
        } else {
            // It's an image, ensure img element exists
            if (!modalImage.tagName || modalImage.tagName.toLowerCase() !== 'img') {
                const img = document.createElement('img');
                img.id = 'modalImage';
                img.className = 'modal-image';
                modalImage.parentNode.replaceChild(img, modalImage);
                modalImage = img;
            }
            modalImage.src = mediaSrc;
            modalImage.alt = `Gallery media ${currentImageIndex + 1}`;
        }
    }
}

// ========================================
// MEMORY WALL
// ========================================

function initializeMemoryWall() {
    loadMemories();
    
    // Handle form submission
    const memoryForm = document.querySelector('.memory-form');
    if (memoryForm) {
        memoryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addMemory();
        });
    }
    
    // Handle media type changes
    const mediaTypeRadios = document.querySelectorAll('input[name="mediaType"]');
    mediaTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updateMediaInputAccept();
        });
    });
    
    // Initialize media input
    updateMediaInputAccept();
}

function updateMediaInputAccept() {
    const mediaInput = document.getElementById('memoryMedia');
    const selectedType = document.querySelector('input[name="mediaType"]:checked').value;
    
    if (selectedType === 'video') {
        mediaInput.accept = 'video/*';
        mediaInput.placeholder = 'Choose a video file (MP4, WebM, etc.)';
    } else {
        mediaInput.accept = 'image/*';
        mediaInput.placeholder = 'Choose an image file (JPG, PNG, GIF, etc.)';
    }
}

function addMemory() {
    const nameInput = document.getElementById('memoryName');
    const messageInput = document.getElementById('memoryMessage');
    const mediaInput = document.getElementById('memoryMedia');
    const mediaTypeRadios = document.querySelectorAll('input[name="mediaType"]');
    
    if (!nameInput.value.trim() || !messageInput.value.trim()) {
        alert('Please fill in both name and message fields.');
        return;
    }
    
    const memory = {
        id: Date.now(),
        name: nameInput.value.trim(),
        message: messageInput.value.trim(),
        timestamp: new Date().toISOString(),
        clientId: clientId,
        media: null,
        mediaType: null
    };
    
    // Handle media upload
    if (mediaInput.files && mediaInput.files[0]) {
        const file = mediaInput.files[0];
        const selectedMediaType = Array.from(mediaTypeRadios).find(radio => radio.checked)?.value;
        
        if (file && selectedMediaType) {
            const reader = new FileReader();
            reader.onload = function(e) {
                memory.media = e.target.result;
                memory.mediaType = selectedMediaType;
                memory.fileName = file.name;
                memory.fileSize = file.size;
                
                // Save memory with media
                saveMemory(memory);
            };
            reader.readAsDataURL(file);
        }
    } else {
        // Save memory without media
        saveMemory(memory);
    }
}

function saveMemory(memory) {
    // Add to localStorage
    const memories = getMemories();
    memories.unshift(memory);
    localStorage.setItem('birthdayMemories', JSON.stringify(memories));
    
    // Clear form
    document.getElementById('memoryName').value = '';
    document.getElementById('memoryMessage').value = '';
    document.getElementById('memoryMedia').value = '';
    
    // Refresh display
    loadMemories();
    
    // Show success message
    const mediaText = memory.media ? ` with ${memory.mediaType === 'video' ? 'video' : 'photo'}` : '';
    showNotification(`Memory added successfully${mediaText}! 💝`);
}

function loadMemories() {
    const memories = getMemories();
    const memoryList = document.getElementById('memoryList');
    
    if (memoryList) {
        memoryList.innerHTML = '';
        
        if (memories.length === 0) {
            memoryList.innerHTML = '<p class="no-memories">No memories yet. Be the first to share! 💭</p>';
            return;
        }
        
        memories.forEach(memory => {
            const memoryElement = createMemoryElement(memory);
            memoryList.appendChild(memoryElement);
        });
    }
}

function createMemoryElement(memory) {
    const div = document.createElement('div');
    div.className = 'memory-item';
    
    const time = new Date(memory.timestamp).toLocaleString();
    
    let mediaHtml = '';
    if (memory.media) {
        if (memory.mediaType === 'video') {
            mediaHtml = `
                <div class="memory-media">
                    <video autoplay loop muted playsinline preload="metadata">
                        <source src="${memory.media}" type="video/mp4">
                        Your browser does not support video playback.
                    </video>
                </div>
            `;
        } else {
            mediaHtml = `
                <div class="memory-media">
                    <img src="${memory.media}" alt="Memory photo" loading="lazy">
                </div>
            `;
        }
    }
    
    const fileInfo = memory.fileName ? `
        <div class="memory-stats">
            <span class="memory-stat">
                📁 ${escapeHtml(memory.fileName)}
            </span>
            <span class="memory-stat">
                📏 ${formatFileSize(memory.fileSize)}
            </span>
        </div>
    ` : '';
    
    div.innerHTML = `
        <div class="memory-header">
            <span class="memory-author">${escapeHtml(memory.name)}</span>
            <span class="memory-time">${time}</span>
        </div>
        <div class="memory-text">${escapeHtml(memory.message)}</div>
        ${mediaHtml}
        ${fileInfo}
        <div class="memory-actions">
            <button class="memory-action-btn" onclick="likeMemory(${memory.id})" title="Like this memory">
                ❤️ <span class="like-count">${memory.likes || 0}</span>
            </button>
            <button class="memory-action-btn" onclick="shareMemory(${memory.id})" title="Share this memory">
                📤 Share
            </button>
        </div>
    `;
    
    // Initialize video autoplay after DOM insertion
    if (memory.media && memory.mediaType === 'video') {
        setTimeout(() => {
            const video = div.querySelector('video');
            if (video) {
                initializeVideoAutoplay(video);
            }
        }, 100);
    }
    
    return div;
}

function initializeVideoAutoplay(video) {
    // Ensure video autoplays and loops
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    
    // Handle video loading
    video.addEventListener('loadedmetadata', function() {
        video.play().catch(function(error) {
            console.log('Video autoplay failed:', error);
            // Fallback: show play button
            showVideoPlayButton(video);
        });
    });
    
    // Handle video errors
    video.addEventListener('error', function() {
        console.log('Video loading error');
        showVideoError(video);
    });
    
    // Ensure video continues playing when scrolled into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                video.play().catch(() => {});
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(video);
}

function showVideoPlayButton(video) {
    const playButton = document.createElement('button');
    playButton.className = 'video-play-btn';
    playButton.innerHTML = '▶️ Play';
    playButton.onclick = () => video.play();
    
    video.parentNode.appendChild(playButton);
}

function showVideoError(video) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'video-error';
    errorDiv.innerHTML = '❌ Video could not be loaded';
    
    video.parentNode.appendChild(errorDiv);
}

function getMemories() {
    try {
        const memories = localStorage.getItem('birthdayMemories');
        return memories ? JSON.parse(memories) : [];
    } catch (error) {
        console.error('Error loading memories:', error);
        return [];
    }
}

function clearMyMemories() {
    const memories = getMemories();
    const filteredMemories = memories.filter(memory => memory.clientId !== clientId);
    
    localStorage.setItem('birthdayMemories', JSON.stringify(filteredMemories));
    loadMemories();
    
    showNotification('Your messages have been cleared! 🗑️');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function likeMemory(memoryId) {
    const memories = getMemories();
    const memoryIndex = memories.findIndex(m => m.id === memoryId);
    
    if (memoryIndex !== -1) {
        if (!memories[memoryIndex].likes) {
            memories[memoryIndex].likes = 0;
        }
        memories[memoryIndex].likes++;
        localStorage.setItem('birthdayMemories', JSON.stringify(memories));
        loadMemories(); // Refresh to show updated like count
    }
}

function shareMemory(memoryId) {
    const memories = getMemories();
    const memory = memories.find(m => m.id === memoryId);
    
    if (memory) {
        const shareText = `${memory.name} shared: "${memory.message}"`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Birthday Memory',
                text: shareText,
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                showNotification('Memory copied to clipboard! 📋');
            }).catch(() => {
                showNotification('Share feature not available on this device');
            });
        }
    }
}

// ========================================
// WISH GENERATOR
// ========================================

function initializeWishGenerator() {
    // Initial wish
    generateWish();
}

function generateWish() {
    const wishCard = document.getElementById('wishCard');
    const wishText = wishCard.querySelector('.wish-text');
    
    if (wishCard && wishText) {
        // Add animation
        wishCard.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            // Select random wish
            const randomWish = BIRTHDAY_WISHES[Math.floor(Math.random() * BIRTHDAY_WISHES.length)];
            wishText.textContent = randomWish;
            
            // Restore scale
            wishCard.style.transform = 'scale(1)';
        }, 150);
    }
}

// ========================================
// ANIMATIONS
// ========================================

function initializeConfetti() {
    // Start confetti animation on page load
    setTimeout(() => {
        startConfetti();
    }, 1000);
}

function startConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confetti = [];
    const confettiCount = 100;
    
    // Create confetti pieces
    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            w: Math.random() * 10 + 5,
            h: Math.random() * 4 + 2,
            vx: Math.random() * 3 - 1.5,
            vy: Math.random() * 3 + 1,
            color: getRandomColor(),
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 10 - 5
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confetti.forEach((piece, index) => {
            // Update position
            piece.x += piece.vx;
            piece.y += piece.vy;
            piece.rotation += piece.rotationSpeed;
            
            // Remove if off screen
            if (piece.y > canvas.height + 100) {
                confetti.splice(index, 1);
            }
            
            // Draw confetti
            ctx.save();
            ctx.translate(piece.x, piece.y);
            ctx.rotate(piece.rotation * Math.PI / 180);
            ctx.fillStyle = piece.color;
            ctx.fillRect(-piece.w/2, -piece.h/2, piece.w, piece.h);
            ctx.restore();
        });
        
        if (confetti.length > 0) {
            confettiAnimation = requestAnimationFrame(animate);
        }
    }
    
    animate();
}

function triggerFireworks() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const fireworks = [];
    const particles = [];
    
    function createFirework(x, y) {
        const particleCount = 50;
        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = Math.random() * 5 + 2;
            
            particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                life: 100,
                color: getRandomColor(),
                size: Math.random() * 3 + 1
            });
        }
    }
    
    function animateFireworks() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        for (let i = particles.length - 1; i >= 0; i--) {
            const particle = particles[i];
            
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.1; // gravity
            particle.life--;
            
            if (particle.life <= 0) {
                particles.splice(i, 1);
                continue;
            }
            
            ctx.fillStyle = particle.color;
            ctx.globalAlpha = particle.life / 100;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Create new fireworks
        if (Math.random() < 0.05) {
            createFirework(
                Math.random() * canvas.width,
                Math.random() * canvas.height * 0.5
            );
        }
        
        if (particles.length > 0) {
            fireworksAnimation = requestAnimationFrame(animateFireworks);
        }
    }
    
    animateFireworks();
}

function getRandomColor() {
    const colors = ['#ff4da6', '#6c5ce7', '#00cec9', '#fdcb6e', '#e17055', '#74b9ff'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// ========================================
// DOWNLOADABLE BIRTHDAY CARD
// ========================================

function downloadBirthdayCard() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 800, 600);
    gradient.addColorStop(0, '#fff7fc');
    gradient.addColorStop(1, '#fef9fd');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 600);
    
    // Add some confetti
    for (let i = 0; i < 20; i++) {
        ctx.fillStyle = getRandomColor();
        ctx.fillRect(
            Math.random() * 800,
            Math.random() * 600,
            Math.random() * 8 + 4,
            Math.random() * 4 + 2
        );
    }
    
    // Title
    ctx.fillStyle = '#ff4da6';
    ctx.font = 'bold 48px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Happy Birthday, Nandini!', 400, 150);
    
    // Subtitle
    ctx.fillStyle = '#6c5ce7';
    ctx.font = '24px Arial, sans-serif';
    ctx.fillText('Wishing you a year full of laughter, adventures, and cake.', 400, 200);
    
    // Date
    ctx.fillStyle = '#4a4a4a';
    ctx.font = '20px Arial, sans-serif';
    ctx.fillText(`Date: 25/08/2025 `, 400, 300);
    
    // Decorative elements
    ctx.fillStyle = '#ff4da6';
    ctx.font = '60px Arial, sans-serif';
    ctx.fillText('🎂', 400, 400);
    
    // Footer
    ctx.fillStyle = '#6c5ce7';
    ctx.font = '18px Arial, sans-serif';
    ctx.fillText('Made with 💖 for Nandini', 400, 550);
    
    // Download
    const link = document.createElement('a');
    link.download = 'birthday-card-nandini.png';
    link.href = canvas.toDataURL();
    link.click();
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function generateClientId() {
    return 'client_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 600;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ========================================
// EVENT LISTENERS
// ========================================

function initializeEventListeners() {
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        console.log('Theme toggle button found, adding event listener');
        
        // Add click counter for debugging
        let clickCount = 0;
        
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            clickCount++;
            console.log(`Theme toggle clicked ${clickCount} times`);
            
            // Add visual feedback
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
            
            // Call the theme toggle function
            toggleTheme();
        });
        
        // Add visual feedback
        themeToggle.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 0 15px rgba(255, 77, 166, 0.5)';
        });
        
        themeToggle.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
        });
        
        // Add a test click event
        themeToggle.addEventListener('dblclick', function() {
            console.log('Double click detected - testing theme toggle');
            this.style.border = '3px solid red';
            setTimeout(() => {
                this.style.border = '';
            }, 1000);
        });
        
    } else {
        console.error('Theme toggle button not found!');
    }
    

    
    // Gallery modal
    const modal = document.getElementById('galleryModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    const modalClose = document.getElementById('modalClose');
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    const modalPrev = document.getElementById('modalPrev');
    if (modalPrev) {
        modalPrev.addEventListener('click', () => navigateModal('prev'));
    }
    
    const modalNext = document.getElementById('modalNext');
    if (modalNext) {
        modalNext.addEventListener('click', () => navigateModal('next'));
    }
    

    
    // Wish generator
    const generateWishBtn = document.getElementById('generateWish');
    if (generateWishBtn) {
        generateWishBtn.addEventListener('click', generateWish);
    }
    
    // Download card
    const downloadCardBtn = document.getElementById('downloadCard');
    if (downloadCardBtn) {
        downloadCardBtn.addEventListener('click', downloadBirthdayCard);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowLeft') {
            navigateModal('prev');
        } else if (e.key === 'ArrowRight') {
            navigateModal('next');
        } else if (e.key === 't' || e.key === 'T') {
            // T key toggles theme
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                console.log('Theme toggle via keyboard shortcut');
                toggleTheme();
            }
        }
    });
    
    // Window resize
    window.addEventListener('resize', function() {
        const canvas = document.getElementById('confettiCanvas');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    });
}

// ========================================
// CLEANUP
// ========================================

window.addEventListener('beforeunload', function() {
    if (confettiAnimation) {
        cancelAnimationFrame(confettiAnimation);
    }
    if (fireworksAnimation) {
        cancelAnimationFrame(fireworksAnimation);
    }
    
    // Clean up music monitor
    if (musicMonitorInterval) {
        clearInterval(musicMonitorInterval);
    }
});
