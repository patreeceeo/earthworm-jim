
function EarthwormJim () {

    function publisher () {
        return function thePublisher (event, attrName) {
            for (i in this.subscribers) {
                this.subscribers[i].notify(event + ':' + attrName);
            }
        }
    }

    function setter (attrName) {
        return function theSetter (value) {
            if(this.attributes[attrName] !== value) {
                this.attributes[attrName] = value; 
                this.publish("change", attrName);
            }
        }
    }

    function Model (model) {
        model.attributes = model.attributes || {};
        model.publish = publisher();
        model.subscribers = [];
        return model;
    }

    function notifier () {
        return function theNotifier (event) {
            this[this.handlers[event]].call(this);
        }
    }

    function renderer (getHTML) {
        return function theRenderer() {
            this.$el = $(getHTML());
            if(!this.appended) {
                this.container.append(this.$el);
                this.appended = true;
            } 
            this.notify("after:render");
        }
    }

    function appender () {
        return function theAppender (el) {
            this.container = $(el);
        }
    }

    function View (view) {
        view.$el = $(view.el);
        view.model.subscribers.push(view);
        view.notify = notifier();
        view.render = renderer(view.render);
        view.appendTo = appender();
        return view;
    }

    return {
        View: View
        , Model: Model
        , setter: setter
    }
}
