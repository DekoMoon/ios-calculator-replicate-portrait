'use strict';

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
* Format Strings
*************/

const digitsBelowTen = function() {
  const lengthWithoutDot = 
    removeDash(valueToFormat(values)).replace('.', '').length;
  return lengthWithoutDot < 10;
};

const formatWithComma = function() { 
  const [negative = '', wholeNumber, dot = '', decimalNumber = ''] = 
    createNegNumDotDecimalObj(valueToFormat(values));

  if (wholeNumber.length <= 3) return valueToFormat(values);

  return negative + addComma(wholeNumber) + dot + decimalNumber;
};


const formatBigAndSmallNum = function() {
  if (valueToFormat(values)) ;
};

