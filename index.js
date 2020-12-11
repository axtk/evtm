class EventManager {
    constructor() {
        this.listeners = [];
    }
    addEventListener(type, handler) {
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
        for (let i = this.listeners.length - 1; i >= 0; i--) {
            let L = this.listeners[i];
            if (L.type === type && L.handler === handler)
                this.listeners.splice(i, 1);
        }
    }
    dispatchEvent(type, props) {
        const event = Object.assign({}, props || {}, {type});

        for (let i = 0, n = this.listeners.length; i < n; i++) {
            let L = this.listeners[i];
            if (L.type === type || L.type === '*') L.handler(event);
        }
    }
}

export default EventManager;
