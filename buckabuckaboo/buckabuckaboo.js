
/**
 * BUCKA-BUCKA-BOO
 * Web site mouse tracking plugin
 *
 * @module BUCKA
 * @namespace BUCKA
 */

var BUCKA = {};

/**
 * Global variables found in the BUCKA namespace,
 * including the browser window dimensions,
 * calculated using technique from
 * http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript
 * via http://stackoverflow.com/a/11744120
 *
 * @class vars
 * @constructor
 * @namespace BUCKA
 * @property w window
 * @property d document
 * @property e document element
 * @property g document body
 * @property ping Image object (used to transmit mouse position data to the server)
 * @property srvr url to the 1x1 image used by ping
 */
BUCKA.vars = {
    w : window,
    d : document 
}
BUCKA.vars.e = BUCKA.vars.d.documentElement;
BUCKA.vars.g = BUCKA.vars.d.getElementsByTagName('body')[0];
BUCKA.vars.ping = new Image();
BUCKA.vars.srvr = null;

/**
 * Cross-browser event handling, from jresig's blog:
 * http://ejohn.org/projects/flexible-javascript-events/
 *
 * @method addEvent
 * @param obj  DOM object to attach the event handler/listener
 * @param type event type
 * @param fn   function to invoke when type event occurs on obj
 */
BUCKA.addEvent = function ( obj, type, fn ) {
  if ( obj.attachEvent ) {
    obj['e'+type+fn] = fn;
    obj[type+fn] = function(){obj['e'+type+fn]( BUCKA.vars.w.event );}
    obj.attachEvent( 'on'+type, obj[type+fn] );
  } else
    obj.addEventListener( type, fn, false );
}

/**
 * Capture the current mouse position and transmit that info to the server hosting this script,
 * only if the mouse's x,y coordinates can be determined, and BUCKA.vars.srvr has been defined
 *
 * @method mousemover
 * @param evt event object
 */
BUCKA.mousemover = function (evt) {
    if( BUCKA.vars.srvr != null ) {
	var x = evt.pageX,
	    y = evt.pageY,
	    w = BUCKA.vars.w.innerWidth || BUCKA.vars.e.clientWidth || BUCKA.vars.g.clientWidth,
	    h = BUCKA.vars.w.innerHeight|| BUCKA.vars.e.clientHeight|| BUCKA.vars.g.clientHeight,
	  src = encodeURIComponent(window.location);
	if( x == null && evt.clientX != null ) {
	    x = evt.clientX + (BUCKA.vars.e && BUCKA.vars.e.scrollLeft || BUCKA.vars.g && BUCKA.vars.g.scrollLeft || 0)
		- (BUCKA.vars.e && BUCKA.vars.e.clientLeft || BUCKA.vars.g && BUCKA.vars.g.clientLeft || 0);
	    y = evt.clientY + (BUCKA.vars.e && BUCKA.vars.e.scrollTop  || BUCKA.vars.g && BUCKA.vars.g.scrollTop  || 0)
		- (BUCKA.vars.e && BUCKA.vars.e.clientTop  || BUCKA.vars.g && BUCKA.vars.g.clientTop  || 0);
	}
	BUCKA.vars.ping.src = BUCKA.vars.srvr+'/1x1.gif?x='+x+'&y='+y+'&w='+w+'&h='+h+'&src='+src;
    }
}

/**
 * An initialization function to set the BUCKA.vars.srvr
 * value and add the proper event handler for mouse tracking.
 *
 * @method init
 * @param srvr value of BUCKA.vars.srvr,
 *             i.e., the url to the 1x1 image used by ping
 */
BUCKA.init = function ( srvr ) {
    BUCKA.vars.srvr = srvr;
    BUCKA.addEvent(BUCKA.vars.g,"mouseover",BUCKA.mousemover);
}
