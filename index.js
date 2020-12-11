class EventManager {
    constructor(options) {
        this.listeners = [];
        this.matchEventType = options && options.matchEventType;
    }
    addEventListener(type, handler) {
        if (Array.isArray(handler))
            return handler.map(h => this.addEventListener(type, h));

        if (typeof handler !== 'function')
            return;

        const id = Math.random().toString(36).slice(2);
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
    removeEventListener(type, handler) {
        if (Array.isArray(handler))
            return handler.map(h => this.removeEventListener(type, h));

        for (let i = this.listeners.length - 1; i >= 0; i--) {
            let L = this.listeners[i];
            if (L.type === type && (!handler || L.handler === handler))
                this.listeners.splice(i, 1);
        }
    }
    dispatchEvent(type, props) {
        const event = Object.assign({}, props || {}, {type});

        for (let i = 0, n = this.listeners.length; i < n; i++) {
            let L = this.listeners[i];
            let eventTypeMatches = this.matchEventType ?
                this.matchEventType(type, L.type) :
                (L.type === type || L.type === '*');

            if (eventTypeMatches) L.handler(event);
        }
    }
}

export default EventManager;
