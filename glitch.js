// Cyberpunk Red Glitch Background & Intense Page Transition Glitch
(function () {
    // -------------------------------------------------------------
    // 1. Background Glitch Canvas
    // -------------------------------------------------------------
    const canvas = document.createElement('canvas');
    canvas.id = 'glitch-canvas';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let glitchBlocks = [];
    let lastGlitchTime = 0;
    let mouseX = -100;
    let mouseY = -100;
    let isMouseInside = false;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initParticles();
    }

    function initParticles() {
        particles = [];
        const count = Math.floor(Math.min(width, height) / 20);
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                speedY: -(Math.random() * 1.2 + 0.3),
                size: Math.random() * 2 + 1,
                alpha: Math.random() * 0.7 + 0.3
            });
        }
    }

    function spawnGlitch(customX, customY) {
        glitchBlocks = [];
        const count = Math.floor(Math.random() * 5) + 3;
        for (let i = 0; i < count; i++) {
            glitchBlocks.push({
                x: customX !== undefined ? Math.max(0, customX - 120 + (Math.random() * 240)) : 0,
                y: customY !== undefined ? Math.max(0, customY - 25 + (Math.random() * 50)) : Math.random() * height,
                w: customX !== undefined ? Math.random() * 180 + 60 : width,
                h: Math.random() * 28 + 4,
                color: Math.random() > 0.35 ? 'rgba(255, 23, 68, ' + (Math.random() * 0.5 + 0.2) + ')' : 'rgba(0, 229, 255, ' + (Math.random() * 0.4 + 0.1) + ')',
                duration: Math.random() * 8 + 3
            });
        }
    }

    // -------------------------------------------------------------
    // 2. Full-Screen Intense Transition Glitch ("Glitch Parah")
    // -------------------------------------------------------------
    const overlay = document.createElement('div');
    overlay.className = 'intense-glitch-overlay';
    for (let i = 0; i < 5; i++) {
        const slice = document.createElement('div');
        slice.className = 'glitch-slice';
        overlay.appendChild(slice);
    }
    document.body.appendChild(overlay);

    window.triggerPageTransition = function (callback) {
        document.body.classList.add('page-transition-glitch');
        spawnGlitch();
        spawnGlitch();

        setTimeout(() => {
            if (typeof callback === 'function') {
                callback();
            }
            // Always remove transition class after timeout so UI never freezes/stacks
            setTimeout(() => {
                document.body.classList.remove('page-transition-glitch');
            }, 300);
        }, 380);
    };

    window.getOrInitAudio = function () {
        if (!window._hotspotAudioCtx) {
            var AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                window._hotspotAudioCtx = new AudioCtx();
            }
        }
        if (window._hotspotAudioCtx && window._hotspotAudioCtx.state === 'suspended') {
            window._hotspotAudioCtx.resume();
        }
        return window._hotspotAudioCtx;
    };

    // Auto-unlock audio on any user interaction
    window.addEventListener('click', function () {
        window.getOrInitAudio();
    }, { once: false });

    window.playWarningSiren = function () {
        try {
            var actx = window.getOrInitAudio();
            if (!actx) return;

            var playAlarm = function () {
                var now = actx.currentTime;

                // 1. Glitch Noise Burst
                var bs = Math.floor(actx.sampleRate * 0.28);
                var buf = actx.createBuffer(1, bs, actx.sampleRate);
                var d = buf.getChannelData(0);
                for (var i = 0; i < bs; i++) d[i] = Math.random() * 2 - 1;
                var noise = actx.createBufferSource();
                noise.buffer = buf;
                var noiseGain = actx.createGain();
                noiseGain.gain.setValueAtTime(0.35, now);
                noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
                noise.connect(noiseGain);
                noiseGain.connect(actx.destination);
                noise.start(now);

                // 2. Dual-Oscillator Fat Cyber Alarm (Sawtooth + Square)
                var osc1 = actx.createOscillator();
                var osc2 = actx.createOscillator();
                var alarmGain = actx.createGain();

                osc1.type = 'sawtooth';
                osc2.type = 'square';
                osc2.detune.setValueAtTime(15, now);

                alarmGain.gain.setValueAtTime(0.3, now + 0.05);

                var st = now + 0.05;
                for (var s = 0; s < 6; s++) {
                    var cycleStart = st + s * 0.42;
                    osc1.frequency.setValueAtTime(960, cycleStart);
                    osc1.frequency.exponentialRampToValueAtTime(260, cycleStart + 0.2);
                    osc2.frequency.setValueAtTime(975, cycleStart);
                    osc2.frequency.exponentialRampToValueAtTime(270, cycleStart + 0.2);

                    osc1.frequency.setValueAtTime(840, cycleStart + 0.21);
                    osc1.frequency.exponentialRampToValueAtTime(220, cycleStart + 0.4);
                    osc2.frequency.setValueAtTime(855, cycleStart + 0.21);
                    osc2.frequency.exponentialRampToValueAtTime(230, cycleStart + 0.4);
                }

                alarmGain.gain.setValueAtTime(0.3, st + 2.3);
                alarmGain.gain.exponentialRampToValueAtTime(0.001, st + 2.7);

                osc1.connect(alarmGain);
                osc2.connect(alarmGain);
                alarmGain.connect(actx.destination);

                osc1.start(st);
                osc2.start(st);
                osc1.stop(st + 2.7);
                osc2.stop(st + 2.7);

                // 3. Sci-Fi Restoration Chime at 2.8s
                setTimeout(function () {
                    try {
                        var chimeNow = actx.currentTime;
                        [523, 659, 784, 1046].forEach(function (freq, idx) {
                            var o = actx.createOscillator(), g = actx.createGain();
                            o.type = 'triangle';
                            var t = chimeNow + idx * 0.06;
                            o.frequency.setValueAtTime(freq, t);
                            g.gain.setValueAtTime(0.25, t);
                            g.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
                            o.connect(g);
                            g.connect(actx.destination);
                            o.start(t);
                            o.stop(t + 0.25);
                        });
                    } catch (e) { }
                }, 2800);
            };

            if (actx.state === 'suspended') {
                actx.resume().then(playAlarm).catch(playAlarm);
            } else {
                playAlarm();
            }
        } catch (err) { }
    };

    window.runVirusSequence = function (elements, onComplete) {
        document.body.classList.add('virus-attacking-active');
        if (window.setVirusMode) window.setVirusMode(true);
        window.playWarningSiren();

        var fill = elements && elements.fill;
        var line2 = elements && elements.line2;
        var line3 = elements && elements.line3;
        var card = elements && elements.card;
        var badgeText = elements && elements.badgeText;
        var title = elements && elements.title;
        var alertMsg = elements && elements.alertMsg;

        setTimeout(function () {
            if (fill) fill.style.width = '35%';
            if (line2) {
                line2.textContent = '[*] ACTIVATING HARDWARE DEFENSE CORE...';
                line2.className = 'virus-line action';
            }
        }, 800);

        setTimeout(function () {
            if (fill) fill.style.width = '70%';
            if (line3) {
                line3.textContent = '[*] CORRUPTED NODES QUARANTINED: 0x9F4C';
                line3.className = 'virus-line action';
            }
        }, 1800);

        setTimeout(function () {
            if (fill) {
                fill.style.width = '100%';
                fill.style.background = '#00e5ff';
            }
            if (line3) {
                line3.textContent = '[+] THREAT 100% ELIMINATED // CORE INTEGRITY: SECURE';
                line3.className = 'virus-line success';
            }
            if (card) card.classList.add('threat-neutralized');
            document.body.classList.remove('virus-attacking-active');
            if (window.setVirusMode) window.setVirusMode(false);

            if (badgeText) badgeText.textContent = 'SYSTEM SECURED';
            if (title) title.textContent = 'ACCESS RESTORED';
            if (alertMsg) alertMsg.innerHTML = 'Threat purged successfully. Connection established.<br />Proceeding to status dashboard...';
        }, 2800);

        setTimeout(function () {
            if (window.triggerPageTransition) {
                window.triggerPageTransition(function () {
                    if (typeof onComplete === 'function') onComplete();
                });
            } else if (typeof onComplete === 'function') {
                onComplete();
            }
        }, 3800);
    };

    // Auto-intercept navigation links for glitch transition
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && link.href && !link.target && !link.getAttribute('href').startsWith('#') && !link.getAttribute('href').startsWith('javascript:')) {
            const dest = link.href;
            e.preventDefault();
            window.triggerPageTransition(() => {
                window.location.href = dest;
            });
        }
    });

    // -------------------------------------------------------------
    // 3. Mouse Tracking & Periodic Cursor Glitch
    // -------------------------------------------------------------
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMouseInside = true;
        // Make logout-icon-wrap SVG follow cursor like an eye
        const eyeWrap = document.querySelector('.logout-icon-wrap');
        const eyeSvg = eyeWrap ? eyeWrap.querySelector('svg') : null;
        if (eyeWrap && eyeSvg) {
            const rect = eyeWrap.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const angle = Math.atan2(dy, dx);
            const maxMove = 6;
            const px = Math.cos(angle) * maxMove;
            const py = Math.sin(angle) * maxMove;
            eyeSvg.style.transition = 'transform 0.08s ease-out';
            eyeSvg.style.transform = 'translate(' + px + 'px, ' + py + 'px)';
        }
    });

    window.addEventListener('mouseleave', () => {
        isMouseInside = false;
    });

    window.addEventListener('mouseenter', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMouseInside = true;
    });

    // Click shockwave ripple
    window.addEventListener('mousedown', (e) => {
        const shockwave = document.createElement('div');
        shockwave.className = 'cyber-cursor-shockwave';
        shockwave.style.left = e.clientX + 'px';
        shockwave.style.top = e.clientY + 'px';
        document.body.appendChild(shockwave);
        setTimeout(() => shockwave.remove(), 480);
    });

    const arrowSvgContent = `
        <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M3 2 L3 20 L8 15 L13 22 L16 20 L11 14 L18 14 Z" fill="currentColor" stroke="#fff" stroke-width="1.2" stroke-linejoin="round"/>
        </svg>
    `;

    function triggerCursorGlitch() {
        document.body.classList.add('cursor-glitching');
        
        if (isMouseInside && mouseX > 0 && mouseY > 0) {
            spawnGlitch(mouseX, mouseY);

            // Spawn cyan ghost arrow
            const ghostCyan = document.createElement('div');
            ghostCyan.className = 'cyber-glitch-ghost cyber-glitch-ghost-cyan';
            ghostCyan.style.setProperty('--gx', mouseX + 'px');
            ghostCyan.style.setProperty('--gy', mouseY + 'px');
            ghostCyan.style.left = '0';
            ghostCyan.style.top = '0';
            ghostCyan.style.color = '#00e5ff';
            ghostCyan.innerHTML = arrowSvgContent;
            document.body.appendChild(ghostCyan);

            // Spawn red ghost arrow
            const ghostRed = document.createElement('div');
            ghostRed.className = 'cyber-glitch-ghost cyber-glitch-ghost-red';
            ghostRed.style.setProperty('--gx', mouseX + 'px');
            ghostRed.style.setProperty('--gy', mouseY + 'px');
            ghostRed.style.left = '0';
            ghostRed.style.top = '0';
            ghostRed.style.color = '#ff0055';
            ghostRed.innerHTML = arrowSvgContent;
            document.body.appendChild(ghostRed);

            // Spawn pulse ring
            const pulseRing = document.createElement('div');
            pulseRing.className = 'cyber-glitch-pulse-ring';
            pulseRing.style.left = mouseX + 'px';
            pulseRing.style.top = mouseY + 'px';
            document.body.appendChild(pulseRing);

            setTimeout(() => {
                ghostCyan.remove();
                ghostRed.remove();
                pulseRing.remove();
            }, 320);
        } else {
            spawnGlitch();
        }

        const glitchDuration = Math.random() * 80 + 240;
        setTimeout(() => {
            document.body.classList.remove('cursor-glitching');
            scheduleNextGlitch();
        }, glitchDuration);
    }

    function scheduleNextGlitch() {
        const nextInterval = Math.random() * 2000 + 2500;
        setTimeout(triggerCursorGlitch, nextInterval);
    }

    // Start cursor glitch cycle
    setTimeout(triggerCursorGlitch, 2000);

    // -------------------------------------------------------------
    // 4. Lightweight 60 FPS Background Render Loop
    // -------------------------------------------------------------
    let isVirusMode = false;
    window.setVirusMode = function (active) {
        isVirusMode = !!active;
        if (isVirusMode) {
            spawnGlitch();
            spawnGlitch();
            spawnGlitch();
        }
    };

    function render() {
        ctx.clearRect(0, 0, width, height);

        // Virus mode violent screen tearing & chromatic glitch strobe (BRUTAL PC GLITCH)
        if (isVirusMode) {
            // 1. Massive full-width horizontal tearing slices
            for (var b = 0; b < 6; b++) {
                var gy = Math.random() * height;
                var gh = Math.random() * 55 + 10;
                ctx.fillStyle = Math.random() > 0.4 ? 'rgba(255, 23, 68, 0.85)' : (Math.random() > 0.5 ? 'rgba(0, 229, 255, 0.75)' : 'rgba(255, 255, 255, 0.9)');
                ctx.fillRect(0, gy, width, gh);
            }

            // 2. Heavy digital noise static blocks
            for (var s = 0; s < 14; s++) {
                var bx = Math.random() * width;
                var by = Math.random() * height;
                var bw = Math.random() * 320 + 80;
                var bh = Math.random() * 45 + 10;
                ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 0, 50, 0.75)' : 'rgba(0, 229, 255, 0.65)';
                ctx.fillRect(bx, by, bw, bh);
            }

            // 3. Full-screen strobe wash
            if (Math.random() > 0.35) {
                ctx.fillStyle = Math.random() > 0.5 ? 'rgba(213, 0, 50, 0.35)' : 'rgba(0, 229, 255, 0.22)';
                ctx.fillRect(0, 0, width, height);
            }

            spawnGlitch();
            spawnGlitch();
        }

        // Draw animated cyber grid
        ctx.strokeStyle = 'rgba(255, 23, 68, 0.04)';
        ctx.lineWidth = 1;
        const gridSize = 40;
        for (let x = 0; x < width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        for (let y = 0; y < height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        // Draw floating red particles
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.y += p.speedY;
            p.alpha += Math.sin(Date.now() * 0.003 + i) * 0.01;
            if (p.y < 0) {
                p.y = height;
                p.x = Math.random() * width;
            }

            ctx.fillStyle = `rgba(255, 23, 68, ${Math.max(0.1, Math.min(0.85, p.alpha))})`;
            ctx.shadowColor = '#ff1744';
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.shadowBlur = 0;

        // Draw periodic glitch blocks
        const now = Date.now();
        if (now - lastGlitchTime > Math.random() * 1800 + 1200) {
            spawnGlitch();
            lastGlitchTime = now;
        }

        for (let i = glitchBlocks.length - 1; i >= 0; i--) {
            const gb = glitchBlocks[i];
            ctx.fillStyle = gb.color;
            ctx.fillRect(gb.x, gb.y, gb.w, gb.h);
            gb.duration--;
            if (gb.duration <= 0) {
                glitchBlocks.splice(i, 1);
            }
        }

        requestAnimationFrame(render);
    }

    window.addEventListener('resize', resize);
    window.addEventListener('DOMContentLoaded', () => {
        resize();
        render();
    });
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        resize();
        render();
    }
})();
