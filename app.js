document.addEventListener('DOMContentLoaded', () => {
    const slideImg = document.querySelectorAll('.slide_img');
    const slides = document.querySelectorAll('.slide_item');
    const sliderMain = document.querySelector('.project_slider');
    const sliderWrapper = document.querySelector('.slider_wrapper');
    const prev = document.querySelector('.prev_btn');
    const next = document.querySelector('.next_btn');
    let slideIndex = 0;
    let width;

    const sliderDots = document.createElement('ol');
    const dots = [];
    sliderDots.classList.add('slider_dots');
    sliderWrapper.append(sliderDots);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i);
        dot.classList.add('dot');
        if (i === 0) {
            dot.classList.add('dot_active');
        }
        sliderDots.append(dot);
        dots.push(dot);
    }

    function init() {
        width = sliderWrapper.offsetWidth;
        sliderMain.style.width = width * slideImg.length + 'px';

        slideImg.forEach(img => {
            img.style.width = width + 'px';
            img.style.height = 'auto';
        })
    }

    function showSlides(index) {
        if (index > slides.length - 1) {
            slideIndex = 0;
        }
        if (index < 0) {
            slideIndex = slides.length - 1;
        }

        slides.forEach(img => {
            img.style.display = 'none';
            img.classList.add('animated');
        });
        dots.forEach(dot => dot.classList.remove('dot_active'));
        slides[slideIndex].style.display = 'block';
        dots[slideIndex].classList.add('dot_active');
    }

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = +e.target.getAttribute('data-slide-to');
            if (slideTo > slideIndex) {
                slides[slideTo].classList.remove('slide-left')
                slides[slideTo].classList.add('slide-right');
            } else {
                slides[slideTo].classList.remove('slide-right')
                slides[slideTo].classList.add('slide-left');
            }
            slideIndex = slideTo;
            showSlides(slideIndex);
        })
    })

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    prev.addEventListener('click', () => {
        plusSlides(-1);
        slides[slideIndex].classList.remove('slide-right')
        slides[slideIndex].classList.add('slide-left');
    });
    next.addEventListener('click', () => {
        plusSlides(1);
        slides[slideIndex].classList.remove('slide-left')
        slides[slideIndex].classList.add('slide-right');
    });

    function activateAnimation() {
        paused = setInterval(function () {
            plusSlides(1);
            slides[slideIndex].classList.remove('slide-left');
            slides[slideIndex].classList.add('slide-right');
        }, 3000);
    }

    activateAnimation();

    sliderWrapper.addEventListener('mouseenter', () => {
        clearInterval(paused);
    });

    sliderWrapper.addEventListener('mouseleave', () => {
        activateAnimation();
    });

    window.addEventListener('resize', init);
    showSlides(slideIndex);
    init();

    // Scroll
    const upBtn = document.querySelector('.pageup');
    window.addEventListener('scroll', () => {
        if(window.pageYOffset > 1300) {
            upBtn.style.display = 'block';
        } else {
            upBtn.style.display = 'none';
        }
    });

    document.querySelectorAll('a[href^="#"').forEach(link => {

        link.addEventListener('click', function(e) {
            e.preventDefault();
    
            let href = this.getAttribute('href').substring(1);
    
            const scrollTarget = document.getElementById(href);
    
            const topOffset = document.querySelector('.header').offsetHeight;
            // const topOffset = 0; // если не нужен отступ сверху 
            const elementPosition = scrollTarget.getBoundingClientRect().top;
            const offsetPosition = elementPosition - topOffset;
    
            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
});