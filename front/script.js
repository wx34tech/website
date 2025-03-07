// script.js
document.addEventListener('DOMContentLoaded', () => {
    // 状态恢复
    const lastVisited = localStorage.getItem('lastVisitedPage');
    if (lastVisited) {
        console.log(`上次访问页面: ${lastVisited}`);
    }

    // 导航激活状态
    const navLinks = document.querySelectorAll('.nav-buttons a');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        if (linkPath === currentPath) {
            link.classList.add('active');
        }

        link.addEventListener('click', (e) => {
            navLinks.forEach(l => l.classList.remove('active'));
            e.target.classList.add('active');
            localStorage.setItem('lastVisitedPage', e.target.href);
        });
    });

    // 移动端菜单
    const hamburger = document.querySelector('.hamburger');
    const navButtons = document.querySelector('.nav-buttons');
    
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        navButtons.classList.toggle('active');
    });

    // 点击外部关闭菜单
    document.addEventListener('click', (e) => {
        if (window.innerWidth < 768 && !e.target.closest('.nav-buttons')) {
            navButtons.classList.remove('active');
        }
    });

    // 响应式处理
    window.addEventListener('resize', handleResponsive);
    handleResponsive();

    // 图片动画
    const mainImage = document.querySelector('.main-image-container img');
    if (mainImage.complete) {
        triggerImageAnimation();
    } else {
        mainImage.onload = triggerImageAnimation;
    }

    // 图片布局适配
    window.addEventListener('resize', adjustImageLayout);
    adjustImageLayout();
});

function handleResponsive() {
    const nav = document.querySelector('nav');
    const hamburger = document.querySelector('.hamburger');
    
    if (window.innerWidth < 768) {
        nav.classList.add('mobile-mode');
        hamburger.style.display = 'block';
    } else {
        nav.classList.remove('mobile-mode');
        hamburger.style.display = 'none';
        document.querySelector('.nav-buttons').classList.remove('active');
    }
}

function triggerImageAnimation() {
    const mainImage = document.querySelector('.main-image-container img');
    mainImage.style.opacity = '1';
    mainImage.style.transform = 'translateY(0)';
}

function adjustImageLayout() {
    const container = document.querySelector('.main-image-container');
    const img = container.querySelector('img');
    
    const containerRatio = container.offsetWidth / container.offsetHeight;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    
    img.style.objectFit = containerRatio > imgRatio ? 'cover' : 'contain';
}