window.EarthwormJim = ->

  publisher = ->
    (eventName) ->
      for s in @subscribers
        s.notify eventName
      @

  setter = (attrName) ->
    (value) ->
      if @attributes[attrName] isnt value
        @attributes[attrName] = value
        @publish "change:#{attrName}"
      @
 
  override = (preferences, defaults) ->
    for own key,value of preferences
      defaults[key] = value
    return defaults

  Model = (model) ->
    defaults =
      attributes: {}
      publish: publisher()
      subscribers: []

    override defaults, model
  
  notifier = ->
    (event) ->
      handler = @[@handlers[event]]
      if handler
        handler.call(@)
      @

  renderer = (getHTML) ->
    ->
      @$el = $ getHTML()
      unless @appended
        @container.append @$el
        @appended = true
        @notify "after:render"
      @

  appender = ->
    (el) ->
      @container = $ el
      @

  View = (view) ->
    view.$el = $(view.el)
    view.model?.subscribers.push(view)
    view.notify ?= notifier()
    view.render = renderer(view.render)
    view.appendTo ?= appender()
    view

  View: View
  Model: Model
  setter: setter

