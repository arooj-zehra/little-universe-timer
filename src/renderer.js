// Timer App Renderer Process
class LittleUniverseTimer {
    constructor() {
        this.currentScreen = 1;
        this.timerInterval = null;
        this.currentTimerMinutes = 0;
        this.timeLeft = 0;
        this.isPaused = false;
        
        // Initialize audio elements
        this.backgroundLoop = document.getElementById('backgroundLoop');
        this.clickSound = document.getElementById('clickSound');
        this.timerCompleted = document.getElementById('timerCompleted');
        this.chimesSound = document.getElementById('chimesSound');
        
        // Reduce click sound volume (optional)
        this.clickSound.volume = 0.3; 
        
        // Quote array for Screen 4
        this.quotes = [
            "Rest is also a kind of growing.",
            "The stars are always there, waiting for us to notice.",
            "Small steps lead to great journeys.",
            "In stillness, we find our direction.",
            "Every moment of peace is a victory.",
            "The universe whispers to those who listen.",
            "Progress is not always about moving forward.",
            "Sometimes the best adventure is sitting still.",
            "Stars shine brightest in the darkest nights.",
            "Your thoughts are constellations waiting to be discovered.",
            "Patience is the compass of the wise.",
            "Every breath is a new beginning.",
            "The journey inward is the longest voyage.",
            "Quiet moments hold the loudest truths.",
            "In the space between thoughts, magic happens.",
            "Time spent in reflection is never wasted.",
            "The smallest star can guide the greatest ship.",
            "Peace is not the absence of noise, but the presence of calm.",
            "Every sunset promises a new dawn.",
            "The universe is vast, but your moment is precious."
        ];
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.startBackgroundMusic();
    }
    
    setupEventListeners() {
        // Screen 1: Next Page button
        document.getElementById('nextPageBtn').addEventListener('click', () => {
            this.playClickSound();
            this.showScreen(2);
        });
        
        // Screen 2: Timer selection icons
        document.querySelectorAll('.timer-icon').forEach(icon => {
            icon.addEventListener('click', (e) => {
                this.playClickSound();
                const minutes = parseInt(e.currentTarget.getAttribute('data-minutes'));
                this.startTimer(minutes);
                this.showScreen(3);
            });
        });
        
        // Screen 3: Timer controls
        document.getElementById('stopBtn').addEventListener('click', () => {
            this.playClickSound();
            this.stopTimer();
        });
        
        document.getElementById('restartBtn').addEventListener('click', () => {
            this.playClickSound();
            this.restartTimer();
        });
        
        // Screen 4: End button
        document.getElementById('endBtn').addEventListener('click', () => {
            this.playClickSound();
            this.resetApp();
        });
    }
    
    playClickSound() {
        this.clickSound.currentTime = 0;
        this.clickSound.play().catch(e => console.log('Click sound failed:', e));
    }
    
    startBackgroundMusic() {
        this.backgroundLoop.play().catch(e => console.log('Background music failed:', e));
    }
    
    pauseBackgroundMusic() {
        this.backgroundLoop.pause();
    }
    
    resumeBackgroundMusic() {
        this.backgroundLoop.play().catch(e => console.log('Background music resume failed:', e));
    }
    
    showScreen(screenNumber) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show target screen
        document.getElementById(`screen${screenNumber}`).classList.add('active');
        this.currentScreen = screenNumber;
        
        // Special actions for specific screens
        if (screenNumber === 4) {
            this.displayRandomQuote();
            this.playChimes();
        }
    }
    
    startTimer(minutes) {
        this.currentTimerMinutes = minutes;
        this.timeLeft = minutes * 60; 
        this.isPaused = false;
        
        this.updateTimerDisplay();
        
        this.timerInterval = setInterval(() => {
            if (!this.isPaused) {
                this.timeLeft--;
                this.updateTimerDisplay();
                
                if (this.timeLeft <= 0) {
                    this.completeTimer();
                }
            }
        }, 1000);
    }
    
    updateTimerDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('timerCountdown').textContent = display;
    }
    
    stopTimer() {
        this.isPaused = !this.isPaused;
        
        if (this.isPaused) {
            this.pauseBackgroundMusic();
            document.getElementById('stopBtn').textContent = 'RESUME';
        } else {
            this.resumeBackgroundMusic();
            document.getElementById('stopBtn').textContent = 'PAUSE';
        }
    }
    
    restartTimer() {
        clearInterval(this.timerInterval);
        this.isPaused = false;
        document.getElementById('stopBtn').textContent = 'PAUSE';
        this.resumeBackgroundMusic();
        this.startTimer(this.currentTimerMinutes);
    }
    
    completeTimer() {
        clearInterval(this.timerInterval);
        
        // Play timer completed sound
        this.timerCompleted.play().catch(e => console.log('Timer completed sound failed:', e));
        
        // Smooth transition to screen 4 
        setTimeout(() => {
            this.showScreen(4);
        }, 1000); 
    }
    
    displayRandomQuote() {
        const randomIndex = Math.floor(Math.random() * this.quotes.length);
        const randomQuote = this.quotes[randomIndex];
        document.getElementById('randomQuote').textContent =`"${randomQuote}"`;
    }
    
    playChimes() {
        setTimeout(() => {
            this.chimesSound.play().catch(e => console.log('Chimes sound failed:', e));
        }, 500); 
    }
    
    resetApp() {
        // Reset everything and go back to screen 1
        clearInterval(this.timerInterval);
        this.timerInterval = null;
        this.currentTimerMinutes = 0;
        this.timeLeft = 0;
        this.isPaused = false;
        document.getElementById('stopBtn').textContent = 'PAUSE';
        this.resumeBackgroundMusic();
        this.showScreen(1);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LittleUniverseTimer();
});



