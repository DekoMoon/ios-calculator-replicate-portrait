'use strict';

/************
* Variables 
*************/

const container = document.querySelector('.container');
const textLabel = document.querySelector('.label');
const clearButton = document.querySelector('.clear');
let prevOp;

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
    clearButton.textContent = 'AC';
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
  if (values.getEqualJustClicked() && isFalsy(values.getBackgroundValue())) {
    values.setActiveValue('-0');
    textLabel.textContent = values.getActiveValue();
    console.log('PLS NO');
    return;
  } 

  if (values.getOperatorJustClicked()) {
    values.setBackgroundValue(values.getActiveValue());
    values.setActiveValue('-0');
    textLabel.textContent = '-0';
    values.setOperatorJustClicked(false);
    return;
  }

  textLabel.textContent = 
    specialFnSetValues(values, calcChangeSign);
};

const remainderClicked = function(button) {
  textLabel.textContent = 
    specialFnSetValues(values, calcRemainder);
};

const operatorClicked = function(button) {
  // round 1, 0 x 9 error
  if (values.getEqualJustClicked()) values.setEqualJustClicked(false);
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

    case values.getOperatorJustClicked(): {
      if (isFirstRoundAndNoBackgroundValue(values)) copyActiveToBackground(values);
      setValueToNumberClicked(values.setActiveValue, button);
      values.setOperatorJustClicked(false);
      break;
    }

    default: { // Add num to active value
      if (valueIsAZero(values)) setValueToNumberClicked(values.setActiveValue, button);
      else if (digitAboveSpecified(values.getActiveValue(), 8)) return;
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
  values.setOperatorJustClicked(false);
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

  return setFunction(newValue);
};

const specialFnSetValues = function(values, modifyValue) {
  if (values.getOperatorJustClicked()) {
    return modifyValue(
      values.getBackgroundValue, 
      values.setBackgroundValue
    );
  } 
  else { // Change active value
    return modifyValue(
      values.getActiveValue, 
      values.setActiveValue
    );
  }
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

const rmDash = function(string) {
  return string.replaceAll('-', '');
};

const getStrDigit = function(strNum, rmDash, rmComma) {
  return rmComma(rmDash(strNum));
};

const roundDeci = function(ans, digitAboveSpecified, roundTo) {
  if (!digitAboveSpecified(ans, roundTo)) return ans;
  
  const permittedDeci = roundTo - ans.replace('-', '').split('.')[0].length;
  const roundedAns = Number(ans).toFixed(permittedDeci);
  const trailingZeroRemoved = Number(roundedAns).toString();
  return trailingZeroRemoved;
};


const overMaxExpForm = function(ans) {
  let currentAns = ans;
  let exponent = 0;
  let total;

  do {
    if (currentAns >= 10) {
      currentAns /= 10;
      exponent++;
    }
    else if (currentAns < 1) {
      currentAns *= 10;
      exponent--;
    }
  } while (currentAns >= 10 || currentAns < 1);

  total = `${+currentAns.toFixed(5)}e${exponent}`;
  if (total > 9e15 || total < 1e-16) return 'Error';

  return (+total).toString() ? total : 'Error';
};



// -------------------------------- //

const mainExistAndEqualJustClicked = function(values) {
  return values.doMainVarExist() && values.getEqualJustClicked();
};

const isFirstRoundAndNoBackgroundValue = function(values) {
  return !values.backgroundValueExists();
};

const valueIsAZero = function(values) {
  return values.getActiveValue() === '0';
};

const digitAboveSpecified = function(strNum, specifiedLength) {
  const length = Array.from(strNum)
    .filter(function(char) {
      return typeof Number(char) === 'number'; 
    }).length;
  return length > specifiedLength;
};

const isNegativeString = function(string) {
  return string[0] === '-';
};

const isFalsy = function(value) {
  const strVal = String(value);
  return strVal === 'Error' || strVal === 'NaNe0' || strVal === 'NaN';
};



/************
* Format Strings When Length is Below 10
*************/


const digitsBelowTen = function() {
  if (isFalsy(textLabel.textContent)) return false;

  const lengthWithoutDot = 
    (+getStrDigit(textLabel.textContent, rmDash, rmComma).replace('.', '')).toString().length;
  return lengthWithoutDot < 10;
};

const formatWithComma = function(strNum) { 
  const [negative = '', wholeNumber, dot = '', decimalNumber = ''] = 
    createNegNumDotDecimalObj(rmComma(strNum));

  if (wholeNumber.length <= 3) return strNum;

  return negative + addComma(wholeNumber) + dot + decimalNumber;
};





// /************
// * Check Variables
// *************/

// const checkVariables = function() {
//   const date = new Date();
//   console.log(`
//     Date: ${date.getMinutes()}:${date.getSeconds()},
//     Active Value: ${values.getActiveValue()},
//     Operator Value: ${values.getOperator()},
//     Background Value: ${values.getBackgroundValue()},
//     Equal Clicked Just Now?: ${values.getEqualJustClicked()},
//     Operator Clicked Just Now?: ${values.getOperatorJustClicked()},

//     Text Label: ${textLabel.textContent}
//   `);
// };




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

  // Using outside scope but ok for now..
  if (ans < (10 ** 9) && ans > (10 ** -9)) ans = roundDeci(String(ans), digitAboveSpecified, 9);
  else if (ans != 0) ans = overMaxExpForm(ans);

  return ans;
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
  rmPrevOpClass();

  switch (true) {
    case button.classList.contains('special'):
      specialClicked(button);
      flash(button);
      break;

    case button.classList.contains('operator'):
      operatorClicked(button);
      hold(button);
      break;
    
    case button.classList.contains('number'):
      numberClicked(button);
      flash(button);
      clearButton.textContent = 'C';
      break;

    case button.classList.contains('equal'):
      equalClicked(button);
      flash(button);
      break;

    default:
      alert('ERROR, container');
  }

  if (digitsBelowTen()) textLabel.textContent = formatWithComma(textLabel.textContent);
  if (isFalsy(textLabel.textContent)) textLabel.textContent = 'Error';
});



















/************
* Manipulate the Buttons
*************/

const flash = function(button, time = 500) {
  button?.classList.add('disappear-transition');

  setTimeout(() => button?.classList.remove('disappear-transition'), time);
};



const hold = function(button) {
  button.classList.add('operator-active');
  prevOp = button;
};

const rmPrevOpClass = function() {
  flash(prevOp);
  prevOp?.classList.remove('operator-active');
};