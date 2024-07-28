document.addEventListener("DOMContentLoaded", function() {
    const tooltip = document.querySelector('.tooltip');
    tooltip.textContent = 'Click to Logout';
    const userAvatar = document.querySelector('.user-avatar');
    // 添加鼠标悬停事件
    userAvatar.addEventListener('mouseover', function() {
        tooltip.style.visibility = 'visible';
    });
    // 添加鼠标离开事件
    userAvatar.addEventListener('mouseout', function() {
        tooltip.style.visibility = 'hidden';
    });
    // 添加点击事件
    userAvatar.addEventListener('click', function() {
        location.href = 'login.html'; // 跳转到登录页面
    });
    const tooltip_contact = document.querySelector('.tooltip-contact');
    tooltip_contact.textContent = 'Click to Logout';
    const contactAvatar = document.querySelector('.contact-avatar');
    contactAvatar.addEventListener('mouseover', function() {
        tooltip_contact.style.visibility = 'visible';
    });
    // 添加鼠标离开事件
    contactAvatar.addEventListener('mouseout', function() {
        tooltip_contact.style.visibility = 'hidden';
    });
});