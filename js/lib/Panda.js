var P = (function() {
    var Constructor = function(selector) {
        this.elems = (document.querySelectorAll(selector).length > 2) ? document.querySelector(selector) : document.querySelectorAll(selector);
    };


    Constructor.prototype.each = function(callback) {
        if (!callback || typeof callback !== 'function') return;
        for (var i = 0; i < this.elems.length; i++) {
            callback(this.elems[i], i);
        }
    };

    Constructor.prototype.css = function(style, value) {
        this.each(function(elem) {
            elem.style[style] = value;
        });
    };

    Constructor.prototype.html = function(value) {
        this.each(function(elem) {
            elem.innerHTML = value;
        });
    };

    Constructor.prototype.hide = function() {
        this.each(function(elem) {
            elem.style.visibility = "hidden";
        });
    };

    Constructor.prototype.show = function() {
        this.each(function(elem) {
            elem.style.visibility = "visible";
        });
    };

    Constructor.prototype.click = function(callback) {
        this.each(function(elem) {
            elem.addEventListener("click", callback);
        });
    };

    var instantiate = function(selector) {
        return new Constructor(selector);
    };


    return instantiate;
})();