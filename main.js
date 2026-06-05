
let menu = document.querySelector('#menu');
let navbar = document.querySelector('.navbar');

if (menu && navbar) {
    menu.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });
}

window.onscroll = () => {
    navbar.classList.remove('active');
    highlightActiveNav();
    toggleScrollTopBtn();
}

const newsInput = document.querySelector('.news-box input');
const newsBtn = document.querySelector('.news-box button[type="submit"]');

if (newsBtn) {
    newsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const email = newsInput.value.trim();
        if (!email || !email.includes('@')) {
            alert('გთხოვთ შეიყვანოთ სწორი ელ.ფოსტა');
            return;
        }
        alert(`მადლობა! ${email} წარმატებით დარეგისტრირდა!`);
        newsInput.value = '';
    });
}

let cartCount = 0;

document.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        cartCount++;
        updateCartBadge();
        btn.textContent = '✓ Added';
        btn.classList.add('added');
        setTimeout(() => {
            btn.textContent = 'Add';
            btn.classList.remove('added');
        }, 1500);
    });
});

function updateCartBadge() {
    let badge = document.getElementById('cart-badge');
    if (!badge) {
        const header = document.querySelector('header');
        const cartBtn = document.createElement('a');
        cartBtn.href = '#shop';
        cartBtn.id = 'cart-btn';
        cartBtn.innerHTML = '🛒 <span id="cart-badge"></span>';
        header.appendChild(cartBtn);
        badge = document.getElementById('cart-badge');
    }
    badge.textContent = cartCount;
}

const scrollBtn = document.createElement('button');
scrollBtn.id = 'scrollTopBtn';
scrollBtn.innerHTML = '↑';
document.body.appendChild(scrollBtn);

scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

function toggleScrollTopBtn() {
    scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
}

function highlightActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar a');
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 100) {
            current = sec.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + current ? '#0080ff' : '';
    });
}


(function () {
    const track = document.getElementById('carTrack');
    const dotsEl = document.getElementById('carDots');
    if (!track) return;

    const slides = Array.from(track.children);
    const total = slides.length;
    const perPage = window.innerWidth <= 768 ? 1 : 3;
    const pageCount = Math.ceil(total / perPage);
    let cur = 0, timer;
    const INTERVAL = 4000;

    for (let i = 0; i < pageCount; i++) {
        const d = document.createElement('button');
        d.className = 'car-dot' + (i === 0 ? ' active' : '');
        d.setAttribute('aria-label', 'გვერდი ' + (i + 1));
        d.onclick = () => goTo(i, true);
        dotsEl.appendChild(d);
    }

    function goTo(page, reset) {
        cur = (page + pageCount) % pageCount;
        const slideW = slides[0].getBoundingClientRect().width;
        const gap = 16;
        track.style.transform = `translateX(-${cur * perPage * (slideW + gap)}px)`;
        document.querySelectorAll('.car-dot').forEach((d, i) =>
            d.classList.toggle('active', i === cur));
        if (reset) { clearInterval(timer); startAuto(); }
    }

    function startAuto() {
        timer = setInterval(() => goTo(cur + 1, false), INTERVAL);
    }

    document.getElementById('carPrev').onclick = () => goTo(cur - 1, true);
    document.getElementById('carNext').onclick = () => goTo(cur + 1, true);

    let tx = 0;
    track.addEventListener('touchstart', e => tx = e.touches[0].clientX, { passive: true });
    track.addEventListener('touchend', e => {
        const dx = e.changedTouches[0].clientX - tx;
        if (Math.abs(dx) > 40) goTo(dx < 0 ? cur + 1 : cur - 1, true);
    }, { passive: true });

    startAuto();
})();

    (function(){

        function showOnly(hash){
            var target = hash ? hash.replace('#','') : null;
            document.querySelectorAll('section').forEach(function(sec){
                if(!target){
                    sec.style.display = '';
                    return;
                }
                sec.style.display = (sec.id === target) ? '' : 'none';
            });
            if(target){
                var el = document.getElementById(target);
                if(el) el.scrollIntoView({behavior: 'smooth'});
            }
        }
        if (location.pathname && (location.pathname.indexOf('mogzauroba') !== -1 || location.pathname.endsWith('/mogzauroba.html'))) {
            window.addEventListener('DOMContentLoaded', function(){
                showOnly(location.hash);
                window.addEventListener('hashchange', function(){ showOnly(location.hash); });
            });
        }
    })();