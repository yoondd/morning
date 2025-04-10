const slideList = document.getElementsByClassName('item');
const totalSlides = slideList.length; // 슬라이드 개수
let now = 0;

// 초기화
const initSlides = () => {
    for (let i = 0; i < totalSlides; i++) {
        slideList[i].classList.remove('active'); 
    }
    slideList[0].classList.add('active');
};

// 슬라이드 이동 함수
const moveSlide = () => {
    slideList[now].classList.remove('active'); 
    now = (now + 1) % totalSlides; 
    slideList[now].classList.add('active'); 
};


initSlides();
setInterval(moveSlide, 3000);

// 모바일메뉴입니다
const mobilemenu = document.querySelector('#mobile_menu');
mobilemenu.addEventListener('click',()=>{
    const menu = document.querySelector('.menu');
    menu.classList.toggle('on');
})