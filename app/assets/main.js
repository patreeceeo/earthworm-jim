
function main () {

    var EWJ = EarthwormJim();

    function PixelModel (model) {
        return EWJ.Model({
            attributes: model.attributes
            , setColor: EWJ.setter("color")
        });
    }

    function PixelView (view) {
        return EWJ.View({
            model: view.model
            , handlers: {
                "change:color": "updateColor"
                , "after:render": "updateColor"
            }
            , updateColor: function () {
                this.$el.css('background-color', this.model.attributes.color);
            }
            , render: function () {
                return "<div class='pixel'></div>";
            }
        });
    }

    function Grid(height, width, options) {
        var $el = $(options.el)
            , mousedown = false

        function ZOOM () {
            return 20;
        }

        $el.css('max-height', height * ZOOM());
        $el.css('max-width', width * ZOOM());

        var pixelModels = [];
        for (var i = 0; i < height; i++) {
            pixelModels[i] = [];
            for (var j = 0; j < width; j++) {
                var pm = PixelModel({
                    attributes: {
                        color: 'white'
                    }
                });
                pixelModels[i].push(pm);
                var pv = PixelView({
                    model: pm
                }); 
                pv.appendTo($el);
                pv.render();
            }
        }

        $el.mousedrag(function (e) {
            if($(e.target).hasClass('pixel')) {
                var clickX = e.pageX - $el.position().left
                    , clickY = e.pageY - $el.position().top;

                var pm = pixelModels[Math.floor(clickY/ZOOM())][Math.floor(clickX/ZOOM())];
                options.events.mousedrag.call(pm, e);
            }
        });

        return {
            
        }
    }

    $(document).ready(function () {
        Grid(24, 24, { 
            el: '#DrawingCanvas' 
            , events: {
                mousedrag: function () {
                    this.setColor('black');
                }
            }
        });
    });
}

main();

