import {EventManager, Event} from './src/EventManager';

let eventManager = new EventManager(), listener, x;

console.log('exact event type');
x = 0;

listener = eventManager.addListener('update', (event: Event<{dx: number}>) => {
    console.assert(event.type === 'update', 'event type should match listener type');
    x += event.data.dx;
});
console.assert(eventManager.listeners.length === 1, 'added listener');
console.assert(x === 0, 'initial state');

eventManager.dispatch('update', {dx: 1});
console.assert(x === 1, '+1');

eventManager.dispatch('update', {dx: 2});
console.assert(x === 3, '+2');

eventManager.dispatch('update', {dx: -3});
console.assert(x === 0, '-3');

listener.remove();
console.assert(eventManager.listeners.length === 0, 'removed listener');

eventManager.dispatch('update', {dx: 5});
console.assert(x === 0, 'no updates, listener is removed');


console.log('event type pattern');
x = 0;

listener = eventManager.addListener(/^task\s/, (event: Event<{dx: number}>) => {
    x += event.data.dx;
});
console.assert(x === 0, 'initial state');

eventManager.dispatch('task started', {dx: 42});
console.assert(x === 42, 'matching event');

eventManager.dispatch('subtask started', {dx: -42});
console.assert(x === 42, 'non-matching event');

listener.remove();


console.log('event type pattern params');
x = null;

listener = eventManager.addListener(/^(\S+)\s+(?<status>.+)$/, event => {
    x = event.params;
});
console.assert(x === null, 'initial state');

eventManager.dispatch('task started', {dx: 42});
console.assert(x[0] === 'task' && x.status === 'started', 'task started');

eventManager.dispatch('subtask completed', {dx: -42});
console.assert(x[0] === 'subtask' && x.status === 'completed', 'subtask completed');

listener.remove();
