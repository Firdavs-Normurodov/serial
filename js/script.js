window.addEventListener("DOMContentLoaded", () => {
  const tabsParent = document.querySelector(".tabheader__items"),
    tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    loader = document.querySelector(".loader");

  //loader
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }, 2000);
  //Tabs
  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });
    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }
  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }
  hideTabContent();
  showTabContent();
  tabsParent.addEventListener("click", (event) => {
    const nishon = event.target;
    if (nishon && nishon.classList.contains("tabheader__item")) {
      tabs.forEach((item, idx) => {
        if (nishon == item) {
          hideTabContent();
          showTabContent(idx);
        }
      });
    }
  });
  //Timer
  const deadline = "2024-05-07";
  function getTimerRemaining(endTime) {
    let days, hours, minutes, seconds;
    const timer = Date.parse(endTime) - Date.parse(new Date());
    if (timer <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      (days = Math.floor(timer / (1000 * 60 * 60 * 24))),
        (hours = Math.floor((timer / (1000 * 60 * 60)) % 24)),
        (minutes = Math.floor((timer / 1000 / 60) % 60)),
        (seconds = Math.floor((timer / 1000) % 60));
    }
    return { timer, days, hours, minutes, seconds };
  }
  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }
  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updatClock, 1000);
    updatClock();
    function updatClock() {
      const t = getTimerRemaining(endtime);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);
      if (t.timer <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  setClock(".timer", deadline);
  //Modal
  function closeModal() {
    modal.classList.add("hide", "fade");
    modal.classList.remove("show");
    document.body.style.overflow = "";
    clearInterval(modalTimerId);
  }
  function openModal() {
    modal.classList.add("show", "fade");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
  }
  const modalTriger = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal");

  modalTriger.forEach((item) => {
    item.addEventListener("click", openModal);
  });

  modal.addEventListener("click", (e) => {
    if (e.target == modal || e.target.getAttribute("data-close") == "") {
      closeModal();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.code == "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });
  // const modalTimerId = setTimeout(openModal, 10000);
  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }
  window.addEventListener("scroll", showModalByScroll);

  //Class
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.price = price;
      this.transfer = 11000;
      this.changeToUZS();
    }
    changeToUZS() {
      this.price = this.price * this.transfer;
    }
    render() {
      const element = document.createElement("div");
      if (this.classes.length == 0) {
        this.element = "menu__item";
        element.classList.add(this.element);
      } else {
        this.classes.forEach((classname) => element.classList.add(classname));
      }
      element.innerHTML = `

        <img src=${this.src} alt=${this.alt} />
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">
          ${this.descr}
        </div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Price:</div>
          <div class="menu__item-total"><span>${this.price}</span>uzs/month</div>
        </div>
      `;
      this.parent.append(element);
    }
  }
  new MenuCard(
    "img/tabs/1.png",
    "vegy",
    'Plan "Usual"',
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi, dignissimos? Beatae consequatur iusto fuga ad corrupti porro officiis qui. Ducimus esse culpa officiis delectus velit minima adipisci quaerat sit, nihil tempore unde nam! Nobis, voluptate.",
    10,
    ".menu .container"
  ).render();
  new MenuCard(
    "img/tabs/2.jpg",
    "elite",
    "Plan “Premium”",
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi, dignissimos? Beatae consequatur iusto fuga ad corrupti porro officiis qui. Ducimus esse culpa officiis delectus velit minima adipisci quaerat sit, nihil tempore unde nam! Nobis, voluptate.",
    15,
    ".menu .container"
  ).render();
  new MenuCard(
    "img/tabs/3.jpg",
    "post",
    'Plan "VIP"',
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi, dignissimos? Beatae consequatur iusto fuga ad corrupti porro officiis qui. Ducimus esse culpa officiis delectus velit minima adipisci quaerat sit, nihil tempore unde nam! Nobis, voluptate.",
    12,
    ".menu .container"
  ).render();
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    postData(form);
  });
  const msg = {
    loading: "img/spinner.svg",
    succes: "Thank's for submiting our form",
    failure: "Something went wrong",
  };
  function postData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const statusMsg = document.createElement("img");
      statusMsg.src = msg.loading;
      statusMsg.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      form.insertAdjacentElement("afterend", statusMsg);
      const request = new XMLHttpRequest();
      request.open("POST", "server.php");
      request.setRequestHeader("Content-Type", "Multipart/aplication/json");
      const obj = {};
      const formData = new FormData(form);
      formData.forEach((val, key) => {
        obj[key] = val;
      });
      const json = JSON.stringify(obj);
      request.send(json);
      request.addEventListener("load", () => {
        if (request.status == 200) {
          console.log(request.response);
          showThankModal(msg.succes);
          form.reset();
          setTimeout(() => {
            statusMsg.remove();
          }, 2000);
        } else {
          showThankModal(msg.failure);
        }
      });
    });
  }
  function showThankModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");
    prevModalDialog.classList.add("hide");
    openModal();
    const thankModal = document.createElement("div");
    thankModal.classList.add("modal__dialog");
    thankModal.innerHTML = `
      <div class="modal__content">
        <div data-close class="modal__close">&times;</div>
        <div class="modal__title">
       ${message}
      </div>
      </div>
    `;
    document.querySelector(".modal").append(thankModal);
    setTimeout(() => {
      thankModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal();
    }, 4000);
  }
});
