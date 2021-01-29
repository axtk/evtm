class EventManager {
    constructor(props = {}) {
        this.shouldCallListener = props.shouldCallListener ?
            props.shouldCallListener.bind(this) :
            ((listener, event) => listener.type === '*' || listener.type === event.type);

        this.toHandlerPayload = props.toHandlerPayload ?
            props.toHandlerPayload.bind(this) :
            ((listener, event) => event);

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
            return handler.forEach(h => this.removeEventListener(type, h));

        for (let i = this.listeners.length - 1; i >= 0; i--) {
            if (this.listeners[i].type === type && (!handler || this.listeners[i].handler === handler))
                this.listeners.splice(i, 1);
        }
    }
    dispatchEvent(type, props) {
        const event = {...props, type};

        for (let listener of this.listeners) {
            if (this.shouldCallListener(listener, event))
                listener.handler(this.toHandlerPayload(listener, event));
        }
    }
}

export default EventManager;
