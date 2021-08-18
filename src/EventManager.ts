import {matchPattern, MatchParams} from './matchPattern';

export type EventType = string | number | boolean | RegExp | null | undefined;
export type EventHandler = (event?: Event) => void;

export type Event<T extends EventPayload = {}> = T & {
    type: EventType;
    params?: MatchParams;
};

export type EventPayload = {
    [key: string]: any;
};

export type EventListener = {
    id: string;
    type: EventType | EventType[];
    handler: EventHandler;
    remove: () => void;
};

export class EventManager {
    listeners: EventListener[];
    constructor() {
        this.listeners = [];
    }
    addListener(type: EventType | EventType[], handler: EventHandler): EventListener {
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
    dispatch(type: EventType, payload?: EventPayload): void {
        let event: Event = {...payload, type};
        for (let listener of this.listeners) {
            if (this.shouldCallListener(listener, event))
                listener.handler(this.toHandlerPayload(listener, event));
        }
    }
    shouldCallListener(listener: EventListener, event: Event): boolean {
        return matchPattern(listener.type, event.type) !== null;
    }
    toHandlerPayload(listener: EventListener, event: Event): Event {
        let params = matchPattern(listener.type, event.type);
        return {...event, params};
    }
}
