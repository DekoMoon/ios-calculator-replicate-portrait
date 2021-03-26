'use strict';




/************
* Clicked Function 
*************/

const clearClicked = function(button) {
  init();
};


const changeSignClicked = function(button) {
  textLabel.textContent = 
    specialFnSetValues(values, calcChangeSign);
};

const remainderClicked = function(button) {
  textLabel.textContent = 
    specialFnSetValues(values, calcRemainder);
};

const operatorClicked = function(button) {
  // round 1, 0 x 9 error
  switch (true) {
    case values.isAfterEq():
      values.setAfterEq(false);
      break;

    case doMainVarExist(values):
      getAnsAndSetItAsBackgValue(values, textLabel, operation);
      break;
  }

  values.setOpVal(button.textContent);
  values.setAfterOp(true);
};

const numberClicked = function(button) {
  switch (true) {
    case mainExistAndEqualJustClicked(values): {
      init();
      setValueToNumberClicked(values.setAcVal, button);
      break;
    }

    case values.isAfterOp(): {
      if (isFirstRoundAndNoBackgroundValue(values)) copyActiveToBackground(values);
      setValueToNumberClicked(values.setAcVal, button);
      values.setAfterOp(false);
      break;
    }

    default: {
      if (valueIsAZero(values.getAcVal)) setValueToNumberClicked(values.setAcVal, button);
      else if (isDigitAboveEight(values.getAcVal)) return;
      else addNumToActiveValue(values, button);
    }
  }

  textLabel.textContent = values.getAcVal();
};

const equalClicked = function(button) {
  switch (true) {
    case doMainVarExist(values): {
      getAnsAndSetItAsBackgValue(values, textLabel, operation);
      break;
    }
    
    case isFirstRoundAndNoBackgroundValue(values): {
      if (!values.opExists()) return;
      copyActiveToBackground(values);
      getAnsAndSetItAsBackgValue(values, textLabel, operation);
      break;
    }

    default: {
      alert('ERROR, equalClicked');
      return;
    }
  }

  values.setAfterEq(true);
};


























