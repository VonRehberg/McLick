$('body').append("<div id='ext-mouse-move'></div>");
$('body').append("<div id='ext-mouse-down'></div>");
$('body').append("<div id='ext-mouse-up'></div>");

var mouseMoveHighlight = $("#ext-mouse-move");
var mouseDownHighlight = $("#ext-mouse-down");
var mouseUpHighlight = $("#ext-mouse-up");

var mouseMoveColor = 'rgba(255, 10, 10, 0.7)',
    mouseMoveSize = '100',
    mouseMoveBorderColor = 'rgba(65,65,190,0.7)',
    mouseMoveBorderSize = '0',
    mouseDownColor = 'rgba(255,255,255,0)',
    mouseDownSize = '25',
    mouseDownBorderColor = 'rgba(64,64,191,0.5)',
    mouseDownBorderSize = '5',
    mouseUpColor = 'rgba(255,255,255,0)',
    mouseUpSize = '20',
    mouseUpBorderColor = 'rgba(65,65,190,0.6)',
    mouseUpBorderSize= '4';

function mouseMove(e){
  var x = e.clientX-mouseMoveHighlight.outerWidth()/2;
  var y = e.clientY-mouseMoveHighlight.outerHeight()/2;


//Fix so it works if the webpage is removing it from the dom
  if(mouseMoveHighlight.parent().length == 0) {
    mouseMoveHighlight = $('<div id="ext-mouse-move"></div>');
    mouseMoveHighlight.appendTo($('body'));
  }

  if(mouseDownHighlight.parent().length == 0) {
    mouseDownHighlight = $('<div id="ext-mouse-down"></div>');
    mouseDownHighlight.appendTo($('body'));
  }

  if(mouseUpHighlight.parent().length == 0) {
    mouseUpHighlight = $('<div id="ext-mouse-up"></div>');
    mouseUpHighlight.appendTo($('body'));
  }

  mouseMoveHighlight.css({
        'position': 'fixed',
        'z-index': '99999999',
        "pointer-events": 'none',
        'top':y,
        'left':x,
        "border-radius": "50%",
        "width": mouseMoveSize+'px',
        "height": mouseMoveSize+'px',
        "border": mouseMoveBorderSize+"px solid "+ mouseMoveBorderColor,
        "background-color": mouseMoveColor,
        "display": "inline",
  });
}

function mouseDown(e){
  var x = e.clientX-mouseDownHighlight.outerWidth()/2;
  var y = e.clientY-mouseDownHighlight.outerHeight()/2;

  if (mouseDownHighlight.outerHeight() === 0) {
    mouseDownHighlight.css({
      "border-radius": "50%",
      "width": mouseDownSize+'px',
      "height": mouseDownSize+'px',
      "border": mouseDownBorderSize+"px solid "+ mouseDownBorderColor
    });
    x = e.clientX-mouseDownHighlight.outerWidth()/2;
    y = e.clientY-mouseDownHighlight.outerHeight()/2;
  }

  mouseDownHighlight.css({
        'position': 'fixed',
        'z-index': '99999999',
        "pointer-events": 'none',
        'top':y,
        'left':x,
        "border-radius": "50%",
        "width": mouseDownSize+'px',
        "height": mouseDownSize+'px',
        "border": mouseDownBorderSize+"px solid "+ mouseDownBorderColor,
        "background-color": mouseDownColor,
        "display": "inline",
    });
    mouseDownHighlight.fadeOut(300);
}

function mouseUp(e){
  var x = e.clientX-mouseUpHighlight.outerWidth()/2;
  var y = e.clientY-mouseUpHighlight.outerHeight()/2;

  if (mouseUpHighlight.outerHeight() === 0) {
    mouseUpHighlight.css({
      "border-radius": "50%",
      "width": mouseUpSize+'px',
      "height": mouseUpSize+'px',
      "border": mouseUpBorderSize+"px solid "+ mouseUpBorderColor
    });
    x = e.clientX-mouseUpHighlight.outerWidth()/2;
    y = e.clientY-mouseUpHighlight.outerHeight()/2;
  }

  mouseUpHighlight.css({
        'position': 'fixed',
        'z-index': '99999999',
        "pointer-events": 'none',
        'top':y,
        'left':x,
        "border-radius": "50%",
        "width": mouseUpSize+'px',
        "height": mouseUpSize+'px',
        "border": mouseUpBorderSize+"px solid "+ mouseUpBorderColor,
        "background-color": mouseUpColor,
        "display": "inline",
    });
    mouseUpHighlight.fadeOut(300);
}

function ext_on() {
  console.log("On");
  $(window).mousemove(mouseMove);
  $(window).mousedown(mouseDown);
  $(window).mouseup(mouseUp);
}

function ext_off() {
  console.log("Off");
  $(window).unbind('mousemove',mouseMove);
  $(window).unbind('mousedown',mouseDown);
  $(window).unbind('mouseup',mouseUp);

  mouseMoveHighlight.css({
    'display': 'none'
  });
  mouseDownHighlight.css({
    'display': 'none'
  });
  mouseUpHighlight.css({
    'display': 'none'
  });
}

chrome.storage.local.get(['mouseClickActive'], function(result) {
  if (result.mouseClickActive) {
    ext_on();
  }
});