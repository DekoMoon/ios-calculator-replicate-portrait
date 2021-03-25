'use strict';

/************
* Helper Function
*************/

const setValueToNumberClicked = function(setFunction, button) {
  if (button.textContent === '.') setFunction('0.');
  else setFunction(button.textContent);
};

const addNumToActiveValue = function(values, button, setValueToNumClicked) {
  const newActiveValue = values.getActiveValue() + button.textContent;
  values.setActiveValue(newActiveValue);
};

const getAnsAndSetItAsBackgValue = function(values, textLabel, operation) {
  const numBackgroundValue = Number.parseFloat(values.getBackgroundValue());
  const numActiveValue = Number.parseFloat(values.getActiveValue());
  const ans = operation(numBackgroundValue, values.getOperator(), numActiveValue);
  const strAns = String(ans);
  values.setBackgroundValue(strAns);
  textLabel.textContent = strAns;
};

const copyActiveToBackground = function(values) {
  values.setBackgroundValue(values.getActiveValue());
};

const calcRemainder = function(getFunction, setFunction) {
  const valueDivided = String(getFunction() / 100); // Type Coercion
  return setFunction(valueDivided);
};

const calcChangeSign = function(getFunction, setFunction) {
  let newValue;

  if (getFunction() == 0) {
    newValue = getFunction() === '0' ? '-0' : '0';
  } else {
    newValue = String(-getFunction()); // Type Coercion
  }

  console.log(newValue);
  return setFunction(newValue);
};

const specialFnSetValues = function(values, rightAfterEqualClicked, runFn) {
  if (rightAfterEqualClicked(values)) {
    return runFn(
      values.getBackgroundValue, 
      values.setBackgroundValue
    );
  } else {
    return runFn(
      values.getActiveValue, 
      values.setActiveValue
    );
  }
};

const removeDash = function(string) {
  return string.replaceAll('-', '');
};

const valueToFormat = function(values) { // Maybe implement this into clicker functions with another helper function to change justClicked and stuff
  if (values.getEqualJustClicked()) {
    return values.getBackgroundValue();
  } else {
    return values.getActiveValue();
  }
};

const createNegNumDotDecimalObj = function(value) {
  const regex = /(\-)?(\d+)(\.)?(\d+)?/;
  const [, negative, wholeNumber, dot, decimalNumber] = value.match(regex);
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

// -------------------------------- //

const mainExistAndEqualJustClicked = function(values) {
  return values.doMainVarExist() && values.getEqualJustClicked();
};

const rightAfterOperatorClicked = function(values) {
  return values.getOperatorJustClicked();
};

const rightAfterEqualClicked = function(values) {
  return values.getEqualJustClicked();
};

const isFirstRoundAndNoBackgroundValue = function(values) {
  return !values.backgroundValueExists();
};

const valueIsAZero = function(values) {
  return values.getActiveValue() == 0;
};

const isDigitAboveEight = function(getValue) {
  const length = Array.from(getValue())
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

const operation = function(backgroundValue, operator, activeValue) {
  switch (operator) {
    case '/':
      return backgroundValue / activeValue;

    case 'x':
      return backgroundValue * activeValue;

    case '-':
      return backgroundValue - activeValue;

    case '+':
      return backgroundValue + activeValue;

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











