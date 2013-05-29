
$.fn.mousedrag = function (fn) {
    var that = this;
    this.mousedown(function (e) {
        that.isMouseDown = true;
        fn(e);
        return false;
    });

    this.mousemove(function (e) {
        if(that.isMouseDown) {
            fn(e);
        }
        
        return false;
    });

    this.mouseup(function (e) {
        that.isMouseDown = false;
        return false;
    });
}
