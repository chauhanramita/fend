//
let nav = null;
// 
let allSection = null;
//This variable sets the active class to active
const activeClass = "active";

/**
 * This function is  used to build the menu
 */
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
}

/**
 * This function is used to handle scrolling when the menu item is clicked
 */
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

/**
 * This function is removing active class from existing and adding it to the current menu links
 * @param {*} sectionId 
 * @param {*} scroll 
 */
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
/**
 * This function is removing the active class from existing  adding it to the current menu
 */
function setSelectedMenu() {
  const allLinks = document.querySelectorAll("a.menu__link");
  allLinks.forEach((link) => link.classList.remove(activeClass));
}

/**
 * This  function handles the window scrolling and selects the section and menus
 */
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

/** This is the main function which handles the complete functionality of the page using all other functions
 * 
 */
function main() {
  nav = document.querySelector("#navbar__list");
  allSection = document.querySelectorAll("section");
  buildMenu();
  handleScrollOnClick();
  handleWindowScroll();
}
