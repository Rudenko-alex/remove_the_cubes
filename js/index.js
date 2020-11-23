'use strict';

/*-создаем таблицу-*/
let playingField = document.querySelector('.playing_field');
let table = document.createElement('table');
table.className = 'place';
playingField.append(table);
let k = 0;

/*- popup-*/
let popupWrap = document.querySelector('.popup-wrap');
let popup = document.querySelector('.popup');
let score = document.querySelector('.popup-score');
let saveScore = document.querySelector('.popup-save');

let closePopup = (e) => {
  popupWrap.classList.remove('popup-wrap_active');
};

popup.addEventListener('click', (e) => {
  e.stopPropagation();
});

saveScore.addEventListener('click', () => {
  let name = document.querySelector('#name');
  let nameVar = name.value;
  let arr = [];
  if (localStorage.getItem('score')) {
    arr = JSON.parse(localStorage.getItem('score'));
  }
  if (nameVar === '') {
    nameVar = 'Noname';
  }
  arr.push(`${nameVar}: ${point}`);
  localStorage.setItem('score', JSON.stringify(arr));
  closePopup();
  result.insertAdjacentHTML(
    'beforeend',
    `<p class="result">${nameVar}: ${point}</p>`
  );
});

/*-находим управление-*/
let start = document.querySelector('.btn-start');
let newGame = document.querySelector('.btn-Ngame');
let points = document.querySelector('.points');
let time = document.querySelector('.time');
let clearScore = document.querySelector('.btn-clear');
let result = document.querySelector('.result-table');
let sek = 60;
let point = 0;

/*-Выставляем score-*/

if (localStorage.getItem('score')) {
  let arr = [];
  arr = JSON.parse(localStorage.getItem('score'));
  arr.map((item) => {
    result.insertAdjacentHTML('beforeend', `<p class="result">${item}</p>`);
  });
}

clearScore.addEventListener('click', () => {
  localStorage.clear();
  location.reload();
});

let color = ['blue', 'green', 'red', 'white'];
/*-Создаем поле-*/
for (let i = 1; i <= 10; i++) {
  let tr = document.createElement('tr');
  tr.className = `row ${i}`;
  table.append(tr);
  for (let j = 1; j <= 10; j++) {
    let td = document.createElement('td');
    k++;
    td.className = `td${k}`;
    tr.append(td);
  }
}
let arr = [];
for (let i = 1; i <= k; i++) {
  arr.push(i);
}

/*-получаем случайное число в заданном интервале-*/
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

function colorNum(num) {
  switch (num) {
    case 0:
      return {
        colorName: color[num],
        colorTime: 500,
      };
    case 1:
      return {
        colorName: color[num],
        colorTime: 1000,
      };
    case 2:
      return {
        colorName: color[num],
        colorTime: 1500,
      };
    case 3:
      return {
        colorName: color[num],
        colorTime: 2000,
      };
  }
}

/*-появление кубиков -*/
function square() {
  let randomNumber = getRandomIntInclusive(0, arr.length - 1);
  let square = document.querySelector(`.td${arr[randomNumber]}`);

  let { colorName, colorTime } = colorNum(getRandomIntInclusive(0, 3));

  square.classList.toggle(colorName);
  setTimeout(() => {
    square.classList.toggle(colorName);
  }, colorTime);
}

/*-случайное появление кубиков от 0 до 3-*/
function countSquare() {
  for (let index = 0; index < getRandomIntInclusive(0, 3); index++) {
    square();
  }
  time.innerHTML = --sek;
}

table.addEventListener('click', (e) => {
  let tr = e.target;
  switch (true) {
    case tr.classList.contains('blue'):
      point = point + 4;
      points.innerHTML = point;
      tr.classList.toggle('blue');
      return;
    case tr.classList.contains('green'):
      point = point + 3;
      points.innerHTML = point;
      tr.classList.toggle('green');
      return;
    case tr.classList.contains('red'):
      point = point + 2;
      points.innerHTML = point;
      tr.classList.toggle('red');
      return;
    case tr.classList.contains('white'):
      point = point + 1;
      points.innerHTML = point;
      tr.classList.toggle('white');
      return;
  }
});

start.addEventListener(
  'click',
  () => {
    let timerId = setInterval(countSquare, 1000);

    setTimeout(() => {
      clearInterval(timerId);
      score.innerHTML = `Your score: ${point}`;
      popupWrap.classList.add('popup-wrap_active');
    }, 60000);
  },
  { once: true }
);

newGame.addEventListener('click', () => {
  location.reload();
});
