# event-manager

*A lightweight event manager*

## Usage

```js
let eventManager = new EventManager();

let listener = eventManager.addListener('something happened', event => {
    // a handler for the specific event
});
let universalListener = eventManager.addListener('*', event => {
    // a handler for all events dispatched to this eventManager
});

eventManager.dispatch('something happened', {x: 42});

listener.remove();
universalListener.remove();
```

### Custom event type matching

By default, instances of `EventManager` check for equality of the listener type and the incoming event type. Here's an example of how the event type matching can be customized:

```js
class EventPatternManager extends EventManager {
    shouldCallListener(listener, event) {
        return listener.type.test(event.type);
    }
}
```

```js
let eventManager = new EventPatternManager();

eventManager.addListener(/^task\./, event => console.log(event));
eventManager.dispatch('task.started');
```

## Installation

```
npm i github:axtk/event-manager
```
