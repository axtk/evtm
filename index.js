const DefaultProps = {
    shouldCallListener: (listener, event) => {
        return listener.type === '*' || listener.type === event.type;
    },
    toHandlerPayload: (listener, event) => event,
};

class EventManager {
    constructor(props = {}) {
        Object.assign(this, DefaultProps, props);
        this.listeners = [];
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
        const event = {...props, type};

        for (let i = 0, n = this.listeners.length; i < n; i++) {
            let L = this.listeners[i];
            if (this.shouldCallListener(L, event))
                L.handler(this.toHandlerPayload(L, event));
        }
    }
}

export default EventManager;
