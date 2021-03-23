'use strict';

// TODO: Add all other buttons' functionality
// TODO: Don't allow decimal places to wreck the 9 max digit rule
// TODO: Change operations to bigint
// TODO: Start using e at 1e9
// TODO: Allow num < 1e161
// TODO: Allow num > 1e-101
// TODO: Refactor functions in values



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

// TODO: 88622.4888 is at 9 digits, can't display sign as negative (BUG)
const changeSignClicked = function(button) {
  textLabel.textContent = 
    specialFnSetValues(values, rightAfterEqualClicked, calcChangeSign);
};

const remainderClicked = function(button) {
  textLabel.textContent = 
    specialFnSetValues(values, rightAfterEqualClicked, calcRemainder);;
};

const operatorClicked = function(button) {
  // round 1, 0 x 9 error
  switch (true) {
    case rightAfterEqualClicked(values):
      values.setEqualJustClicked(false);
      break;

    case values.doMainVarExist():
      getAnsAndSetItAsBackgValue(values, textLabel, operation);
      break;
  }

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
      if (valueIsStrZero(values)) setValueToNumberClicked(values.setActiveValue, button);
      else if (isDigitAboveEight(values.getActiveValue)) return;
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
  const valueDivided = getFunction() / 100;
  return setFunction(valueDivided);
};

const calcChangeSign = function(getFunction, setFunction) {
  const valueChangedSign = -getFunction();
  return setFunction(valueChangedSign);
};

const removeComma = function(string) {
  return string.replaceAll(',', '');
};

const removeDash = function(string) {
  return string.replaceAll('-', '');
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

const valueIsStrZero = function(values) {
  return values.getActiveValue() === '0';
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
* Format Strings When Length is Below 10
*************/


const digitsBelowTen = function() {
  const lengthWithoutDot = removeDash(removeComma(textLabel.textContent)).replace('.', '').length;
  return lengthWithoutDot < 10;
};

const formatWithComma = function() { // Potential Bug: Be careful of decimal values
  const separateDecimalArr = removeDash(removeComma(textLabel.textContent)).split('.')
  const wholeNumbers = separateDecimalArr[0];
  const decimalNumbers = separateDecimalArr[1] ? `.${separateDecimalArr[1]}` : '';
  if (wholeNumbers.length <= 3) return textLabel.textContent;

  const formatWholeNumbers = function() { // Dear god this is terrible, make sure to refactor later
    const negativeSign = isNegativeString(wholeNumbers) ? wholeNumbers[0] : '';
    const arrayVersion = isNegativeString(wholeNumbers) ? 
      wholeNumbers.slice(1, wholeNumbers.length - 1).split('') : 
      wholeNumbers.split('');

    const addToThisIndex1 = arrayVersion.length - 3;
    const addToThisIndex2 = arrayVersion.length - 6;

    if (arrayVersion.length > 3 && arrayVersion.length < 7) {
      arrayVersion.splice(addToThisIndex1, 0, ',');
    }
    else if (arrayVersion.length > 6) {
      arrayVersion.splice(addToThisIndex1, 0, ',');
      arrayVersion.splice(addToThisIndex2, 0, ',');
    }

    return negativeSign + arrayVersion.join('');
  };

  return formatWholeNumbers() + decimalNumbers;
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

  if (digitsBelowTen()) textLabel.textContent = formatWithComma();

  checkVariables();
});



















