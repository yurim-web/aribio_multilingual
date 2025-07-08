// Scientific Basis Swiper 초기화
const researchSwiper = new Swiper(".researchSwiper", {
  slidesPerView: 4,
  spaceBetween: 40,
  centeredSlides: false,
  slideToClickedSlide: true,
  pagination: {
    el: ".swiper-pagination",
    type: "custom",
    renderCustom: function (swiper, current, total) {
      // 아무것도 반환하지 않음(직접 조작)
      return "";
    },
  },
  breakpoints: {
    320: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
  },
  on: {
    slideChange: function () {
      const bar = document.querySelector(".custom-progressbar-bar");
      const total = this.slides.length - this.params.slidesPerView + 1;
      const percent = 100 / total;
      bar.style.width = percent + "%";
      bar.style.left = percent * this.activeIndex + "%";
    },
  },
});

// 초기 위치 세팅
researchSwiper.emit("slideChange");

// 모바일 Thesis 스와이퍼 초기화
const mobileThesisSwiper = new Swiper(".mobileThesisSwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// Swiper 인스턴스 생성 이후에 아래 코드 추가
const progressBar = document.querySelector(".custom-progressbar-bar");
const progressBarBg =
  document.querySelector(".custom-progressbar-bg") || progressBar;

let isDragging = false;

progressBarBg.addEventListener("mousedown", function (e) {
  isDragging = true;
  moveToSlide(e);
});

window.addEventListener("mousemove", function (e) {
  if (!isDragging) return;
  moveToSlide(e);
});

window.addEventListener("mouseup", function () {
  isDragging = false;
});

function moveToSlide(e) {
  const rect = progressBarBg.getBoundingClientRect();
  const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width); // 0~width 사이로 제한
  const percent = x / rect.width;

  const total =
    researchSwiper.slides.length - researchSwiper.params.slidesPerView + 1;
  const slideIndex = Math.floor(percent * total);

  researchSwiper.slideTo(slideIndex);
}
