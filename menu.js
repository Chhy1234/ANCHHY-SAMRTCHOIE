document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('main-nav');
    const overlay = document.querySelector('.nav-overlay');
    function closeNav() {
        nav.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
    }
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            nav.classList.toggle('active');
            if (overlay) overlay.classList.toggle('active');
        });
    }
    if (overlay) {
        overlay.addEventListener('click', closeNav);
    }
    window.addEventListener('resize', function() {
        if(window.innerWidth > 768) closeNav();
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape") closeNav();
    });
    // Optional: close nav if clicking a nav link (on mobile)
    if (nav) {
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) closeNav();
            });
        });
    }
});
