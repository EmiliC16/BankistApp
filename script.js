'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal) );

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


//scrolling
const btnScrollTo= document.querySelector ('.btn--scroll-to');
const section1= document.querySelector('#section--1');
btnScrollTo.addEventListener('click', function(e) {
  const s1coords= section1.getBoundingClientRect();
  window.scrollTo(
    s1coords.left+window.scrollX , 
    s1coords.top + window.scrollY  ,
  );
  section1.scrollIntoView({behavior:'smooth'});

});

//Page Navigation

// document.querySelectorAll('.nav__link').forEach(function(el){
//   el.addEventListener('click', function(e){
//     e.preventDefault();
//       const id = this.getAttribute('href');
//       console.log(id);
//       document.querySelector(id).scrollIntoView({behavior:'smooth'});
//   });
// })

// 1.Add event listener to common parent element

// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener
('click', function(e) {
  e.preventDefault();
    
  //matring strategy
if(e.target.classList.contains('nav__link')) {
  const id = e.target.getAttribute('href');
     console.log(id);
     document.querySelector(id).scrollIntoView({
     behavior:'smooth'});
}
  
});
// Tabbed Component
const tabs= document.querySelectorAll('.operations__tab'); 
const tabsContainer= document.querySelector('.operations__tab-container'); 
const tabsContent= document.querySelectorAll('.operations__content'); 

tabsContainer.addEventListener('click',function(e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);
  // Guard Clause
  if(!clicked) return;
  // Active Tab
  tabs.forEach( t => t.classList.remove('operations__tab--active'))
  clicked.classList.add('operations__tab--active');

  // Activate Content Area
  tabsContent.forEach( t => t.classList.remove('operations__content--active'))
 
  document
  .querySelector(`.operations__content--${clicked.dataset.tab}`)
  .classList.add('operations__content--active');
});
///------- MENU FADE ANIMATION--------
const nav = document.querySelector('.nav');

const handleHover = function(e,opacity){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav')
    .querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach( el => {
      if( el !== link ) el.style.opacity = this;
    });
    logo.style.opacity = this;
}
}

  nav.addEventListener('mouseover',handleHover.bind(0.5));
  nav.addEventListener('mouseout',handleHover.bind(1));

  //Sticky navigation
  // const initialCoords= section1.getBoundingClientRect();
  // console.log(initialCoords);
  // window.addEventListener('scroll', function(e) {
  // //  console.log(window.scrollY);
  //   if(this.window.scrollY > initialCoords.top) nav.classList.add('sticky')

  //   else nav.classList.remove('sticky')
  // })
//   const obsCallback=function(entries, observer){
//     entries.forEach(entry => {
//       console.log(entry);
//     });

//   };
//   const obsOptions = {
//     root: null,
//     threshold: [0, 0.2],
//   }
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;


const stickyNav= function(entries){
  const [entry] = entries;
  console.log(entry);
  if(!entry.isIntersecting) {
  nav.classList.add('sticky');
} 
else  nav.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver
(stickyNav, {
root: null,
threshold: 0,
rootMargin:`-${navHeight}px`,
});
headerObserver.observe(header);


// Reveal Sections

const allSections = document.querySelectorAll('.section');
const revealSection= function (entries, observer){
  const [entry] = entries;
  if(!entry.isIntersecting) return ;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);

}
const sectionObserver = new IntersectionObserver(
  revealSection, {
    root: null,
    threshold: 0.15,
  }
)
allSections.forEach(function(section){
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
})


// -----Lazy loading images-------
const imgTargets=  document.querySelectorAll('img[data-src]');

const loadImg = function(entries,observer){
  const [entry]=entries;
  if(!entry.isIntersecting) return ;
  //--Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-100px',
});

imgTargets.forEach(img => imgObserver.observe(img));

// Slides
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left'); // Corrected class name
const btnRight = document.querySelector('.slider__btn--right'); // Corrected class name
const dotContainer = document.querySelector('.dots')

let curSlide = 0;
const maxSlide = slides.length;

// const slider = document.querySelector('.slider');
// slider.style.transform = 'scale(0.5) translateX(-800px)';
// slider.style.overflow = 'visible';

const createDots = function(){
  slides.forEach(function(_, i)
{
    dotContainer.insertAdjacentHTML('beforeend', 
    `<button class="dots__dot" data-slide="${i}"></button>`);
});
};
createDots();

const activateDot = function(slide){
  document
  .querySelectorAll('.dots__dot')
  .forEach(dot => dot.classList
  .remove('dots__dot--active'))

  document
  .querySelector(`.dots__dot[data-slide="${slide}"]`)
  .classList.add('dots__dot--active');
};
activateDot(0);

const goToSlide = function(slide){
  slides.forEach
  (
     (s, i) => (s.style.transform = `translateX(
    ${100 * (i-slide)}%)`)
  );
 };


// Next slide
const nextSlide = function () {
  if (curSlide === maxSlide-1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
}

const prevSlide = function(){
  if(curSlide === 0){
     curSlide = maxSlide - 1;
  }else {
     curSlide--;
  }
  goToSlide(curSlide);
  activateDot(curSlide);

};
const init = function(){
  goToSlide(0);

}
init()

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function(e) {
  console.log(e);
  if(e.key === 'ArrowLeft') prevSlide();
  e.key ==='ArrowRight' && nextSlide();
});

dotContainer.addEventListener('click', function(e){
  if(e.target.classList.contains('dots__dot')){
    const {slide} = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  };
})

/*
///----------Selecting Elements ----------
const header = document.querySelector('.header');
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

const allSelectors = document.querySelectorAll('.section');
// console.log(allSelectors);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);

// console.log(document.getElementsByClassName('btn'));

///----------Creating And Inserting Elements----------

const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent = 'We use cookies for imroved functionality and analytics';
message.innerHTML= 'We use cookies for imroved functionality and analytics.<button class="btn btn--close-coookie"> Got it!</button>';
//header.prepend(message);

//prepend adds the element as the first chiild of the header element
header.append(message);

//append adds the element as the last chiild of the header element
//header.append(message.cloneNode(true));

//-------inserts it as a sibling---

//header.before(message); 
//header.after(message);

//delete elements

document
.querySelector('.btn--close-coookie')
.addEventListener('click', function(){
  message.remove();
});

//styles
message.style.backgroundColor='#37383d';
message.style.width = '120%';
// console.log(message.style.backgroundColor);
// console.log(getComputedStyle(message).height);

message.style.height = Number.parseFloat( getComputedStyle(message)
.height, 10)+ 30 +'px';
/*
document.documentElement.style.setProperty
('--color-primary', 'orangered');

//Atributes (src, alt, className...)
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);

logo.alt='minimalist looogoo';
// For nonStandard attributes
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');
console.log(logo.src);
console.log(logo.getAttribute('src'));

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// Data attributes
console.log(logo.dataset.versionNumber);
// Classes 
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c'); 
//---!!don't use!!---
logo.className= 'jonas'


const btnScrollTo= document.querySelector ('.btn--scroll-to');
const section1= document.querySelector('#section--1');



section1.scrollIntoView({behavior:'smooth'});
});

const h1 = document.querySelector('h1');

const alert1 = function(e){

  alert('addEventListener: Great! You are reading the heading :D');
  h1.removeEventListener('mouseenter', alert1)
};
h1.addEventListener ('mouseenter', alert1);

const randomInt = (min,max)=>
Math.floor(Math.random() * (max-min+1)+min);
const randomColor = () => `rgb(${0,255}, ${randomInt(0,255)}, ${randomInt(0,255)})`;
console.log(randomColor(0,255));

document.querySelector('.nav__link').addEventListener('click', function(e){
console.log('LINK');
this.style.backgroundColor = randomColor();

//stop propagation
//e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function(e){
  console.log('LINK');
  this.style.backgroundColor = randomColor();
  });
  document.querySelector('.nav').addEventListener('click', function(e){
    console.log('LINK');
    this.style.backgroundColor = randomColor();
    }); 
*/

// const h1 = document.querySelector ('h1');
// // downwards: child
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'white';

// //upwards : parents

// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest('.header').style.background = 'var(--gradient-secondary)'
// //going sideways: siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el){
// if( el !== h1) el.style.transform='scale(0.5)';
// });

document.addEventListener('DOMContentLoaded', function(e){
  console.log('HTML parsed and DOM tree built', e);
});

window.addEventListener('load', function(e){
  console.log('Page loaded', e);
});

// window.addEventListener('beforeunload', e => {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });