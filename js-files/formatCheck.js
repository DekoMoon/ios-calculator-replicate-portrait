'use strict';

/************
* Check Variables
*************/

const checkVariables = function() {
  const date = new Date();
  const {
    getActiveVal,
    getBgVal,
    getOpVal,
    isAfterEq,
    isAfterOp,
  } = values;

  console.log(`
    Date: ${date.getMinutes()}:${date.getSeconds()},
    Active Value: ${getActiveVal()},
    Operator Value: ${getOpVal()},
    Background Value: ${getBgVal()},
    Equal Clicked Just Now?: ${isAfterEq()},
    Operator Clicked Just Now?: ${isAfterOp()},

    Text Label: ${textLabel.textContent}
  `);
};





/************
* Format Strings
*************/

const digitsBelowTen = function() {
  const lengthWithoutDot = 
    removeDash(valueToFormat(values)).replace('.', '').length;
  return lengthWithoutDot < 10;
};

const formatWithComma = function() { 
  const [negative = '', wholeNumber, dot = '', decimalNumber = ''] = 
    separateStrNum(valueToFormat(values));

  if (wholeNumber.length <= 3) return valueToFormat(values);

  return negative + addComma(wholeNumber) + dot + decimalNumber;
};


const formatBigAndSmallNum = function() {
  if (valueToFormat(values)) ;
};





/************
* Init
*************/

const init = function() {
  const {
    setAcVal,
    setBgVal,
    setOpVal,
    setAfterEq,
    setAfterOp,
  } = values;

  setOpVal('');
  setAcVal('0');
  setBgVal('0');
  setAfterEq(false);
  setAfterOp(false);
  textLabel.textContent = '0';
};