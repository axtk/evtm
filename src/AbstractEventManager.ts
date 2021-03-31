import {matchPattern} from './matchPattern';
import {DispatchedEvent, AbstractEvent, AbstractHandler, AbstractListener} from './types';

// L: ListenerEventType
// D: DispatchedEventType
// P: Payload

export class AbstractEventManager<L, D> {
    listeners: AbstractListener<L, any>[];
    constructor() {
        this.listeners = [];
    }
    addListener<P>(type: L, handler: AbstractHandler<D, P>): AbstractListener<L, P> {
        if (typeof handler !== 'function')
            throw new Error('handler is not a function');

        let id = Math.random().toString(36).slice(2);
        let remove = () => {
            for (let i = this.listeners.length - 1; i >= 0; i--) {
                if (this.listeners[i].id === id)
                    this.listeners.splice(i, 1);
            }
        };

        let listener = {id, type, handler, remove};
        this.listeners.push(listener);

        return listener;
    }
    dispatch<P>(type: D, payload?: P): void {
        let event: DispatchedEvent<D, P> = {...payload, type};
        for (let listener of this.listeners) {
            if (this.shouldCallListener<P>(listener, event))
                listener.handler(this.toHandlerPayload<P>(listener, event));
        }
    }
    shouldCallListener<P>(listener: AbstractListener<L, P>, event: DispatchedEvent<D, P>): boolean {
        return matchPattern(listener.type, event.type) !== null;
    }
    toHandlerPayload<P>(listener: AbstractListener<L, P>, event: DispatchedEvent<D, P>): AbstractEvent<D, P> {}
}
