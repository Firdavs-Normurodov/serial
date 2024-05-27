import clas from "../modules/class";
import form from "../modules/form";
import loader from "../modules/loader";
import modal from "../modules/modal";
import slider from "../modules/slider";
import tab from "../modules/tab";
import timer from "../modules/timer";

window.addEventListener("DOMContentLoaded", () => {
  clas();
  form();
  loader();
  slider();
  tab();
  timer();

  const modalTimerId = setTimeout(
    () => openModal(".modal", "[data-modal]", modalTimerId),
    100000
  ); // Pass triggerSelector here
  modal("[data-modal]", ".modal", modalTimerId);
});
