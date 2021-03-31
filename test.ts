import {EventManager} from './';

let eventManager = new EventManager<string | RegExp, string>(), listener, x;

console.log('exact event type');
x = 0;

listener = eventManager.addListener<{dx: number}>('update', event => {
    console.assert(event.type === 'update', 'event type should match listener type');
    x += event.dx;
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

listener = eventManager.addListener<{dx: number}>(/^task\s/, event => {
    x += event.dx;
});
console.assert(x === 0, 'initial state');

eventManager.dispatch('task started', {dx: 42});
console.assert(x === 42, 'matching event');

eventManager.dispatch('subtask started', {dx: -42});
console.assert(x === 42, 'non-matching event');

listener.remove();


console.log('event type pattern params');
x = null;

listener = eventManager.addListener<{dx: number}>(/^(\S+)\s+(?<status>.+)$/, event => {
    x = event.params;
});
console.assert(x === null, 'initial state');

eventManager.dispatch('task started', {dx: 42});
console.assert(x[0] === 'task' && x.status === 'started', 'task started');

eventManager.dispatch('subtask completed', {dx: -42});
console.assert(x[0] === 'subtask' && x.status === 'completed', 'subtask completed');

listener.remove();
