import {AbstractEventManager} from './AbstractEventManager';
import {matchPattern} from './matchPattern';
import {DispatchedEvent, Event, Handler, Listener} from './types';

// L: ListenerEventType
// D: DispatchedEventType
// P: Payload

export class EventManager<L, D> extends AbstractEventManager<L, D> {
    listeners: Listener<L, any>[] = [];
    addListener<P>(type: L, handler: Handler<D, P>): Listener<L, P> {
        return super.addListener<P>(type, handler);
    }
    shouldCallListener<P>(listener: Listener<L, P>, event: DispatchedEvent<D, P>): boolean {
        return super.shouldCallListener<P>(listener, event);
    }
    toHandlerPayload<P>(listener: Listener<L, P>, event: DispatchedEvent<D, P>): Event<D, P> {
        let params = matchPattern(listener.type, event.type);
        return {...event, params};
    }
}
