
$.fn.mousedrag = function (fn) {
    this.mousedown(function (e) {
        this.isMouseDown = true;
        return false;
    });

    this.mousemove(function (e) {
        if(this.isMouseDown) {
            fn(e);
        }
        return false;
    });

    this.mouseup(function (e) {
        this.isMouseDown = false;
        return false;
    });
}
