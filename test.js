import EventManager from './';

let eventManager = new EventManager();
let x = 0;

let listener = eventManager.addEventListener('update', event => {
    console.assert(event.type === 'update', 'event type should match listener type');
    x += event.dx;
});
console.assert(eventManager.listeners.length === 1, 'added listener');

console.assert(x === 0, 'initial state');

eventManager.dispatchEvent('update', {dx: 1});
console.assert(x === 1, '+1');

eventManager.dispatchEvent('update', {dx: 2});
console.assert(x === 3, '+2');

eventManager.dispatchEvent('update', {dx: -3});
console.assert(x === 0, '-3');

listener.remove();
console.assert(eventManager.listeners.length === 0, 'removed listener');

eventManager.dispatchEvent('update', {dx: 5});
console.assert(x === 0, 'no updates, listener is removed');
