import EventManager from './';

let eventManager = new EventManager();
let x = 0;

let listener = eventManager.addListener('update', event => {
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


class EventPatternManager extends EventManager {
    shouldCallListener(listener, event) {
        return listener.type.test(event.type);
    }
}

eventManager = new EventPatternManager();
eventManager.addListener(/^menu\./, event => {
    x += event.dx;
});
eventManager.dispatch('menu.open', {dx: 42});
console.assert(x === 42, '+42');

eventManager.dispatch('tab.open', {dx: -42});
console.assert(x === 42, 'unchanged via non-matching event');
