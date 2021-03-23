'use strict';


/**********
* Variables
***********/

const container = document.querySelector('.container');
const label = document.querySelector('.label');
const clearBtn = document.querySelector('.clear');

let prevNum = 0;
let operator = '';
let num = 0;
let ans = 0;





/**********
* Functions
***********/

// Init //

const init = function() {
  prevNum = 0;
  operator = '';
  num = 0;
  ans = 0;

  clearBtn.textContent = 'AC';
  label.textContent = 0;
};

init();

// Outsourced Function

const calcAnswer = function(num, operator, prevNum = num) {
  console.log(prevNum);
  switch(operator) {
    case '/':
      return prevNum / num;
    
    case 'x':
      return prevNum * num;

    case '-':
      return prevNum - num;

    case '+':
      return prevNum + num;
  }
}

// Button Pressed //

console.log(-num);

const specBtnClicked = function(classList) {
  // Pressing change-sign while there is an operator causes you to get 0 and the corresponding sign
  // Pressing remainer while there is an operator causes prevNum to change
  // init, num1, oper, num2, ans

  if (classList.contains('clear')) init();
  if (classList.contains('remainer')) num /= 100;

  if (operator && !prevNum) {
    if (classList.contains('change-sign')) {
      prevNum = num;
      num = -0;
    }
  } else {
    // (classList.contains('change-sign')) num = -num;
    // (classList.contains('remainer')) num /= 100;

  }

  // else if (classList.contains('change-sign')) num = -num;
  // else if (classList.contains('remainer')) num /= 100;

  label.textContent = num;
}

const operBtnClicked = function(btnContent) {
  operator = btnContent;
}

const equalBtnClicked = function() {
  // init, num1, operator, num2, ans
  const savedAns = calcAnswer(num, operator, prevNum || undefined);
  const savedNum = num;
  const savedOperator = operator;

  init();

  ans = savedAns;
  num = savedNum;
  operator = savedOperator;

  console.log(prevNum, ans, num, operator);
  label.textContent = ans;
}

const numBtnClicked = function(btnContent) {
  if (num.length >= 9) return;
  clearBtn.textContent = 'C';

  if (operator & !prevNum) {
    prevNum = num;
    num = Number(textContent);
  } else {
    num = Number(num + btnContent);
  }

  label.textContent = num;
}





/**********
* Event Handler
***********/


container.addEventListener('click', function(e) {
  const btnPressed = e.target;

  if (btnPressed.textContent.contains('special')) specBtnClicked(btnPressed.textContent);
  else if (btnPressed.textContent.contains('operator')) operBtnClicked(btnPressed.textContent);
  else if (btnPressed.textContent.contains('equal')) equalBtnClicked();
  else if (btnPressed.tagName === 'BUTTON') numBtnClicked(btnPressed.textContent);
});


// when you press 0 after a wipe, it doesn't change clear button textContent


// I could make things a bit simpler by combining the functionality of prevNum and prevPressedBtn