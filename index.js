class EventManager {
    constructor() {
        this.listeners = [];
    }
    /**
     * @param {*} type - Event type
     * @param {function} handler
     * @returns {object} - A listener object with a `remove()` method that removes the subscription.
     */
    addListener(type, handler) {
        if (typeof handler !== 'function')
            throw new Error('handler is not a function');

        let id = Math.random().toString(36).slice(2);
        let remove = () => {
            for (let i = this.listeners.length - 1; i >= 0; i--) {
                if (this.listeners[i].id === id)
                    this.listeners.splice(i, 1);
            }
        };

        this.listeners.push({id, type, handler});
        return {id, type, remove};
    }
    /**
     * @param {*} type - Event type
     * @param {object} [payload] - Extra event props
     */
    dispatch(type, payload) {
        let event = {...payload, type};
        for (let listener of this.listeners) {
            if (this.shouldCallListener(listener, event))
                listener.handler(this.toHandlerPayload(listener, event));
        }
    }
    shouldCallListener(listener, event) {
        if (listener.type instanceof RegExp)
            return listener.type.test(String(event.type));
        return listener.type === '*' || listener.type === event.type;
    }
    toHandlerPayload(listener, event) {
        if (listener.type instanceof RegExp) {
            let matches = String(event.type).match(listener.type);
            event.params = matches ? {...Array.from(matches).slice(1), ...matches.groups} : {};
        }
        else event.params = {};

        return event;
    }
}

export default EventManager;
