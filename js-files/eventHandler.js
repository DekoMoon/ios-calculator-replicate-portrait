'use strict';

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
  // if (digitsBelowTen()) textLabel.textContent = formatWithComma();
  // else formatBigAndSmallNum();

  checkVariables();
});
