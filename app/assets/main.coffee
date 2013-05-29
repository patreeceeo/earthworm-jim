EWJ = EarthwormJim()

PixelModel = (model) ->
  EWJ.Model (
    attributes: model.attributes
    setColor: EWJ.setter "color"
  )

PixelView = (view) ->
  EWJ.View (
    model: view.model
    handlers:
      "change:color": "updateColor"
      "after:render": "updateColor"
    updateColor: ->
      @$el.css('background-color', @model.attributes.color)
    render: ->
      "<div class='pixel'></div>"
  )

GridController = (height, width, options) ->
  $el = $(options.el)
  mousedown = false

  ZOOM = 20

  $el.css 'max-height', height * ZOOM
  $el.css 'max-width', width * ZOOM
 
  pixelModels =
  for y in [1..height]
    for x in [1..width]
      pm = PixelModel {
        attributes:
          color: 'white'
      }

      pv = PixelView {
        model: pm
      }

      pv.appendTo $el
      pv.render()

      pm

  getMouseCoords = (e, $el) ->
    [
      e.pageX - $el.position().left
      e.pageY - $el.position().top
    ]

  for handlerKey, handler of options.handlers
    $el[handlerKey]? (e) ->
      [x, y] = getMouseCoords(e, $el)
      pm = pixelModels[Math.floor y/ZOOM ][Math.floor x/ZOOM]
      handler.call pm, e

  {}

$(document).ready ->
  GridController(24, 24,
    el: '#DrawingCanvas'
    handlers: {
      mousedrag: ->
        @setColor 'black'
    }
  )
