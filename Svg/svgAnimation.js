

// svg animation
(function() {
  var DURATION = 40;

  /**
   * 封装svg中dom对象的动画
   * @param {string} selector 
   * @param {object} options 
   */
  function move(selector, options) {
    var block = $(selector),
      time = options.time,
      timeout = options.timeout || 0,
      currentX = options.currentX,
      currentY = options.currentY;

    setTimeout(handleMove, timeout);

    function handleMove() {
      var offsetX = currentX - parseFloat(block.attr('x')),
      offsetY = currentY - parseFloat(block.attr('y')),
      speedX = offsetX / time * DURATION,
      speedY = offsetY / time * DURATION;

      var timer = setInterval(function() {
        block.attr('x', parseFloat(block.attr('x')) + speedX);
        block.attr('y', parseFloat(block.attr('y')) + speedY);
      }, DURATION);

      setTimeout(function() {
        clearInterval(timer)
      }, time);
    }
  }

  var $car = '#svg-transport-car';
  move($car, { time: 5000, currentX: 483, currentY: 163, timeout: 0 });
  move($car, { time: 10000, currentX: 609, currentY: 240, timeout: 5000 });
})();

