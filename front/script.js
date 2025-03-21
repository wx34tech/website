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

// 文章数据（完整80条）
const articles = [
    { title: "我与清华的初见|班级摄影作品展示", url: "https://mp.weixin.qq.com/s/PZeLOMvGbJJpx8Xcx2khtQ" },
    { title: "生日星邱子浩|我们的第一位寿星来喽~", url: "https://mp.weixin.qq.com/s/84e4112dNYUopGhFVxcFMg" },
    { title: "生日星|祝余朝昊和吴逸尘生日快乐", url: "https://mp.weixin.qq.com/s/-KlKHk6x_6O3eRqDlGysTw" },
    { title: "学习时间|为先34 班9 月学习疑问调查反馈汇总", url: "https://mp.weixin.qq.com/s/dP3hl_XUvM7fbA3okNPmVQ" },
    { title: "中秋X 国庆|为先34 小长假回顾", url: "https://mp.weixin.qq.com/s/8NQen4vdoJky1dzbbUz7Uw" },
    { title: "班级活动|校史馆参观", url: "https://mp.weixin.qq.com/s/4zHaQkBc_-Eu510OByoZQw" },
    { title: "生日星&班级团建&赤足运动会庆功", url: "https://mp.weixin.qq.com/s/rCSSJ_bW22NuTV2BMNDdMw" },
    { title: "运动会|为先34 新生赤足运动会战报", url: "https://mp.weixin.qq.com/s/jxFhMF6_cJmh-PhgyHv46A" },
    { title: "生日星|祝何睿卓18 岁生日快乐！", url: "https://mp.weixin.qq.com/s/4J4nF0H_z8dnihKsMw15zw" },
    { title: "农场实践| 为先34 党课小组开展“深根计划”", url: "https://mp.weixin.qq.com/s/7PAmf4LfzirpoihanOIogA" },
    { title: "固本计划|为先34 党课小组微沙龙", url: "https://mp.weixin.qq.com/s/Ptu16EZrPsKRy8nwkRu5yg" },
    { title: "劳动实践|“清”年爱劳动，三四在行动", url: "https://mp.weixin.qq.com/s/p5hlwf5eqH5e4TVoL90L8Q" },
    { title: "迟到但不缺席|为先34 男生节大赏", url: "https://mp.weixin.qq.com/s/Cmx8MMk1IYXJDG-CaX327g" },
    { title: "学期中实践| 参观北京亦庄经济技术开发区", url: "https://mp.weixin.qq.com/s/FZ_kBrOOXdchgCcqvNu0-A" },
    { title: "学期中实践|参观脑机接口企业博睿康", url: "https://mp.weixin.qq.com/s/0MXY-0cMhfsVNKQpf1nk-w" },
    { title: "背起行囊·再出发|11 月学习月报", url: "https://mp.weixin.qq.com/s/coJboZotD9maUaMHb0aNWA" },
    { title: "招募令| “为你沪杭”寒假实践支队开始招募支队员！", url: "https://mp.weixin.qq.com/s/mu5LBHrNV4P7aIFw8RFj7A" },
    { title: "主题团日|为先34 团支部&卓越工程师学院：激越先声，步履不停", url: "https://mp.weixin.qq.com/s/TSuTi4Id6AB9-8cxW-QzUA" },
    { title: "生日星| 祝张婉如生日快乐！", url: "https://mp.weixin.qq.com/s/kqddLjhQbKO3rzeWVgXUfg" },
    { title: "班会| 为先34“暖冬计划”", url: "https://mp.weixin.qq.com/s/HFV5hE4D9eTVl47QWoEz1A" },
    { title: "固本延伸| 为先34 党课小组《置身事内》 （第一章）读书会", url: "https://mp.weixin.qq.com/s/atuuDL5ty6TrlZNGcbYZig" },
    { title: "为先34，新年快乐！", url: "https://mp.weixin.qq.com/s/lQSWVrS18fDToJuATpL9w" },
    { title: "生日星| 中心物恺日升月恒", url: "https://mp.weixin.qq.com/s/q8APkHEAl1zmSVEIm9THZw" },
    { title: "固本延伸| 为先34 党课小组《置身事内》 （第二章）读书会", url: "https://mp.weixin.qq.com/s/YV1tX4Cmrfz3Pak7vmiouw" },
    { title: "学风建设|在吗？进来查询34 小仙的期末备考状态", url: "https://mp.weixin.qq.com/s/U-xYOP_fcc93PES0UF6DDw" },
    { title: "贺岁篇|祝为先34 全体成员龙年大吉！", url: "https://mp.weixin.qq.com/s/j4ZJ0pXfgMyFG_FmQuWkgw" },
    { title: "为你沪杭| 支队成员简介", url: "https://mp.weixin.qq.com/s/j1VOxTUBeND9GmY0QcQlgA" },
    { title: "为你沪杭| 实践出行小贴士", url: "https://mp.weixin.qq.com/s/34NeF5k5N4NgrWuyUUuN-Q" },
    { title: "为你沪杭| 行前预调研", url: "https://mp.weixin.qq.com/s/hE3HjxtNRWVru7mGncf-jQ" },
    { title: "为你沪杭| 脑机穿越——沪小杭的BCI 主题日", url: "https://mp.weixin.qq.com/s/7jDwVNtO6zbfRgcAVg8bBA" },
    { title: "为你沪杭| 制造和科研前线——沪小杭的前沿双拼主题日", url: "https://mp.weixin.qq.com/s/U7S6-AehNdNCQ78x3Do2SQ" },
    { title: "为你沪杭| 校企市融合——沪小杭的IC 平台主题日", url: "https://mp.weixin.qq.com/s/4Xu4r5JZM0dMRft_wgOFCA" },
    { title: "为你沪杭| 性能与像素齐飞——沪小杭应用芯片主题日", url: "https://mp.weixin.qq.com/s/4lK2Xd0z4ggTpgcDWpJGrg" },
    { title: "为你沪杭| 延展无限——沪小杭的柔电院主题日", url: "https://mp.weixin.qq.com/s/R5xxW5LPIep6sH5hYkl4-Q" },
    { title: "为你沪杭| 使命长存——沪小杭的上海IC 产业总结日", url: "https://mp.weixin.qq.com/s/NU_lnNdysjv4zS45eyKolQ" },
    { title: "为你沪杭| 为国创芯——沪小杭的能源芯片主题日", url: "https://mp.weixin.qq.com/s/vEfXgPXaPgO60f2TMrCuvQ" },
    { title: "为你沪杭| 长三角集成电路产业调研", url: "https://mp.weixin.qq.com/s/dQdRAsaKqj5BQwDAL7CWxQ" },
    { title: "女生节活动| 女生节，启动！", url: "https://mp.weixin.qq.com/s/iU1dbMUDIY92YOcJrdihow" },
    { title: "班会总结| 为先34 春季班会暨学风建设会", url: "https://mp.weixin.qq.com/s/qnlyeK34nOdUoEBCUDcjWw" },
    { title: "小酌怡情| 为先34 咖啡日", url: "https://mp.weixin.qq.com/s/Jvz-zTJI4ACClF-XHu4GaQ" },
    { title: "深根计划| 春光正好，深根正当时", url: "https://mp.weixin.qq.com/s/OB6nmBIMkb777Ytn-aILug" },
    { title: "以AI 明行| 为先34 主题团日", url: "https://mp.weixin.qq.com/s/6dzjy0JRbef2XupN3X86Pw" },
    { title: "固本计划| 教育制度的追根溯源", url: "https://mp.weixin.qq.com/s/rYk6mCuzahv4sPUWyRxuGw" },
    { title: "班主任茶话会|第01 次班主任茶话会小结", url: "https://mp.weixin.qq.com/s/0FKYQffIzbsJPlB_XbyvQw" },
    { title: "学生节班级节目总结| “如此国风”一路走来的点点滴滴", url: "https://mp.weixin.qq.com/s/g1QWpCIqtmDk14a07cmKVg" },
    { title: "实践总结| 智谱AI 实践总结", url: "https://mp.weixin.qq.com/s/mtcdt3mq-Uz1b7dk6K2tIQ" },
    { title: "互助前行·点亮微光|为先34 学风建设总结", url: "https://mp.weixin.qq.com/s/d3FEGDz6PO7aIVJCGfw8Og" },
    { title: "为先实践| 践先思齐：行前推送· 支队介绍", url: "https://mp.weixin.qq.com/s/0sGBhM3l2Ryxtz9OxdWkQg" },
    { title: "为先实践| 践先思齐：行前推送· 调研篇", url: "https://mp.weixin.qq.com/s/bJJaY5uPsYYd0A0ZT5Rw0g" },
    { title: "班会| 为先34 举办班会暨班委换届选举会", url: "https://mp.weixin.qq.com/s/7u-fyoPoh7o-ziC4JKSPA" },
    { title: "为先实践| 践先思齐Day1:智能“智”造， “晶”益求精", url: "https://mp.weixin.qq.com/s/eLRWh7J7HrK8xwKN2X0Qhg" },
    { title: "为先实践| 践先思齐Day2&3： “新”“岳”交辉， “仪”马当先", url: "https://mp.weixin.qq.com/s/E8xrydnhtjTrI_q1arKsBg" },
    { title: "为先实践| 践先思齐Day5： “知行”合一， “起步”腾飞", url: "https://mp.weixin.qq.com/s/UJ9MpQDSm7oBCY4o8Ioz5w" },
    { title: "为先实践| 践先思齐Day6： “声”入人心，启迪未来", url: "https://mp.weixin.qq.com/s/t777XBzQLqXgOS6HDNU5gg" },
    { title: "为先实践| 践先思齐：总结篇", url: "https://mp.weixin.qq.com/s/vZvxIjuzc7jq4in1wS3Erw" },
    { title: "为先34 班集体为戴小川老师庆祝教师节", url: "https://mp.weixin.qq.com/s/LS6lCb9RdGXxHZ4mbZG_aw" },
    { title: "为先34 中秋快乐！", url: "https://mp.weixin.qq.com/s/mTI6329Mi3_C0l5RqHSX4Q" },
    { title: "生日星| 余朝昊、吴逸尘、王添乐生日快乐！", url: "https://mp.weixin.qq.com/s/Sxi29sMQjtdCqRA16W_6Aw" },
    { title: "三四学习| 期中学习支持简报", url: "https://mp.weixin.qq.com/s/YC5z_HtCzmsZyu3MqT8J_A" },
    { title: "生日星|张婉如生日快乐！", url: "https://mp.weixin.qq.com/s/eqvtEyoOZJKosQgVySLjsw" },
    { title: "2024 秋为先34 第二次班会暨推优入党大会", url: "https://mp.weixin.qq.com/s/j1U2-2itDt-AbK4-51T7Wg" },
    { title: "生日星| 何睿卓生日快乐！", url: "https://mp.weixin.qq.com/s/Elu_d80UJbfMBBxu5p-AUQ" },
    { title: "深根计划| 香山革命纪念馆参观", url: "https://mp.weixin.qq.com/s/HCgBHL77k6BfA-BYNduzOA" },
    { title: "男生节|34 小仙三国大战", url: "https://mp.weixin.qq.com/s/zeY043c1EX3gPwA4ol8M7g" },
    { title: "团日预热| Sharing 小传", url: "https://mp.weixin.qq.com/s/uxGc6xKWLzcZe86QVzgT-g" },
    { title: "固本计划| 本科科研思考", url: "https://mp.weixin.qq.com/s/6dn9-k4hf6ktnJhl0BV_AQ" },
    { title: "主题团日| 共建、共治、共享：Sharing 历险记", url: "https://mp.weixin.qq.com/s/4eL5jd9hI1QtQ3lIhBm6ZA" },
    { title: "生日星| 陈文恺、李孟卓、何书恒生日快乐！", url: "https://mp.weixin.qq.com/s/9Gux7GwsfwJ5MjIYaLw19w" },
    { title: "学期中实践| 生物医学工程研究所实践", url: "https://mp.weixin.qq.com/s/rUMnZPeidQ0SpMheFSJraQ" },
    { title: "班会| 为先34 团员评议大会暨期末动员大会", url: "https://mp.weixin.qq.com/s/JzsHRRYosdpc0fUIWGZHVg" },
    { title: "生日星| 杨晨熙生日快乐！", url: "https://mp.weixin.qq.com/s/MWlB2x17xdEiNQQNqmNP0w" },
    { title: "生日星| 骆正宇生日快乐！", url: "https://mp.weixin.qq.com/s/o5_Rgb470ZSs8Zciihx3nA" },
    { title: "生日星| 徐晨雨、胡欣生日快乐！", url: "https://mp.weixin.qq.com/s/R0lZ265hVvLSxxlgtN0WSg" },
    { title: "三四满天星| 百篇纪念", url: "https://mp.weixin.qq.com/s/afwATwmpij6CPlUgbDVXzQ" },
    { title: "班会| 新学期第一次班会暨推优入党大会", url: "https://mp.weixin.qq.com/s/2rSZILIShW3zYIcrZsYg5A" },
    { title: "庆闫·五星辅导员·星宇廿四载芳诞", url: "https://mp.weixin.qq.com/s/YS8M8iB_uv0inSswzGyxnw" },
    { title: "34 小仙女生节快乐", url: "https://mp.weixin.qq.com/s/86B3xjMO90KkiGEDhSSJkg<c" },
    { title: "“三思”一周年 | 走出时间之后，我们在……", url: "https://mp.weixin.qq.com/s/Xc3BeoSZe0hcdKaRPXn3rQ" },
    { title: "深根计划 | 在希望的田野上", url: "https://mp.weixin.qq.com/s/u5qsVXoJtODGS52gD2DHvw" },
    { title: "生日星 | 银姑生日快乐！", url: "https://mp.weixin.qq.com/s/IEp64ctUHxa4Vr3yRTWvxg" }
];

// 分页配置
let currentPage = 1;
let itemsPerPage = 20;

function renderArticles() {
    const container = document.getElementById('articles-container');
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    
    container.innerHTML = articles.slice(start, end).map(article => `
        <a href="${article.url}" class="article-card" target="_blank">
            <div class="article-title">${article.title}</div>
        </a>
    `).join('');

    updatePaginationControls();
}

function updatePaginationControls() {
    const totalPages = Math.ceil(articles.length / itemsPerPage);
    document.getElementById('page-indicator').textContent = 
        `第${currentPage}页（共${totalPages}页）`;
    document.getElementById('prev-btn').disabled = currentPage === 1;
    document.getElementById('next-btn').disabled = currentPage === totalPages;
}

// 事件监听（新增分页选择器）
document.getElementById('page-size').addEventListener('change', (e) => {
    itemsPerPage = parseInt(e.target.value);
    currentPage = 1; // 重置到第一页
    renderArticles();
});

document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderArticles();
    }
});

document.getElementById('next-btn').addEventListener('click', () => {
    const totalPages = Math.ceil(articles.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderArticles();
    }
});

// 初始化时绑定（防止重复执行）
if (window.location.pathname.includes('column.html')) {
    document.addEventListener('DOMContentLoaded', renderArticles);
}
