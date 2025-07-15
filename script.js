// Add interactive features to the website
document.addEventListener('DOMContentLoaded', function() {
    // Check if speech synthesis is supported
    if ('speechSynthesis' in window) {
        console.log('Speech synthesis supported! 🎵');
        
        // Load voices (some browsers need this)
        speechSynthesis.onvoiceschanged = () => {
            const voices = speechSynthesis.getVoices();
            console.log(`🎵 ${voices.length} voices loaded`);
        };
        
        // Trigger voices loading
        speechSynthesis.getVoices();
    } else {
        console.log('Speech synthesis not supported in this browser.');
    }
    
    // Add click effects to name cards
    const nameCards = document.querySelectorAll('.name-card');
    
    nameCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add a fun click animation
            this.style.transform = 'translateY(-20px) scale(1.1) rotate(5deg)';
            
            // Create confetti effect
            createConfetti(this);
            
            // Show "luv u" message
            showLuvMessage(this);
            
            // Play audio saying "luv u [name]"
            playLuvAudio(this);
            
            // Reset animation after a short delay
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
        
        // Add mouse enter/leave effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add greeting message functionality
    const greetingCard = document.querySelector('.greeting-card');
    
    greetingCard.addEventListener('click', function(e) {
        if (e.target === this || e.target.closest('.header')) {
            showGreetingMessage();
        }
    });
    
    // Initialize floating animations
    initializeFloatingShapes();
    
    // Add keyboard interactions
    document.addEventListener('keydown', function(e) {
        if (e.key === ' ' || e.key === 'Enter') {
            triggerCelebration();
        }
    });
});

function createConfetti(element) {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#a8e6cf', '#ffaaa5'];
    const confettiCount = 20;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '6px';
        confetti.style.height = '6px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.pointerEvents = 'none';
        confetti.style.borderRadius = '50%';
        confetti.style.zIndex = '1000';
        
        const rect = element.getBoundingClientRect();
        confetti.style.left = (rect.left + rect.width / 2) + 'px';
        confetti.style.top = (rect.top + rect.height / 2) + 'px';
        
        document.body.appendChild(confetti);
        
        // Animate confetti
        const angle = (Math.PI * 2 * i) / confettiCount;
        const velocity = 100 + Math.random() * 50;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let x = rect.left + rect.width / 2;
        let y = rect.top + rect.height / 2;
        let opacity = 1;
        
        const animate = () => {
            x += vx * 0.02;
            y += vy * 0.02;
            vy += 2; // gravity
            opacity -= 0.03;
            
            confetti.style.left = x + 'px';
            confetti.style.top = y + 'px';
            confetti.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                document.body.removeChild(confetti);
            }
        };
        
        requestAnimationFrame(animate);
    }
}

function showGreetingMessage() {
    const messages = [
        "Hello there, Lakshu and Pankaj! 🎉",
        "Hope you're having an amazing day! ⭐",
        "Welcome to your special website! 🌈",
        "You both are awesome! 🚀",
        "Greetings from your website! 🎊"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // Create temporary message element
    const messageElement = document.createElement('div');
    messageElement.textContent = randomMessage;
    messageElement.style.position = 'fixed';
    messageElement.style.top = '50%';
    messageElement.style.left = '50%';
    messageElement.style.transform = 'translate(-50%, -50%)';        messageElement.style.background = 'linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1)';
        messageElement.style.backgroundSize = '200% 200%';
        messageElement.style.animation = 'colorShift 2s ease infinite';
    messageElement.style.color = 'white';
    messageElement.style.padding = '1rem 2rem';
    messageElement.style.borderRadius = '10px';
    messageElement.style.fontSize = '1.2rem';
    messageElement.style.zIndex = '2000';
    messageElement.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    messageElement.style.opacity = '0';
    messageElement.style.transition = 'all 0.3s ease';
    
    document.body.appendChild(messageElement);
    
    // Animate in
    setTimeout(() => {
        messageElement.style.opacity = '1';
        messageElement.style.transform = 'translate(-50%, -50%) scale(1.05)';
    }, 10);
    
    // Animate out and remove
    setTimeout(() => {
        messageElement.style.opacity = '0';
        messageElement.style.transform = 'translate(-50%, -50%) scale(0.9)';
        setTimeout(() => {
            if (document.body.contains(messageElement)) {
                document.body.removeChild(messageElement);
            }
        }, 300);
    }, 2000);
}

function showLuvMessage(element) {
    // Get the name from the clicked element
    const name = element.querySelector('h2').textContent;
    
    // Create the luv message element
    const luvElement = document.createElement('div');
    luvElement.textContent = `luv u ${name}! 💖`;
    luvElement.style.position = 'fixed';
    luvElement.style.top = '30%';
    luvElement.style.left = '50%';
    luvElement.style.transform = 'translate(-50%, -50%) scale(0)';
    luvElement.style.background = 'linear-gradient(135deg, #ff6b6b, #ff9ff3, #4ecdc4)';
    luvElement.style.color = 'white';
    luvElement.style.padding = '1.5rem 3rem';
    luvElement.style.borderRadius = '20px';
    luvElement.style.fontSize = '2rem';
    luvElement.style.fontWeight = '600';
    luvElement.style.fontFamily = "'Fredoka', cursive";
    luvElement.style.zIndex = '3000';
    luvElement.style.boxShadow = '0 15px 35px rgba(255, 107, 107, 0.4)';
    luvElement.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    luvElement.style.textShadow = '0 2px 4px rgba(0, 0, 0, 0.3)';
    luvElement.style.border = '3px solid rgba(255, 255, 255, 0.3)';
    luvElement.style.maxWidth = '90vw';
    luvElement.style.textAlign = 'center';
    luvElement.style.wordBreak = 'break-word';
    
    document.body.appendChild(luvElement);
    
    // Animate in with bounce
    setTimeout(() => {
        luvElement.style.transform = 'translate(-50%, -50%) scale(1.1)';
    }, 10);
    
    setTimeout(() => {
        luvElement.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 200);
    
    // Add pulsing heart animation
    const heartPulse = setInterval(() => {
        luvElement.style.transform = 'translate(-50%, -50%) scale(1.05)';
        setTimeout(() => {
            luvElement.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 150);
    }, 300);
    
    // Animate out and remove
    setTimeout(() => {
        clearInterval(heartPulse);
        luvElement.style.transform = 'translate(-50%, -50%) scale(0) rotate(15deg)';
        luvElement.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(luvElement)) {
                document.body.removeChild(luvElement);
            }
        }, 400);
    }, 2500);
    
    // Make responsive for mobile
    if (window.innerWidth <= 768) {
        luvElement.style.fontSize = '1.5rem';
        luvElement.style.padding = '1rem 2rem';
        luvElement.style.top = '25%';
    }
    
    if (window.innerWidth <= 480) {
        luvElement.style.fontSize = '1.3rem';
        luvElement.style.padding = '0.8rem 1.5rem';
        luvElement.style.borderRadius = '15px';
    }
}

function playLuvAudio(element) {
    // Get the name from the clicked element
    const name = element.querySelector('h2').textContent;
    
    // Check if speech synthesis is supported
    if ('speechSynthesis' in window) {
        // Cancel any ongoing speech
        speechSynthesis.cancel();
        
        // Create the speech text
        const text = `luv u ${name}`;
        
        // Create a new utterance
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Configure the voice properties
        utterance.rate = 0.9; // Slightly slower for clarity
        utterance.pitch = 1.2; // Higher pitch for a cute effect
        utterance.volume = 0.8; // Not too loud
        
        // Try to use a female voice if available
        const voices = speechSynthesis.getVoices();
        const femaleVoice = voices.find(voice => 
            voice.name.toLowerCase().includes('female') || 
            voice.name.toLowerCase().includes('woman') ||
            voice.name.toLowerCase().includes('zira') ||
            voice.name.toLowerCase().includes('samantha')
        );
        
        if (femaleVoice) {
            utterance.voice = femaleVoice;
        } else {
            // If no specific female voice, try to find any English voice
            const englishVoice = voices.find(voice => 
                voice.lang.startsWith('en')
            );
            if (englishVoice) {
                utterance.voice = englishVoice;
            }
        }
        
        // Add event listeners for debugging
        utterance.onstart = () => {
            console.log(`🎵 Speaking: "${text}"`);
        };
        
        utterance.onend = () => {
            console.log('🎵 Speech finished!');
        };
        
        utterance.onerror = (event) => {
            console.error('🎵 Speech error:', event.error);
        };
        
        // Speak the text
        speechSynthesis.speak(utterance);
    } else {
        console.log('Speech synthesis not supported - creating audio beep instead');
        // Fallback: create a simple audio beep using Web Audio API
        createAudioBeep();
    }
}

function createAudioBeep() {
    // Fallback audio using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
        console.log('Audio not supported:', error);
    }
}

function initializeFloatingShapes() {
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        // Random starting positions
        const randomTop = Math.random() * 80 + 10;
        const randomLeft = Math.random() * 80 + 10;
        
        shape.style.top = randomTop + '%';
        shape.style.left = randomLeft + '%';
        
        // Add random delay to animations
        shape.style.animationDelay = (Math.random() * 3) + 's';
    });
}

function triggerCelebration() {
    const nameCards = document.querySelectorAll('.name-card');
    
    nameCards.forEach((card, index) => {
        setTimeout(() => {
            createConfetti(card);
            card.style.transform = 'translateY(-15px) scale(1.1)';
            setTimeout(() => {
                card.style.transform = '';
            }, 500);
        }, index * 200);
    });
    
    showGreetingMessage();
}

// Add smooth scrolling for any future navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add resize handler for responsive behavior
window.addEventListener('resize', function() {
    // Adjust floating shapes on resize
    initializeFloatingShapes();
});
