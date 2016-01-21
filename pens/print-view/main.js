/*
 * main.js
 */
var $$ = function(selector){
  this.context = document.querySelector(selector);
  return this;
};

$$.prototype = {
  addClass: function(classname){
    if(this.context.getAttribute('class')){ // has class
      if(this.context.getAttribute('class').indexOf(classname) !== -1){ // 已存在，暂不考虑全字匹配
        return;
      } else { // 不存在
        this.context.setAttribute('class', this.context.getAttribute('class') + ' ' +classname);
      }
    } else { // new class
      this.context.setAttribute('class', classname);
    }

    return this;
  },
  removeClass: function(classname){
    this.context.getAttribute('class') && this.context.setAttribute('class', this.context.getAttribute('class').replace(new RegExp('\\s*' + classname, 'g'), ' '));
    return this;
  },
  addEvent: function(type, listener){
    var that = this;
    var func = function(){
      listener.apply(that.context)
    };
    this.context.addEventListener(type, func);
    return this;
  }
};

var page = new $$('#page');

var size = new $$('#size');
size.addEvent('change', function(){
  for (i = 0, l = this.options.length; i < l; i += 1) {
    if(i === this.selectedIndex) continue;
    page.removeClass(this.options[i].value);
  }
  page.addClass(this.value);
});

var orientation = new $$('#orientation');
orientation.addEvent('change', function(){
  for (i = 0, l = this.options.length; i < l; i += 1) {
    if(i === this.selectedIndex) continue;
    page.removeClass(this.options[i].value);
  }
  page.addClass(this.value);
});

if(interact){
  interact('#page-config').draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    restrict: {
      restriction: "body",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
      //
    }
  });
}

function dragMoveListener (event) {
  var target = event.target,
      // keep the dragged position in the data-x/data-y attributes
      x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

  // update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}
