'use strict';

/************
* Variables 
*************/

const container = document.querySelector('.container');
const textLabel = document.querySelector('.label');


const Value = function(initialValue) {
  this._value = initialValue;
};

Value.prototype.get = function() {
  return this._value;
};

Value.prototype.set = function(input) {
  this._value = input;
  return this;
};

Value.prototype.exists = function() {
  if (!+this._value) return !!this._value;
  if (+this._value) return this._value !== '0';
};


const activeValue = new Value('0');
const backgroundValue = new Value('0');
const operatorValue = new Value('');
const equalJustClicked = new Value(false);
const operatorJustClicked = new Value(false);


const values = function(valProto) {
  const getBind = (value) => valProto.get.bind(value);
  const setBind = (value) => valProto.set.bind(value);
  const existsBind = (value) => valProto.exists.bind(value);

  return {
    getAcVal: getBind(activeValue),
    setAcVal: setBind(activeValue),
    acExists: existsBind(activeValue),

    getBgVal: getBind(backgroundValue),
    setBgVal: setBind(backgroundValue),
    bgExists: existsBind(backgroundValue),

    getOpVal: getBind(operatorValue),
    setOpVal: setBind(operatorValue),
    opExists: existsBind(operatorValue),

    setAfterEq: setBind(equalJustClicked),
    isAfterEq: existsBind(equalJustClicked),

    setAfterOp: setBind(operatorJustClicked),
    isAfterOp: existsBind(operatorJustClicked),
  }
}(Value.prototype);







