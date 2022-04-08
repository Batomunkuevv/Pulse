"use strict";

import * as Functions from "./modules/functions.js";

window.addEventListener("DOMContentLoaded", () => {
    //<Functions>=================================================================================================

    Functions.ibg();

    //</Functions>=================================================================================================

    //<Slider>=================================================================================================
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
    //</Slider>=================================================================================================

    //<Tabs>=================================================================================================

    const tabsParent = document.querySelector(".catalog__tabs"),
        tabs = tabsParent.querySelectorAll(".catalog__tab"),
        tabsContent = document.querySelectorAll(".catalog__content");

    function hideTabContent() {
        tabsContent.forEach((item) => {
            item.classList.add("hide");
        });

        tabs.forEach((item) => {
            item.classList.remove("catalog__tab_active");
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.remove("hide");
        tabs[i].classList.add("catalog__tab_active");
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener("click", (e) => {
        const target = e.target;
        console.log(target);
        if (target && target.classList.contains("catalog__tab")) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //</Tabs>=================================================================================================

    //<Reversal cards>=================================================================================================

    const btnsFront = document.querySelectorAll(".item-catalog__link_front"),
        btnsBack = document.querySelectorAll(".item-catalog__link_back"),
        itemFront = document.querySelectorAll(".item-catalog-front"),
        itemBack = document.querySelectorAll(".item-catalog-back");

    btnsFront.forEach((item, i) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            itemFront[i].classList.toggle("item-catalog-front_active");
            itemBack[i].classList.toggle("item-catalog-back_active");
        });
    });

    btnsBack.forEach((item, i) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            itemFront[i].classList.toggle("item-catalog-front_active");
            itemBack[i].classList.toggle("item-catalog-back_active");
        });
    });

    //</Reversal>=================================================================================================

    //<Poppap>=================================================================================================

    const btnsConsultation = document.querySelectorAll('[data-modal="consultation"]'),
        btnsOrder = document.querySelectorAll('[data-modal="order"'),
        modalConsultation = document.querySelector("#consultation"),
        modalOrder = document.querySelector("#order"),
        modalOrderDescr = modalOrder.querySelector(".modal__descr"),
        modalThanks = document.querySelector("#thanks"),
        modalClose = document.querySelectorAll(".modal__close"),
        overlay = document.querySelector(".overlay"),
        catalogItemsName = document.querySelectorAll(".item-catalog__name");
    btnsConsultation.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            overlay.classList.remove("hide");
            modalConsultation.classList.remove("hide");
            document.body.style.cssText = "overflow: hidden";
        });
    });
    btnsOrder.forEach((btn, i) => {
        btn.addEventListener("click", (e) => {
            overlay.classList.remove("hide");
            modalOrder.classList.remove("hide");
            modalOrderDescr.textContent = catalogItemsName[i].textContent;
            document.body.style.cssText = "overflow: hidden";
        });
    });

    modalClose.forEach((item) => {
        item.addEventListener("click", () => {
            overlay.classList.add("hide");
            modalConsultation.classList.add("hide");
            modalOrder.classList.add("hide");
            modalThanks.classList.add("hide");
            document.body.style.cssText = "overflow: ";
        });
    });

    //</Poppap>=================================================================================================
});
