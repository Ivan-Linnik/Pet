'use strict';
//========================Toggle theme of the site=====================//
const body = document.body;
const toggleTheme = document.getElementById('toggle-theme');

function handleToggleTheme() {
  if (toggleTheme.checked) {
    body.setAttribute('dark', '');
    localStorage.setItem('setTheme', toggleTheme.checked);
  } else if (toggleTheme.checked == false) {
    body.removeAttribute('dark');
    localStorage.setItem('setTheme', toggleTheme.checked);
  }
}

toggleTheme.addEventListener('click', handleToggleTheme);

//========================Toggle language of the site=====================//
const wordsOnPage = {
  title: {
    ru: 'Иван Линник',
    en: 'Ivan Linnik',
  },
  nav__about: {
    ru: 'обо мне',
    en: 'about me',
  },
  nav__works: {
    ru: 'мои работы',
    en: 'my works',
  },
  nav__contacts: {
    ru: 'контакты',
    en: 'contacts',
  },
  toggle__rus: {
    ru: 'ру',
    en: 'rus',
  },
  toggle__eng: {
    ru: 'eng',
    en: 'eng',
  },
  CV: {
    ru: 'скачать резюме',
    en: 'download CV',
  },
  'worker-info': {
    ru: 'Фронтенд разработчик',
    en: 'Frontend developer',
  },
  'age-city': {
    ru: '29 лет, Батайск',
    en: '29 y.o., Bataysk',
  },
  skills__header: {
    ru: 'мои навыки',
    en: 'skillset',
  },
  'works-header': {
    ru: 'мои работы',
    en: 'my works',
  },
  calculator: {
    ru: 'калькулятор',
    en: 'calculator',
  },
  thisSite: {
    ru: 'этот сайт',
    en: 'this site',
  },
  reactApp: {
    ru: 'react список дел',
    en: 'react todo app',
  },
  tryApp: {
    ru: 'страница приложения',
    en: 'application page',
  },
};

const langSwitcher = document.getElementById('languages-input');
const cvButton = document.querySelector('.lng-CV');

function changeLang() {
  if (langSwitcher.checked) {
    changeLang.lang = 'en';
    document.querySelector('title').innerText =
      wordsOnPage['title'][changeLang.lang];
    localStorage.setItem('setLang', langSwitcher.checked);
    cvButton.setAttribute('href', './docs/CV__Linnik-Ivan-en.pdf');
  } else {
    changeLang.lang = 'ru';
    document.querySelector('title').innerText =
      wordsOnPage['title'][changeLang.lang];
    localStorage.setItem('setLang', langSwitcher.checked);
    cvButton.setAttribute('href', './docs/CV__Linnik-Ivan-ru.pdf');
  }

  for (let key of Object.keys(wordsOnPage)) {
    let elem = document.querySelector('.lng-' + key);

    if (elem) {
      elem.innerText = wordsOnPage[key][changeLang.lang];
    }
  }
}

window.addEventListener('DOMContentLoaded', changeLang);
langSwitcher.addEventListener('click', changeLang);

//========================Check local storage for checkboxes condition=====================//
function checkStorage() {
  if (localStorage.getItem('setLang') === 'true') {
    langSwitcher.checked = true;
    changeLang();
  }
  if (localStorage.getItem('setTheme') === 'true') {
    toggleTheme.checked = true;
    handleToggleTheme();
  }
}

checkStorage();

//========================Dropdown contacts list work=====================//
function showContacts() {
  document
    .querySelector('.lng-nav__contacts')
    .addEventListener('click', (event) => {
      event.preventDefault();
      event.target.classList.toggle('showContacts');
    });

  document.body.addEventListener('click', (event) => {
    if (event.target !== document.querySelector('.lng-nav__contacts')) {
      document
        .querySelector('.lng-nav__contacts')
        .classList.remove('showContacts');
    }
  });
}

showContacts();

//========================Menu-burger work=====================//
const menu = document.querySelector('.header__service');
const menuBurger = document.querySelector('.header__burger');

function burgerWork() {
  if (menuBurger) {
    menuBurger.addEventListener('click', () => {
      menu.classList.toggle('active');
      menuBurger.classList.toggle('active');
      body.classList.toggle('lock');
      document.querySelector('.content').classList.toggle('hidden');
    });
  }

  document.querySelectorAll('.navigation__link').forEach((elem) => {
    elem.addEventListener('click', () => {
      if (!elem.classList.contains('lng-nav__contacts')) {
        menu.classList.remove('active');
        menuBurger.classList.remove('active');
        body.classList.remove('lock');
        document.querySelector('.content').classList.remove('hidden');
      }
    });
  });
}

burgerWork();

//========================Smooth scroll to anchors=====================//
const anchors = document.querySelectorAll('a[href*="#"]');

for (let item of Object.values(anchors)) {
  if (item.classList.contains('navigation__link')) {
    item.addEventListener('click', (event) => {
      event.preventDefault();

      const blockId = item.getAttribute('href').substring(1);

      document.getElementById(blockId).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }
}

//========================Coloring for anchors=====================//
anchors[0].classList.add('activeNavLink');

window.addEventListener('scroll', () => {
  let scrollValueY = window.scrollY;
  let headerHeight = document.querySelector('header').clientHeight;

  document.querySelectorAll('section').forEach((item, index) => {
    if (item.offsetTop - headerHeight <= scrollValueY) {
      anchors.forEach((item) => {
        if (item.classList.contains('activeNavLink')) {
          item.classList.remove('activeNavLink');
        }
        anchors[index].classList.add('activeNavLink');
      });
    }
  });

  animateBlocks();
});

//========================Scroll animation=====================//
function animateBlocks() {
  const blocks = document.querySelectorAll('.willAnimate');
  let windowCenter = window.innerHeight / 3 + window.scrollY;
  let headerSize =
    document.querySelector('.header').offsetHeight +
    document.querySelector('.header').clientHeight;

  blocks.forEach((block) => {
    let blockCenter = block.offsetTop + block.offsetHeight / 2 + headerSize;

    if (windowCenter >= blockCenter) {
      block.classList.add('_smoothHide');
    } else {
      block.classList.remove('_smoothHide');
    }
  });
}

//========================Initialise swiper=====================//
const swiper = new Swiper('.swiper-container', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: false,
    dynamicBullets: true,
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  mousewheel: {
    sensitivity: 1,
    eventsTarget: '.swiper-wrapper',
    forceToAxis: true,
  },
  loop: true,
});

//========================Calculator===========================//
const calculator = document.querySelector('.calc-body');
const calcScreen = document.querySelector('.calc-screen');

calculator.addEventListener('click', startCalculator);

const operators = ['+', '-', 'X', '/', '%'];
const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const condition = {
  value1: '',
  value2: '',
  operator: '',
};

function startCalculator(event) {
  if (!event.target.classList.contains('button')) return;

  const whatPressed = event.target.value;

  switch (whatPressed) {
    case 'AC':
      calcScreen.value = '';
      condition.value1 = '';
      condition.value2 = '';
      condition.operator = '';
      break;

    case 'C':
      calcScreen.value = calcScreen.value.substr(
        0,
        calcScreen.value.length - 1
      );

      if (condition.value1 && !condition.operator && !condition.value2) {
        condition.value1 = condition.value1.substring(
          0,
          condition.value1.length - 1
        );

        break;
      }
      if (condition.operator && !condition.value2) condition.operator = '';

      if (condition.value1 && condition.operator && condition.value2) {
        condition.value2 = condition.value2.substring(
          0,
          condition.value2.length - 1
        );

        break;
      }

      break;

    case '=':
      if (condition.value2 === '') condition.value2 = condition.value1;

      calcScreen.value = calculations();
      condition.value1 = calcScreen.value;
      calcScreen.value = condition.value1;
      condition.value2 = '';
      condition.operator = '';

      break;

    default:
      if (operators.includes(whatPressed) && !condition.value1) break;

      calcScreen.value += whatPressed;

      break;
  }

  if (digits.includes(whatPressed)) {
    if (condition.value1 === '' && condition.operator === '') {
      condition.value1 += whatPressed;
      calcScreen.value = condition.value1;
    } else if (condition.value1 && !condition.operator) {
      if (condition.value1.includes('.') && whatPressed === '.') {
        calcScreen.value = condition.value1.substring(-1);

        return;
      }

      condition.value1 += whatPressed;

      ///////////////////////////////////////////////////////////////////////////////////
      if (condition.value1.length > 7) {
        condition.value1 = condition.value1.substring(0, 7);
        calcScreen.value = condition.value1 + condition.operator;
      }
      ////////////////////////////////////////////////////////////////////////////////////

      if (condition.value1.startsWith('.')) {
        condition.value1 = '0' + condition.value1;
        calcScreen.value = '0' + calcScreen.value;
      } else if (
        condition.value1.startsWith('0') &&
        !condition.value1.includes('.')
      ) {
        condition.value1 = condition.value1.substring(1);
        calcScreen.value = calcScreen.value.substring(1);
      }
    } else if (condition.value1 && condition.operator) {
      if (condition.value2.includes('.') && whatPressed === '.') {
        calcScreen.value =
          condition.value1 +
          condition.operator +
          condition.value2.substring(-1);

        return;
      }

      condition.value2 += whatPressed;

      ///////////////////////////////////////////////////////////////////////////////////
      if (condition.value2.length > 7)
        condition.value2 = condition.value2.substring(0, 7);

      if (calcScreen.value.length > 7) calcScreen.value = condition.value2;

      ////////////////////////////////////////////////////////////////////////////////////
    }

    if (condition.value2.startsWith('.')) {
      condition.value2 = '0' + condition.value2;
      calcScreen.value =
        condition.value1 + condition.operator + condition.value2;
    } else if (
      condition.value2.startsWith('0') &&
      !condition.value2.includes('.')
    ) {
      condition.value2 = condition.value2.substring(1);
      calcScreen.value =
        condition.value1 + condition.operator + condition.value2;

      if (condition.value2.length < 1) {
        condition.value2 = '0';
        calcScreen.value =
          condition.value1 + condition.operator + condition.value2;
      }
    }
  }

  if (operators.includes(whatPressed) && condition.value1) {
    if (condition.value2 && condition.operator) {
      calcScreen.value =
        condition.value1 + condition.operator + condition.value2;

      return;
    }

    condition.operator = whatPressed;
    calcScreen.value = condition.value1 + condition.operator + condition.value2;
  }

  function calculations(value1, operator, value2) {
    value1 = parseFloat(condition.value1);
    value2 = parseFloat(condition.value2);
    operator = condition.operator;

    calculations.result = '';

    switch (operator) {
      case '+':
        calculations.result = value1 + value2;

        break;

      case '-':
        calculations.result = value1 - value2;

        break;

      case 'X':
        calculations.result = value1 * value2;

        break;

      case '/':
        if (value2 === 0) return value1;
        if (value1 === 0 && value2 === 0) return 0;

        calculations.result = value1 / value2;

        break;

      case '%':
        if (value1 === 0 || value2 === 0) return 0;

        calculations.result = (value2 / 100) * value1;

        break;

      default:
        calculations.result = calcScreen.value;
    }

    return calculations.result;
  }
}

//========================Check for fetching todo app===========================//
const appBlock = document.querySelector('.react-app');
const objectTag = document.querySelector('.lindo');
const url = 'https://ivan-linnik.github.io/Lindo/';

let request = fetch(url)
  .then((response) => {
    if (response.status === 200) {
      objectTag.setAttribute('data', url);
    } else {
      return;
    }
  })
  .catch((error) => {
    console.log(error.message);

    let appBlockErrorText = document.createElement('span');

    appBlockErrorText.innerText = !langSwitcher.checked
      ? 'Упс... Сервер не отвечает. Нажмите кнопку ниже.'
      : "Ups... Server isn't responding. Push button bellow.";

    appBlockErrorText.className = 'error-message';

    objectTag.remove();
    appBlock.appendChild(appBlockErrorText);
  });
