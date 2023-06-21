// ***************** ПЛАВНЫЙ СКРОЛЛ ДО БЛОКА ***************** //

const headerLinks = document.querySelectorAll('.content-header__link[data-goto]');
if (headerLinks.length > 0) {
   headerLinks.forEach(headerLink => {
      headerLink.addEventListener("click", onHeaderLinkCkick);
   });

   function onHeaderLinkCkick(e) {
      const headerLink = e.target;
      if (headerLink.dataset.goto && document.querySelector(headerLink.dataset.goto)) {
         const gotoBlock = document.querySelector(headerLink.dataset.goto);
         const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;

         if (iconMenu.classList.contains('_active')) {
            document.body.classList.remove('_lock');
            iconMenu.classList.remove('_active');
            menuBody.classList.remove('_active');
         }

         window.scrollTo({
            top: gotoBlockValue,
            behavior: "smooth"
         });
         e.preventDefault();
      }
   }

};

// ***************** МЕНЮ БУРГЕР***************** //

const iconMenu = document.querySelector('.content-header__menu-icon');
const menuBody = document.querySelector('.content-header__list');
if (iconMenu) {
   iconMenu.addEventListener("click", function (e) {
      document.body.classList.toggle('_lock');
      iconMenu.classList.toggle('_active');
      menuBody.classList.toggle('_active');
   });
}

// ***************** ЗАДАВАНИЕ КЛАССА ШАПКЕ ***************** //

//Записываем, сколько проскроллено по вертикали
let scrollpos = window.scrollY

const header = document.querySelector("header")

//Сколько пикселей нужно проскролить, чтобы добавить класс. Можете изменить значение
const scrollChange = 5

//Функция, которая будет добавлять класс
const add_class_on_scroll = () => header.classList.add("header__scroll")
const remove_class_on_scroll = () => header.classList.remove("header__scroll")

//Отслеживаем событие "скролл"
window.addEventListener('scroll', function () {
   scrollpos = window.scrollY;

   //Если прокрутили больше, чем мы указали в переменной scrollChange, то выполняется функция добавления класса
   if (scrollpos >= scrollChange) { add_class_on_scroll() }
   else { remove_class_on_scroll() }
})

// ***************** АНИМАЦИЯ ПРИ СКРОЛЛЕ ДО БЛОКА ***************** //

function onEntry(entry) {
   entry.forEach(change => {
      if (change.isIntersecting) {
         change.target.classList.add('element-show');
      }
   });
}
let options = { threshold: [0.5] };
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll('.element-animation');
for (let elm of elements) {
   observer.observe(elm);
}