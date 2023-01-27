// 
function startCarousel() {
    const HOLDING_TIME = 4000; /*in milliseconds*/
    const carouselContainer = document.querySelector(".carousel-container");
    const carouselImageWrapper = document.querySelector(".carousel-image-wrapper");
    let currentIndex = 1;
    let slideLength = carouselImageWrapper.children.length;

    // control buttons
    function createCarouselButtons() {
        // prev btn
        let prevBtn = document.createElement("button");
        prevBtn.setAttribute("id", "prev");
        prevBtn.classList.add("carousel-control-button");
        prevBtn.addEventListener("click", () => showPrevSlide());
        prevBtn.append("❮");

        // next btn
        let nextBtn = document.createElement("button");
        nextBtn.setAttribute("id", "next");
        nextBtn.classList.add("carousel-control-button");
        nextBtn.addEventListener("click", () => showNextSlide());
        nextBtn.append("❯");

        carouselContainer.append(prevBtn);
        carouselContainer.append(nextBtn);
    }

    // indicators
    function createCarouselIndicators() {
        let carouselIndicators = document.createElement("div");
        carouselIndicators.classList.add("carousel-indicators");
        carouselContainer.append(carouselIndicators);
        for (let i = 0; i < slideLength; i++) {
            let indicator = document.createElement("button");
            indicator.classList.add("carousel-indicator-btn");
            carouselIndicators.append(indicator);
            indicator.addEventListener("click", function () {
                showIndicatorSlide(i + 1);
            });
        }
    }

    // periodic slide
    function startPeriodicSlide() {
        showNextSlide();
        setTimeout(startPeriodicSlide, HOLDING_TIME);
    }

    // indicator slide
    function showIndicatorSlide(index) {
        currentIndex = index;
        showSlide();
    }

    //prev slide 
    function showPrevSlide() {
        if (currentIndex === 1) {
            currentIndex = slideLength;
        }
        else {
            currentIndex--;
        }
        showSlide();

    }

    // next slide
    function showNextSlide() {
        if (currentIndex === slideLength) {
            currentIndex = 1;
        }
        else {
            currentIndex++;
        }
        showSlide();
    }

    // show slide
    function showSlide() {
        carouselImageWrapper.style.transform = `translateX(${-(currentIndex - 1) * 100}vw)`;
    }

    createCarouselIndicators();
    createCarouselButtons();
    setTimeout(startPeriodicSlide,HOLDING_TIME); /*start slide first time after holdingTime*/ 
}

startCarousel();