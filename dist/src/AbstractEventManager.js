import { matchPattern } from './matchPattern';
// L: ListenerEventType
// D: DispatchedEventType
// P: Payload
export class AbstractEventManager {
    constructor() {
        this.listeners = [];
    }
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
        let listener = { id, type, handler, remove };
        this.listeners.push(listener);
        return listener;
    }
    dispatch(type, payload) {
        let event = { ...payload, type };
        for (let listener of this.listeners) {
            if (this.shouldCallListener(listener, event))
                listener.handler(this.toHandlerPayload(listener, event));
        }
    }
    shouldCallListener(listener, event) {
        return matchPattern(listener.type, event.type) !== null;
    }
    toHandlerPayload(listener, event) { }
}
