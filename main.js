'use strict';


/************
* Variables 
*************/

const container = document.querySelector('.container');
const textLabel = document.querySelector('.label');

const values = function() {
  let operator = '';
  let activeValue = 0;
  let backgroundValue = 0;
  let equalJustClicked = false;
  let operatorJustClicked = false;

  const getOperator = () => operator;
  const setOperator = (value) => operator = value;
  const operatorExists = () => operator ? true : false;

  const getActiveValue = () => activeValue;
  const setActiveValue = (value) => activeValue = value;
  const activeValueExists = () => activeValue !== 0 ? true : false; // Could be shortened

  const getBackgroundValue = () => backgroundValue;
  const setBackgroundValue = (value) => backgroundValue = value;
  const backgroundValueExists = () => backgroundValue !== 0 ? true : false; // Could be shortened

  const getEqualJustClicked = () => equalJustClicked;
  const setEqualJustClicked = (value) => equalJustClicked = value;

  const setOperatorJustClicked = (value) => operatorJustClicked = value;
  const getOperatorJustClicked = () => operatorJustClicked;

  const doMainVarExist = () => operator && activeValue && backgroundValue;

  const init = function() {
    operator = '';
    activeValue = 0;
    backgroundValue = 0;
    equalJustClicked = false;
    operatorJustClicked = false;
    textLabel.textContent = 0;
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
* Main Function 
*************/

const clearClicked = function(button) {
  values.init();
}

const changeSignClicked = function(button) {
}

const remainderClicked = function(button) {
}

const operatorClicked = function(button) {
  if (rightAfterEqualClicked(values)) {
    values.setEqualJustClicked(false);
  }
  values.setOperator(button.textContent);
  values.setOperatorJustClicked(true);
};

const numberClicked = function(button) { 
  if (mainExistAndEqualJustClicked(values)) {
    values.init();
    setValueToNumberClicked(values.setActiveValue, button);
  }
  else if (rightAfterOperatorClicked(values)) { // TODO: Problem? Did it replace ans with lastActiveValue?...
    if (isFirstRoundAndNoBackgroundValue(values)) {
      const lastActiveValue = values.getActiveValue();
      values.setBackgroundValue(lastActiveValue);
    }
    setValueToNumberClicked(values.setActiveValue, button);
    values.setOperatorJustClicked(false);
  }
  else {
    addNumToMainValue(values, button);
  }

  textLabel.textContent = values.getActiveValue();
  checkVariables();
};

const dotClicked = function(button) {
  // Ok... annoying one lol
  // How do you store 0.00000?
  // We could store it as an array, string or as an increment


};

const equalClicked = function(button) {
  // Potential Bug: What happens when you press enter while 2nd number is -0?

  if (values.doMainVarExist()) {
    getAnsAndSetItAsBackgValue(values, textLabel);
  }
  else if (isFirstRoundAndNoBackgroundValue(values)) {
    if (!values.operatorExists()) return;
    copyActiveToBackground(values);
    getAnsAndSetItAsBackgValue(values, textLabel);
  } 
  else {
    alert('ERROR, equalClicked');
    return;
  }

  values.setEqualJustClicked(true);
  checkVariables();
};





/************
* Abstraction & Encapsulation Functions 
*************/

const setValueToNumberClicked = function(setFunction, button) {
  const numberConvertedTextContent = Number(button.textContent);
  setFunction(numberConvertedTextContent);
};

const addNumToMainValue = function(values, button) {
  const newActiveValue = Number(values.getActiveValue() + button.textContent);
  values.setActiveValue(newActiveValue);
};

const getAnsAndSetItAsBackgValue = function(values, textLabel) {
  const ans = operation(values.getBackgroundValue(), values.getOperator(), values.getActiveValue());
  values.setBackgroundValue(ans);
  textLabel.textContent = ans;
};

const copyActiveToBackground = function(values) {
  values.setBackgroundValue(values.getActiveValue());
};

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





/************
* Check Variables
*************/

const checkVariables = function() {
  console.log(`
    Date: ${new Date().getSeconds()},
    Active Value: ${values.getActiveValue()},
    Operator Value: ${values.getOperator()},
    Background Value: ${values.getBackgroundValue()},
    Equal Clicked Just Now?: ${values.getEqualJustClicked()},
    Operator Clicked Just Now?: ${values.getOperatorJustClicked()},
  `);
};




/************
* Operation and Get to Main Functions
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
    
    case button.classList.contains('dot'):
      dotClicked(button);
      break;

    case button.classList.contains('equal'):
      equalClicked(button);
      break;

    default:
      alert('ERROR, container');
  }
});



















