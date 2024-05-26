function form() {
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    binPostData(form);
  });

  const msg = {
    loading: "img/spinner.svg",
    succes: "Thank's for submiting our form",
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
  function binPostData(form) {
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
          showThankModal(msg.succes);
          statusMsg.remove();
        })
        .catch(() => {
          showThankModal(msg.failure);
        })
        .finally(() => {
          form.reset();
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
}
module.exports = form;
