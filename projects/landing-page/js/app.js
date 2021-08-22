/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav

// Add class 'active' to section when near top of viewport

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

// Scroll to section on link click

// Set sections as active

/**
 * Logic:
 * File all sections and build li a using data-nav values
 * append section id into li and bind new onClick event on parent
 * on click of parent check for tag (try/catch) and scroll to view
 * remove all old active class and add into new active element
 */
let nav = null;
let allSection = null;
const activeClass = "active";

function buildMenu() {
  let addActive = ` ${activeClass}`;
  allSection.forEach((section) => {
    const newLi = document.createElement("li");
    const anchor = document.createElement("a");
    anchor.setAttribute("class", `menu__link${addActive} ${section.id}`);
    addActive = "";
    const newContent = document.createTextNode(section.dataset.nav);
    anchor.appendChild(newContent);
    anchor.dataset.section = section.id;
    newLi.appendChild(anchor);
    nav.appendChild(newLi);
  });

  const selectedLink = document.querySelector(`a.${activeClass}`);
  const sectionId = selectedLink.dataset.section;
  const section = document.querySelector(`#${sectionId}`);
  // if (section) {
  //   setTimeout(() => {
  //     section.scrollIntoView({
  //       behavior: "smooth",
  //     });
  //   }, 50);
  // }
}

function handleScrollOnClick() {
  nav.addEventListener("click", function (e) {
    try {
      const sectionId = e.target.dataset.section;
      setSelectedSection(sectionId);
      setSelectedMenu();
      e.target.classList.add(activeClass);
    } catch (e) {
      console.log(e);
    }
  });
}

function setSelectedSection(sectionId, scroll = true) {
  const section = document.querySelector(`#${sectionId}`);
  allSection.forEach((section) => section.classList.remove(activeClass));
  section.classList.add(activeClass);
  if (scroll) {
    section.scrollIntoView({
      behavior: "smooth",
    });
  }
}

function setSelectedMenu() {
  const allLinks = document.querySelectorAll("a.menu__link");
  allLinks.forEach((section) => section.classList.remove(activeClass));
}

function handleWindowScroll() {
  document.addEventListener("scroll", (e) => {
    const sections = document.querySelectorAll("section");
    const mid = 200; //screen.height / 2;
    for (let i = 0; i < sections.length; i++) {
      const cords = sections[i].getBoundingClientRect();
      if (cords.top >= 0 && cords.top <= mid) {
        setSelectedSection(sections[i].getAttribute("id"), false);
        setSelectedMenu();
        const link = document.querySelector(
          `a.${sections[i].getAttribute("id")}`
        );
        if (link) {
          link.classList.add(activeClass);
        }

        break;
      }
    }
  });
}

function main() {
  nav = document.querySelector("#navbar__list");
  allSection = document.querySelectorAll("section");
  buildMenu();
  handleScrollOnClick();
  handleWindowScroll();
}
