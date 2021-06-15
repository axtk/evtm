import { AbstractEventManager } from './AbstractEventManager';
import { matchPattern } from './matchPattern';
// L: ListenerEventType
// D: DispatchedEventType
// P: Payload
export class EventManager extends AbstractEventManager {
    constructor() {
        super(...arguments);
        this.listeners = [];
    }
    addListener(type, handler) {
        return super.addListener(type, handler);
    }
    shouldCallListener(listener, event) {
        return super.shouldCallListener(listener, event);
    }
    toHandlerPayload(listener, event) {
        let params = matchPattern(listener.type, event.type);
        return { ...event, params };
    }
}
