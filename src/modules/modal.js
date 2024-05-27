function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add("hide", "fade");
  modal.classList.remove("show");
  document.body.style.overflow = "";
}

function openModal(modalSelector, triggerSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add("show", "fade");
  modal.classList.remove("hide");
  document.body.style.overflow = "hidden";
  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}

function modal(triggerSelector, modalSelector, modalTimerId) {
  const modalTriggers = document.querySelectorAll(triggerSelector);
  const modal = document.querySelector(modalSelector);

  modalTriggers.forEach((item) => {
    item.addEventListener("click", () =>
      openModal(modalSelector, triggerSelector, modalTimerId)
    );
  });

  modal.addEventListener("click", (e) => {
    if (e.target == modal || e.target.getAttribute("data-close") == "") {
      closeModal(modalSelector);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code == "Escape" && modal.classList.contains("show")) {
      closeModal(modalSelector);
    }
  });

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      openModal(modalSelector, triggerSelector, modalTimerId);
      window.removeEventListener("scroll", showModalByScroll);
    }
  }
  window.addEventListener("scroll", showModalByScroll);
}

export default modal;
