# event-manager

*A lightweight event manager*

## Exports

### `class EventManager`

```js
const eventManager = new EventManager();

eventManager.addEventListener('something happened', event => {
    console.log(event.x);
});

eventManager.dispatchEvent('something happened', {x: 42});
```

#### `EventManager(props?)`

- **`props?: object`**
- **`props.shouldCallListener: (listener, event) => boolean`**
  - Specifies whether the event `listener` should be invoked when the `event` is dispatched.
  - Default: `(listener, event) => listener.type === '*' || listener.type === event.type`.
- **`props.toHandlerPayload: (listener, event) => any`**
  - Specifies the payload that the handler function should receive.
  - Default: `(listener, event) => event`.

The `shouldCallListener` constructor option can be used, for instance, to apply event type pattern matching instead of strict equality check:

```js
let eventManager = new EventManager({
    shouldCallListener: (listener, event) => listener.type.test(event.type)
});

eventManager.addEventListener(/^menu\./, event => console.log(event));
eventManager.dispatchEvent('menu.open');
```

#### `.addEventListener(type, handler)`

- **`type: any`**
- **`handler: function | function[]`**
- Returns: **`listener: object | object[]`**.

Subscribes a `handler` function (or an array of functions) to the specified event `type` and returns an event listener object (or an array thereof) with a `remove()` method that removes the subscription. If a handler is not a function, it is silently ignored.

Handlers added to the wildcard `'*'` event type will be triggered whenever any event is dispatched (unless this is changed with a custom `shouldCallListener` option in the constructor).

#### `.removeEventListener(type, handler?)`

- **`type: any`**
- **`handler?: function | function[]`**

Removes an event subscription with the specified event `type` and event `handler` (or an array of handlers). If the handler is not specified, all subscriptions of the specified event `type` are removed.

#### `.dispatchEvent(type, props?)`

- **`type: any`**
- **`props?: object`**

Dispatches an event of the specified `type` with the specified properties.

## Installation

```
npm i github:axtk/event-manager
```
