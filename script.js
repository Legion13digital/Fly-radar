document.addEventListener('DOMContentLoaded', function() {
    const radarScreen = document.querySelector('.radar-screen');
    const targetCount = document.getElementById('target-count');
    let blips = [];
    let targets = 0;
    
    // Function to create a new blip (aircraft)
    function createBlip() {
        const blip = document.createElement('div');
        blip.className = 'blip';
        
        // Random position within the radar (but not too close to center)
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 140; // Between 50 and 190 pixels from center
        
        const centerX = 200;
        const centerY = 200;
        
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        
        blip.style.left = `${x}px`;
        blip.style.top = `${y}px`;
        
        radarScreen.appendChild(blip);
        
        // Store blip data
        const blipData = {
            element: blip,
            x: x,
            y: y,
            speedX: (Math.random() - 0.5) * 0.8,
            speedY: (Math.random() - 0.5) * 0.8
        };
        
        blips.push(blipData);
        targets++;
        targetCount.textContent = targets;
        
        // Remove blip after some time
        setTimeout(() => {
            blip.remove();
            blips = blips.filter(b => b.element !== blip);
            targets--;
            targetCount.textContent = targets;
        }, 10000 + Math.random() * 15000);
    }
    
    // Function to move blips
    function moveBlips() {
        blips.forEach(blip => {
            // Update position
            blip.x += blip.speedX;
            blip.y += blip.speedY;
            
            // Check boundaries and bounce if needed
            const radius = 200;
            const centerX = 200;
            const centerY = 200;
            
            const distance = Math.sqrt(
                Math.pow(blip.x - centerX, 2) + 
                Math.pow(blip.y - centerY, 2)
            );
            
            if (distance > radius - 10) {
                // Calculate bounce angle
                const angle = Math.atan2(blip.y - centerY, blip.x - centerX);
                blip.speedX = -Math.cos(angle) * Math.random() * 0.8;
                blip.speedY = -Math.sin(angle) * Math.random() * 0.8;
            }
            
            // Update DOM position
            blip.element.style.left = `${blip.x}px`;
            blip.element.style.top = `${blip.y}px`;
        });
    }
    
    // Create initial blips
    for (let i = 0; i < 5; i++) {
        setTimeout(createBlip, i * 1000);
    }
    
    // Continue creating new blips periodically
    setInterval(createBlip, 3000);
    
    // Animate blips
    setInterval(moveBlips, 50);
    
    // Add glow effect when sweep passes over blips
    const sweep = document.querySelector('.sweep');
    sweep.addEventListener('animationiteration', () => {
        blips.forEach(blip => {
            blip.element.style.boxShadow = '0 0 10px #ff3333';
            setTimeout(() => {
                blip.element.style.boxShadow = '0 0 5px #ff3333';
            }, 200);
        });
    });
});
