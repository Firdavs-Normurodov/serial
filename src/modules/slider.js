function slider() {
  //Slider
  const slides = document.querySelectorAll(".offer__slide"),
    next = document.querySelector(".offer__slider-next"),
    prev = document.querySelector(".offer__slider-prev"),
    total = document.querySelector("#total"),
    current = document.querySelector("#current"),
    slidesWrapper = document.querySelector(".offer__slider-wrapper"),
    slidesField = document.querySelector(".offer__slider-inner"),
    sldier = document.querySelector(".offer__slider");
  width = window.getComputedStyle(slidesWrapper).width;
  console.log(width);
  let slideIndex = 1;
  let offset = 0;
  //carousel ----------------
  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }
  slidesField.style.width = 100 * slides.length + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = ".5s ease all";
  slidesWrapper.style.overflow = "hidden";
  slides.forEach((slide) => {
    slide.style.width = width;
  });

  // const indicators = document.createElement("ol");
  // const dots = [];
  // indicators.classList.add("carousel-indicators");
  // sldier.append(indicators);

  // for (let i = 0; i < slides.length; i++) {
  //   const dot = document.createElement("li");
  //   dot.setAttribute("data-slide-to", i);
  //   dot.classList.add("carousel-dot");
  //   if (i === 0) {
  //     dot.style.opacity = 1;
  //   }
  //   dots.push(dot);
  //   indicators.append(dot);
  // }
  function deleteNotDigits(str) {
    return parseInt(str.replace(/\D/g, ""));
  }
  next.addEventListener("click", () => {
    if (offset == deleteNotDigits(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += deleteNotDigits(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;
    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }
    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
    dots.forEach((dot) => (dot.style.opacity = ".5"));
    dots[slideIndex - 1].style.opacity = 1;
  });
  prev.addEventListener("click", () => {
    if (offset == 0) {
      offset = deleteNotDigits(width) * (slides.length - 1);
    } else {
      offset -= deleteNotDigits(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;
    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }
    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
    dots.forEach((dot) => (dot.style.opacity = ".5"));
    dots[slideIndex - 1].style.opacity = 1;
  });
  // dots.forEach((dot) => {
  //   dot.addEventListener("click", (e) => {
  //     const slideTo = +e.target.getAttribute("data-slide-to"); // Convert to number
  //     slideIndex = slideTo;
  //     offset = width * (slideTo - 1); // Corrected assignment
  //     slidesField.style.transform = `translateX(-${offset}px)`;

  //     if (slides.length < 10) {
  //       current.textContent = `0${slideIndex}`;
  //     } else {
  //       current.textContent = slideIndex;
  //     }

  //     dots.forEach((dot) => (dot.style.opacity = ".5"));
  //     dots[slideIndex - 1].style.opacity = 1;
  //   });
  // });
  //slider easy----------------------------------------
  // let slideIndex = 1;
  // showSlides(slideIndex);
  // if (slides.length < 10) {
  //   total.textContent = `
  //   0${slides.length}
  //   `;
  // } else {
  //   total.textContent = slides.length;
  // }
  // function showSlides(idx) {
  //   if (idx > slides.length) {
  //     slideIndex = 1;
  //   }
  //   if (idx < 1) {
  //     slideIndex = slides.length;
  //   }
  //   slides.forEach((item) => (item.style.display = "none"));
  //   slides[slideIndex - 1].style.display = "block";
  //   if (slides.length < 10) {
  //     current.textContent = `
  //     0${slideIndex}
  //     `;
  //   } else {
  //     current.textContent = slideIndex;
  //   }
  // }
  // function plusSildes(idx) {
  //   showSlides((slideIndex += idx));
  // }
  // next.addEventListener("click", () => {
  //   plusSildes(1);
  // });
  // prev.addEventListener("click", () => {
  //   plusSildes(-1);
  // });
}
module.exports = slider;
