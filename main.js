'use strict';

// TODO: Add Core Features ✅
// TODO: Add commas to textLabels when digits are below 10 ✅
// TODO: Use Git for Version Control ✅
// TODO: Add all other buttons' functionality ✅

// TODO: Add exception to last todo, when number is (999,999,999), allow up to 5 decimal places
// TODO: Change operations to bigint
// TODO: Start using e at 1e9
// TODO: Allow num < 1e161
// TODO: Allow num > 1e-101
// TODO: Refactor functions in values

// What to do tomorrow:
// FIXME: Pressing operator multiple time after 'n x n x' operates things, which should not be possible.
// TODO: Don't allow decimal places to wreck the 9 max digit rule


/************
* Variables 
*************/

const container = document.querySelector('.container');
const textLabel = document.querySelector('.label');

const values = function() {
  let operator = '';
  let activeValue = '';
  let backgroundValue = '';
  let equalJustClicked = false;
  let operatorJustClicked = false;

  const getOperator = () => operator;
  const setOperator = (value) => operator = value;
  const operatorExists = () => operator ? true : false;

  const getActiveValue = () => activeValue;
  const setActiveValue = (value) => activeValue = value;
  const activeValueExists = () => activeValue !== '0' ? true : false; // Could be shortened

  const getBackgroundValue = () => backgroundValue;
  const setBackgroundValue = (value) => backgroundValue = value;
  const backgroundValueExists = () => backgroundValue !== '0' ? true : false; // Could be shortened

  const getEqualJustClicked = () => equalJustClicked;
  const setEqualJustClicked = (value) => equalJustClicked = value;

  const setOperatorJustClicked = (value) => operatorJustClicked = value;
  const getOperatorJustClicked = () => operatorJustClicked;

  const doMainVarExist = () => operatorExists() && activeValueExists() && backgroundValueExists();

  const init = function() {
    operator = '';
    activeValue = '0';
    backgroundValue = '0';
    equalJustClicked = false;
    operatorJustClicked = false;
    textLabel.textContent = '0';
  };


  return {
    getOperator,
    setOperator,
    operatorExists,

    getActiveValue,
    setActiveValue,
    activeValueExists,

    getBackgroundValue,
    setBackgroundValue,
    backgroundValueExists,

    getEqualJustClicked,
    setEqualJustClicked,

    setOperatorJustClicked,
    getOperatorJustClicked,

    doMainVarExist,
    init,
  };
}();

values.init();








/************
* Clicked Function 
*************/

const clearClicked = function(button) {
  values.init();
};

const changeSignClicked = function(button) {
  textLabel.textContent = 
    specialFnSetValues(values, rightAfterEqualClicked, calcChangeSign);
};

const remainderClicked = function(button) {
  textLabel.textContent = 
    specialFnSetValues(values, rightAfterEqualClicked, calcRemainder);
};

const operatorClicked = function(button) {
  // round 1, 0 x 9 error
  if (rightAfterEqualClicked(values)) values.setEqualJustClicked(false);
  else if (values.doMainVarExist() && !values.getOperatorJustClicked()) getAnsAndSetItAsBackgValue(values, textLabel, operation);


  values.setOperator(button.textContent);
  values.setOperatorJustClicked(true);
};

const numberClicked = function(button) {
  switch (true) {
    case mainExistAndEqualJustClicked(values): {
      values.init();
      setValueToNumberClicked(values.setActiveValue, button);
      break;
    }

    case rightAfterOperatorClicked(values): {
      if (isFirstRoundAndNoBackgroundValue(values)) copyActiveToBackground(values);
      setValueToNumberClicked(values.setActiveValue, button);
      values.setOperatorJustClicked(false);
      break;
    }

    default: {
      if (valueIsAZero(values)) setValueToNumberClicked(values.setActiveValue, button);
      else if (isDigitAboveEight(values.getActiveValue())) return;
      else addNumToActiveValue(values, button, setValueToNumberClicked);
    }
  }

  textLabel.textContent = values.getActiveValue();
};

const equalClicked = function(button) {
  // Potential Bug: What happens when you press enter while 2nd number is -0?

  switch (true) {
    case values.doMainVarExist(): {
      getAnsAndSetItAsBackgValue(values, textLabel, operation);
      break;
    }
    
    case isFirstRoundAndNoBackgroundValue(values): {
      if (!values.operatorExists()) return;
      copyActiveToBackground(values);
      getAnsAndSetItAsBackgValue(values, textLabel, operation);
      break;
    }

    default: {
      alert('ERROR, equalClicked');
      return;
    }
  }

  values.setEqualJustClicked(true);
};





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

const rmDash = function(string) {
  return string.replaceAll('-', '');
};

const createNegNumDotDecimalObj = function(value) {
  const regex = /(\-)?(\d+)(\.)?(\d+)?/;
  const [, negative, wholeNumber, dot, decimalNumber] = value.match(regex);
  return [negative, wholeNumber, dot, decimalNumber];
};

const addComma = function(strNum) { // maybe use regex in the future
  const array = strNum.split('');
  const addToThisIndex1 = array.length - 3;
  const addToThisIndex2 = array.length - 6;

  array.splice(addToThisIndex1, 0, ',');
  if (array.length > 7) array.splice(addToThisIndex2, 0, ',');

  return array.join('');
};

const rmComma = function(strNum) {
  return strNum.replaceAll(',', '');
};

const getStrDigit = function(strNum, rmDash, rmComma) {
  return rmComma(rmDash(strNum));
};

const roundAns = function(ans) {
  if (!isDigitAboveEight(ans)) return ans;
  
}

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

const isDigitAboveEight = function(strNum) {
  const length = Array.from(strNum)
    .filter(function(char) {
      return !!Number(char); 
    }).length;
  return length > 8;
};

const isNegativeString = function(string) {
  return string[0] === '-';
};




/************
* Format Strings When Length is Below 10
*************/


const digitsBelowTen = function() {
  const lengthWithoutDot = 
    getStrDigit(textLabel.textContent, rmDash, rmComma).replace('.', '').length;
  return lengthWithoutDot < 10;
};

const formatWithComma = function(strNum) { 
  const [negative = '', wholeNumber, dot = '', decimalNumber = ''] = 
    createNegNumDotDecimalObj(rmComma(strNum));

  if (wholeNumber.length <= 3) return strNum;

  return negative + addComma(wholeNumber) + dot + decimalNumber;
};





/************
* Check Variables
*************/

const checkVariables = function() {
  const date = new Date();
  console.log(`
    Date: ${date.getMinutes()}:${date.getSeconds()},
    Active Value: ${values.getActiveValue()},
    Operator Value: ${values.getOperator()},
    Background Value: ${values.getBackgroundValue()},
    Equal Clicked Just Now?: ${values.getEqualJustClicked()},
    Operator Clicked Just Now?: ${values.getOperatorJustClicked()},

    Text Label: ${textLabel.textContent}
  `);
};




/************
* Operation and Navigate to Clicked Functions
*************/

const operation = function(backgroundValue, operator, activeValue) {
  let ans;

  switch (operator) {
    case '/':
      ans = backgroundValue / activeValue;
      break;

    case 'x':
      ans = backgroundValue * activeValue;
      break;

    case '-':
      ans = backgroundValue - activeValue;
      break;

    case '+':
      ans = backgroundValue + activeValue;
      break;

    default:
      alert('ERROR, operation');
  }

  return roundAns(ans); // Violated by using outside scope but ok for now..
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





/************
* Event Handler
*************/

container.addEventListener('click', function(event) {
  const button = event.target;
  if (button.tagName !== 'BUTTON') return;

  switch (true) {
    case button.classList.contains('special'):
      specialClicked(button);
      break;

    case button.classList.contains('operator'):
      operatorClicked(button);
      break;
    
    case button.classList.contains('number'):
      numberClicked(button);
      break;

    case button.classList.contains('equal'):
      equalClicked(button);
      break;

    default:
      alert('ERROR, container');
  }

  // (whole num + (decimals rounded)).length < 10,
  // exception when number is (999,999,999): allow up to +5 decimal places
  if (digitsBelowTen()) textLabel.textContent = formatWithComma(textLabel.textContent);

  checkVariables();
});



















