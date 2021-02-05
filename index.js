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
        this.listeners.push({type, handler, id});

        return {
            remove: () => {
                for (let i = this.listeners.length - 1; i >= 0; i--) {
                    if (this.listeners[i].id === id)
                        this.listeners.splice(i, 1);
                }
            }
        };
    }
    /**
     * @param {*} type - Event type
     * @param {function} handler
     */
    removeListener(type, handler) {
        for (let i = this.listeners.length - 1; i >= 0; i--) {
            if (this.listeners[i].type === type && (!handler || this.listeners[i].handler === handler))
                this.listeners.splice(i, 1);
        }
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
        return listener.type === '*' || listener.type === event.type;
    }
    toHandlerPayload(listener, event) {
        return event;
    }
}

export default EventManager;
