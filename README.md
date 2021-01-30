# event-manager

*A lightweight event manager*

## Exports

### `class EventManager`

```js
const eventManager = new EventManager();

eventManager.addListener('something happened', event => {
    console.log(event.x);
});

eventManager.dispatch('something happened', {x: 42});
```

By default, `EventManager` instances check for equality of the listener type and the incoming event type. Here's an example of how event type pattern matching can be applied instead of the equality check:

```js
class EventPatternManager extends EventManager {
    shouldCallListener(listener, event) {
        return listener.type.test(event.type);
    }
}

let eventManager = new EventPatternManager();
eventManager.addListener(/^menu\./, event => console.log(event));
eventManager.dispatch('menu.open');
```

#### `.addListener(type, handler)`

- **`type: any`**
- **`handler: function | function[]`**
- Returns: **`listener: object | object[]`**.

Subscribes a `handler` function (or an array of functions) to the specified event `type` and returns an event listener object (or an array thereof) with a `remove()` method that removes the subscription. If a handler is not a function, it is silently ignored.

Handlers added to the wildcard `'*'` event type will be triggered whenever any event is dispatched. (This can be changed in a descendant class by overriding the `shouldCallListener` method.)

#### `.removeListener(type, handler?)`

- **`type: any`**
- **`handler?: function | function[]`**

Removes an event subscription with the specified event `type` and event `handler` (or an array of handlers). If the handler is not specified, all subscriptions of the specified event `type` are removed.

#### `.dispatch(type, props?)`

- **`type: any`**
- **`props?: object`**

Dispatches an event of the specified `type` with the specified properties.

## Installation

```
npm i github:axtk/event-manager
```
