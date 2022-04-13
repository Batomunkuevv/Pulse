"use strict";

//*<Import>=====================================================================================================

import * as myFunctions from "./modules/functions.js";

//*</Import>====================================================================================================

window.addEventListener("DOMContentLoaded", () => {
    //*<Functions>==============================================================================================

    myFunctions.ibg();
    myFunctions.isWebp();

    //*</Functions>=============================================================================================

    //*<Slider>=================================================================================================

    const slider = tns({
        container: ".slider__inner",
        items: 1,
        speed: 1000,
        slideBy: "page",
        autoplay: false,
        controls: false,
        nav: false,
        responsive: {},
    });

    document.querySelector(".prev").addEventListener("click", () => {
        slider.goTo("prev");
    });

    document.querySelector(".next").addEventListener("click", () => {
        slider.goTo("next");
    });

    //*</Slider>=================================================================================================

    //*<Tabs>=================================================================================================

    const tabsParent = document.querySelector(".catalog__tabs"),
        tabs = tabsParent.querySelectorAll(".catalog__tab"),
        tabsContent = document.querySelectorAll(".catalog__content");

    function hideTabContent() {
        tabsContent.forEach((item) => {
            item.classList.add("hide");
            item.classList.remove("fadeIn");
        });

        tabs.forEach((item) => {
            item.classList.remove("catalog__tab_active");
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.remove("hide");
        tabsContent[i].classList.add("fadeIn");
        tabs[i].classList.add("catalog__tab_active");
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener("click", (e) => {
        const target = e.target;

        if (target && target.classList.contains("catalog__tab")) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //*</Tabs>=================================================================================================

    //*<Coup cards>=================================================================================================

    const btnsFront = document.querySelectorAll(".item-catalog__link_front"),
        btnsBack = document.querySelectorAll(".item-catalog__link_back"),
        itemFront = document.querySelectorAll(".item-catalog-front"),
        itemBack = document.querySelectorAll(".item-catalog-back");

    function coupCard(i) {
        itemFront[i].classList.toggle("item-catalog-front_active");
        itemBack[i].classList.toggle("item-catalog-back_active");
    }

    btnsFront.forEach((item, i) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            coupCard(i);
        });
    });

    btnsBack.forEach((item, i) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            coupCard(i);
        });
    });

    //*</Coup cards>=================================================================================================

    //*<Poppap>=================================================================================================

    const btnsConsultation = document.querySelectorAll('[data-modal="consultation"]'),
        btnsOrder = document.querySelectorAll('[data-modal="order"'),
        modalConsultation = document.querySelector("#consultation"),
        modalOrder = document.querySelector("#order"),
        modalOrderDescr = modalOrder.querySelector(".modal__descr"),
        modalThanks = document.querySelector("#thanks"),
        modalClose = document.querySelectorAll(".modal__close"),
        overlay = document.querySelector(".overlay"),
        catalogItemsName = document.querySelectorAll(".item-catalog__name");

    function openModalConsultation() {
        overlay.classList.remove("hide");
        overlay.classList.add("fadeIn");
        modalConsultation.classList.remove("hide");
        modalConsultation.classList.add("fadeIn");
        document.body.style.cssText = "overflow: hidden";
    }

    function openModalOrder(i) {
        overlay.classList.remove("hide");
        overlay.classList.add("fadeIn");
        modalOrder.classList.remove("hide");
        modalOrder.classList.add("fadeIn");
        modalOrderDescr.textContent = catalogItemsName[i].textContent;
        document.body.style.cssText = "overflow: hidden";
    }

    function openModalThanks() {
        overlay.classList.remove("hide");
        overlay.classList.add("fadeIn");
        modalThanks.classList.remove("hide");
        modalThanks.classList.add("fadeIn");
        document.body.style.cssText = "overflow: hidden";
    }

    function closeModal() {
        overlay.classList.add("hide");
        overlay.classList.remove("fadeIn");
        modalConsultation.classList.add("hide");
        modalOrder.classList.add("hide");
        modalThanks.classList.add("hide");
        document.body.style.cssText = "overflow: ";
    }

    function showModalByScroll() {
        if (
            document.documentElement.scrollTop + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight
        ) {
            openModalConsultation();
            window.removeEventListener("scroll", showModalByScroll);
        }
    }

    btnsConsultation.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            openModalConsultation();
        });
    });

    btnsOrder.forEach((btn, i) => {
        btn.addEventListener("click", (e) => {
            openModalOrder(i);
        });
    });

    modalClose.forEach((item) => {
        item.addEventListener("click", () => {
            closeModal();
        });
    });

    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape") {
            closeModal();
        }
    });

    window.addEventListener("scroll", showModalByScroll);

    //*</Poppap>=================================================================================================

    //*<Header-Scroll>=================================================================================================

    const header = document.querySelector("header"),
        headerContacts = header.querySelector(".header__contacts"),
        headerBtn = headerContacts.querySelector(".header__btn"),
        headerOfficial = header.querySelector(".header__official"),
        headerPhone = header.querySelector(".header__phone"),
        headerBody = header.querySelector(".header__body");

    function addScroll() {
        header.classList.add("header_scroll", "fadeIn");
        headerContacts.classList.add("header__contacts_scroll");
        headerBtn.classList.add("header__btn_scroll");
        headerOfficial.classList.add("header__official_scroll");
        headerPhone.classList.add("header__phone_scroll");
        headerBody.classList.add("header__body_scroll");
    }

    function removeScroll() {
        header.classList.remove("header_scroll", "fadeIn");
        headerOfficial.classList.remove("header__official_scroll");
        headerContacts.classList.remove("header__contacts_scroll");
        headerBtn.classList.remove("header__btn_scroll");
        headerPhone.classList.remove("header__phone_scroll");
        headerBody.classList.remove("header__body_scroll");
    }

    window.addEventListener("scroll", (e) => {
        if (document.documentElement.scrollTop >= "85") {
            addScroll();
        } else {
            removeScroll();
        }
    });

    //*</Header-Scroll>=================================================================================================

    //*<Form-validate>=================================================================================================

    const forms = document.querySelectorAll("#feed-form");

    async function formSend(e) {
        e.preventDefault();
        let error = formValidate(e.target);
        let formData = new FormData(e.target); //! Вытягивание из полей

        if (error === 0) {
            e.target.classList.add("_sending");
            let response = await fetch("sendmail.php", {
                method: "POST",
                body: formData,
            });
            if (response.ok) {
                let result = await response.json();
                closeModal();
                openModalThanks();
                e.target.reset();
                e.target.classList.remove("_sending");
            } else {
                alert("Ошибка");
                e.target.classList.remove("_sending");
            }
        } else {
            alert("Заполните обязательные поля");
        }
    }

    function formAddError(input) {
        input.classList.add("_error");
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove("_error");
        input.classList.remove("_error");
    }

    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

    function nameTest(input) {
        return input.value.length < 4;
    }

    //TODO function phoneTest(input) {}

    function formValidate(form) {
        let error = 0;
        let formReq = form.querySelectorAll("._req");

        for (let i = 0; i < formReq.length; i++) {
            const input = formReq[i];

            formRemoveError(input);

            if (input.classList.contains("email")) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else if (nameTest(input)) {
                formAddError(input);
                error++;
            } else {
                if (input.value === "") {
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }

    forms.forEach((form) => {
        form.addEventListener("submit", formSend);
    });

    //*</Form-validate>=================================================================================================

    //*<Up>=================================================================================================

    const arrowUp = document.querySelector(".pageup");

    function showArrowUp() {
        arrowUp.classList.remove("hide");
        arrowUp.classList.add("fadeIn");
        arrowUp.classList.remove("fadeOut");
    }

    function hideArrowUp() {
        arrowUp.classList.remove("fadeIn");
        arrowUp.classList.add("fadeOut");
        arrowUp.classList.add("hide");
    }

    function pageUp() {
        if (document.documentElement.scrollTop > 1000) {
            showArrowUp();
        } else {
            hideArrowUp();
        }
    }

    window.addEventListener("scroll", pageUp);

    arrowUp.addEventListener("click", function (e) {
        e.preventDefault();

        let href = this.getAttribute("href").substring(1);
        console.log(href);
        const scrollTarget = document.getElementById(href);
        const topOffset = 0;
        //! const topOffset = 0; // если не нужен отступ сверху
        const elementPosition = scrollTarget.getBoundingClientRect().top;
        const offsetPosition = elementPosition - topOffset;

        window.scrollBy({
            top: offsetPosition,
            behavior: "smooth",
        });
    });
    //*</Up>=================================================================================================
});
