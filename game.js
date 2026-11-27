// ==========================================================================
// Floating Retro 2777 Plane Button — Opens game.html
// ==========================================================================
(function () {
    function initFloatingButton() {
        if (document.getElementById('retro-game-btn')) return;

        var btn = document.createElement('button');
        btn.id = 'retro-game-btn';
        btn.setAttribute('aria-label', 'Play Retro 2777 Air Force Game');
        btn.title = 'PLAY RETRO 2777 ARCADE';
        btn.innerHTML =
            '<div class="retro-btn-pulse"></div>' +
            '<svg class="retro-plane-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">' +
            '<path d="M16 2 L18 8 L18 12 L30 17 L30 20 L18 18 L18 26 L23 29 L23 31 L16 29 L9 31 L9 29 L14 26 L14 18 L2 20 L2 17 L14 12 L14 8 Z" fill="#ff1744" stroke="#ffffff" stroke-width="1.2" stroke-linejoin="round"/>' +
            '<circle cx="16" cy="10" r="1.5" fill="#ffffff"/>' +
            '<path d="M14 15 L18 15" stroke="#000000" stroke-width="1.2"/>' +
            '<path d="M6 18.5 L10 17.5" stroke="#ff5252" stroke-width="1.5"/>' +
            '<path d="M22 17.5 L26 18.5" stroke="#ff5252" stroke-width="1.5"/>' +
            '</svg>' +
            '<span class="retro-btn-tooltip">2777 AIR FORCE</span>';

        document.body.appendChild(btn);

        btn.addEventListener('click', function () {
            if (window.triggerPageTransition) {
                window.triggerPageTransition(function () {
                    window.location.href = 'game.html';
                });
            } else {
                window.location.href = 'game.html';
            }
        });
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initFloatingButton();
    } else {
        window.addEventListener('DOMContentLoaded', initFloatingButton);
    }
})();
