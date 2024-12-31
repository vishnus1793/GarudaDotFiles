document.addEventListener('DOMContentLoaded', () => {
    const soundIndicator = document.getElementById('sound-indicator');
    const volumeLevel = document.getElementById('volume-level');
    
    let volume = 50; // Initial volume level

    function showIndicator(level) {
        volumeLevel.textContent = `Volume: ${level}%`;
        soundIndicator.classList.add('show');
        
        // Hide the indicator after 2 seconds
        setTimeout(() => {
            soundIndicator.classList.remove('show');
        }, 2000);
    }

    // Simulating volume change (for demonstration)
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowUp') {
            volume = Math.min(100, volume + 5); // Increase volume
            showIndicator(volume);
        } else if (event.key === 'ArrowDown') {
            volume = Math.max(0, volume - 5); // Decrease volume
            showIndicator(volume);
        }
    });
});
