// L: ListenerEventType
// D: DispatchedEventType
// P: Payload

export type DispatchedEvent<D, P> = P & {type: D};
export type RemoveListener = () => void;

export type AbstractEvent<D, P> = any;
export type AbstractHandler<D, P> = (event?: AbstractEvent<D, P>) => void;

export interface AbstractListener<L, P> {
    id: string;
    type: L;
    handler: AbstractHandler<L, P>;
    remove: RemoveListener;
}

export type EventParams = {[index: string]: string};
export type Event<D, P> = DispatchedEvent<D, P> & {params: EventParams};
export type Handler<D, P> = (event?: Event<D, P>) => void;

export interface Listener<L, P> {
    id: string;
    type: L;
    handler: Handler<L, P>;
    remove: RemoveListener;
}
