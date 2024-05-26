function modal() {
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
  const modalTimerId = setTimeout(openModal, 100000);
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
}
module.exports = modal;
