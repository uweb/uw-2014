// Baseline setup
// --------------

// Establish the root object `window`.
var root = this

// Create a safe reference to the UAMS object which will be used to establish the global UAMS object.
var UAMS = function(obj)
{
    if ( obj instanceof UAMS ) return obj

    if ( ! ( this instanceof UAMS )) return new UAMS(obj)

    this._wrapped = obj
};

// Establish the global UAMS object `window.UAMS`
root.UAMS = UAMS


// Current version
UAMS.VERSION = '0.1'

// Constant for legible keycodes
UAMS.KEYCODES = {
  TAB: 9,
  ENTER : 13,
  ESC : 27
}
