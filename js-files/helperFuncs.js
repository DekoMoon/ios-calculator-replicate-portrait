'use strict';

/************
* Helper Function
*************/

const setValueToNumberClicked = function(setVal, button) {
  if (button.textContent === '.') setVal('0.');
  else setVal(button.textContent);
};

const addNumToActiveValue = function({
  getAcVal,
  setAcVal,
}, button) {
  const newActiveValue = getAcVal() + button.textContent;
  setAcVal(newActiveValue);
};

const getAnsAndSetItAsBackgValue = function({
  getAcVal,
  getBgVal,
  setBgVal,
  getOpVal,
}, textLabel, operation) {
  const numBackgroundValue = Number.parseFloat(getBgVal());
  const numActiveValue = Number.parseFloat(getAcVal());
  const ans = operation(numBackgroundValue, getOpVal(), numActiveValue);
  const strAns = String(ans);
  setBgVal(strAns);
  textLabel.textContent = strAns;
};

const copyActiveToBackground = function({ getAcVal, setBgVal }) {
  setBgVal(getAcVal());
};

const calcRemainder = function(getVal, setVal) {
  const valueDivided = String(getVal() / 100); // Type Coercion'ed
  return setVal(valueDivided);
};

const calcChangeSign = function(getVal, setVal) {
  let newValue;

  if (getFunc() == 0) {
    newValue = getVal() === '0' ? '-0' : '0';
  } else {
    newValue = String(-getVal()); // Type Coercion'ed
  }

  return setVal(newValue);
};

const specialFnSetValues = function({
  getAcVal,
  setAcVal,
  getBgVal,
  setBgVal,
  isAfterEq,
}, runFn) { // TODO: Refactor the else statement, I don't like them
  if (!isAfterEq()) return runFn(getAcVal(), setAcVal());
  else return runFn(getBgVal(), setBgVal());
};

const removeDash = function(string) {
  return string.replaceAll('-', '');
};

const valueToFormat = function({
  getAcVal,
  getBgVal,
  isAfterEq
}) {
  return isAfterEq() ? getBgVal() : getAcVal();
};

const separateStrNum = function(string) {
  const regex = /(\-)?(\d+)(\.)?(\d+)?/;
  const [, negative, wholeNumber, dot, decimalNumber] = string.match(regex);
  return [negative, wholeNumber, dot, decimalNumber];
};

const addComma = function(stringNum) { // maybe use regex in the future
  const array = stringNum.split('');
  const addToThisIndex1 = array.length - 3;
  const addToThisIndex2 = array.length - 6;

  array.splice(addToThisIndex1, 0, ',');
  if (array.length > 7) array.splice(addToThisIndex2, 0, ',');

  return array.join('');
};





/************
* Return True or False
*************/

const mainExistAndEqualJustClicked = function({ isAfterEq }, doMainVarExist) {
  return isAfterEq() && doMainVarExist();
};

const isFirstRoundAndNoBackgroundValue = function({ bgExists }) {
  return !bgExists();
};

const valueIsAZero = function(getVal) {
  return getVal() == 0;
};

const isDigitAboveEight = function(getVal) {
  const length = Array.from(getVal())
    .filter(function(character) {
      return Number(character) ? true : false; 
    }).length;
  return length > 8;
};

const isNegativeString = function(string) {
  return string[0] === '-';
};


/************
* Operation and Navigate to Functions
*************/

const operation = function({getAcVal, getBgVal}, operator) {
  switch (operator) {
    case '/':
      return getBgVal() / getAcVal();

    case 'x':
      return getBgVal() * getAcVal();

    case '-':
      return getBgVal() - getAcVal();

    case '+':
      return getBgVal() + getAcVal();

    default:
      alert('ERROR, operation');
  }
};

const specialClicked = function(button) {
  switch (true) {
    case button.classList.contains('clear'):
      clearClicked(button);
      break;

    case button.classList.contains('change-sign'):
      changeSignClicked(button);
      break;

    case button.classList.contains('remainder'):
      remainderClicked(button);
      break;

    default:
      alert('ERROR, specialClicked');
  }
};








const doMainVarExist = function({
  acExists,
  bgExists,
  opExists,
}) {
  return acExists() && bgExists() && opExists();
};

