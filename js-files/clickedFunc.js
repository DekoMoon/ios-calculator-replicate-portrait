'use strict';




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
      if (valueIsAZero(values)) setValueToNumberClicked(values.setActiveValue, button);
      else if (isDigitAboveEight(values.getActiveValue)) return;
      else addNumToActiveValue(values, button, setValueToNumberClicked);
    }
  }

  textLabel.textContent = values.getActiveValue();
};

const equalClicked = function(button) {
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


























