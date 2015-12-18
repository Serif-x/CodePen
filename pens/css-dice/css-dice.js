/*!
 * CSS Dice
 *
 * Author: Serifx Xiao <Serifx@outlook.com>
 * Further changes: Serifx Xiao
 * Date: 2015/12/18
 *
 * Copyright (c) 2015 Serifx Xiao
 * Licensed under the MIT license
 */

;(function(window, document, Math, undefined){
  function $(selector){
    return document.querySelector(selector);
  }
  function addClass(ele, className){
    ele.setAttribute('class', ele.getAttribute('class') ? ele.getAttribute('class').replace(/^.*\w+.*$/, ' ' + className) : className);
  }
  function removeClass(ele, className){
    ele.getAttribute('class') && ele.setAttribute('class', ele.getAttribute('class').replace(new RegExp(' ' + className, 'g'), ''));
  }

  var $dice = $('#dice');
  var $diceResult = $('#dice-count');
  var dots = ['dice1', 'dice2', 'dice3', 'dice4', 'dice5', 'dice6'];

  $('#btn-start').addEventListener('click', function(){
    $diceResult.innerHTML = '';
    addClass($dice, 'shuffling'); // start

    var countDown = Math.floor(Math.random() * 6) + 5;
    var dot = Math.floor(Math.random() * 6) % 6 + 1;

    var timer = setInterval(function(){
      if (countDown <= 0) {
        clearInterval(timer);
        setTimeout(function(){
          setDots(dot - 1);
          removeClass($dice, 'shuffling'); // end
          $diceResult.innerHTML = dot;
        }, 1000);
      }

      countDown--;
    }, 1000);
  });

  function setDots(dot){
    addClass($dice, dots[dot]);
  }
})(window, document, Math);
