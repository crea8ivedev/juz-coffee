document.addEventListener("DOMContentLoaded", () => {
  // Tab Functionality
  const tabLinks = document.querySelectorAll(".tabs__link");
  const tabAreas = document.querySelectorAll(".tabs__area");

  tabLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");

      // Activate clicked tab
      tabLinks.forEach((lnk) =>
        lnk.parentElement.classList.remove("tabs__item--active"),
      );
      this.parentElement.classList.add("tabs__item--active");

      // Show corresponding content
      tabAreas.forEach((area) => area.classList.remove("tabs__area--active"));
      const targetTab = document.querySelector(targetId);
      if (targetTab) {
        targetTab.classList.add("tabs__area--active");
      }
    });
  });

  // Accordion Functionality
  const togglers = document.querySelectorAll("[data-toggle]");

  togglers.forEach((btn) => {
    btn.addEventListener("click", toggleFAQ);
    btn.addEventListener("keydown", (e) => {
      if (["Enter", " ", "Spacebar"].includes(e.key)) {
        e.preventDefault();
        toggleFAQ(e);
      }
    });
  });

  function toggleFAQ(e) {
    const btn = e.currentTarget;
    const selector = btn.dataset.toggle;
    const block = document.querySelector(selector);

    togglers.forEach((otherBtn) => {
      const otherSelector = otherBtn.dataset.toggle;
      const otherBlock = document.querySelector(otherSelector);
      if (otherBtn !== btn) {
        otherBtn.classList.remove("active");
        otherBtn.setAttribute("aria-expanded", "false");
        if (otherBlock) {
          otherBlock.style.maxHeight = null;
        }
      }
    });

    const isActive = btn.classList.contains("active");
    btn.setAttribute("aria-expanded", !isActive);
    btn.classList.toggle("active");

    if (block) {
      block.style.maxHeight = isActive ? null : `${block.scrollHeight}px`;
    }
  }

  // collection filter loop start

  const filterSection = document.getElementById("collection-filter-section");
  const btn_next = document.getElementById("next-collection-button");

  if (!filterSection || !btn_next) {
    return;
  }

  const script = document.getElementById("collection-data-json");
  if (!script) {return;}

  let collections;
  try {
    collections = JSON.parse(script.textContent);
  } catch (e) {
    return;
  }

  const currentPath = window.location.pathname
    .replace(/^\/collections\//, "")
    .replace(/\/$/, "");

  const currentIndex = collections.findIndex(
    (col) => col.handle === currentPath,
  );

  if (currentIndex === -1) {
    return;
  }

  const nextIndex = (currentIndex + 1) % collections.length;

  const nextCollection = collections[nextIndex];

  btn_next.href = nextCollection.url;

  // collection filter loop end
});

// Recommend Slider PDP
function initializeSwiperIfAvailable() {
  const swiperContainer = document.querySelector(".related-products-swiper");

  if (
    swiperContainer &&
    !swiperContainer.classList.contains("swiper-initialized")
  ) {
    new Swiper(swiperContainer, {
      slidesPerView: 1.2,
      spaceBetween: 16,
      loop: false,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        768: {
          slidesPerView: 2.5,
        },
        1024: {
          slidesPerView: 3.5,
        },
      },
    });

    swiperContainer.classList.add("swiper-initialized");
  }
}

document.addEventListener("shopify:section:load", initializeSwiperIfAvailable);
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(initializeSwiperIfAvailable, 1000); // Wait for AJAX to finish
});
