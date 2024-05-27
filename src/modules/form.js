import { openModal, closeModal } from "./modal";

function form() {
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    bindPostData(form);
  });

  const msg = {
    loading: "img/spinner.svg",
    success: "Thank you for submitting our form",
    failure: "Something went wrong",
  };

  async function postData(url, data) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  }

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const statusMsg = document.createElement("img");
      statusMsg.src = msg.loading;
      statusMsg.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      form.insertAdjacentElement("afterend", statusMsg);
      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      postData("http://localhost:3000/request", json)
        .then((data) => {
          console.log(data);
          showThankModal(msg.success);
        })
        .catch(() => {
          showThankModal(msg.failure);
        })
        .finally(() => {
          statusMsg.remove();
          form.reset();
        });
    });
  }

  function showThankModal(message) {
    openModal(".modal"); // Ensure the correct selector is used
    const modalContent = document.querySelector(".modal__content");
    modalContent.innerHTML = `
      <div class="modal__title">${message}</div>
      <div data-close class="modal__close">&times;</div>
    `;
    setTimeout(() => {
      closeModal(".modal"); // Ensure the correct selector is used
    }, 4000);
  }
}

export default form;
