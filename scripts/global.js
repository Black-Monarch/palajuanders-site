//Function Calls
isOnMobile();
showCurrentPage();

//Functions
function showCurrentPage() {
  const path = window.location.pathname;
}

function isOnMobile() {
  const mediaQuery = window.matchMedia('(max-width: 1100px)')
  if (mediaQuery.matches) {
    addMenuClickListener();
  } else {
    showCurrentPage();
  }
}

function addMenuClickListener() {
  const menu = document.querySelector('.menu-icon');
  menu.addEventListener('click', () => {
    menu.classList.toggle('click');

    const nav = document.querySelector('nav');
    nav.classList.toggle('show');
    nav.classList.toggle('viewport-size');
  });
}