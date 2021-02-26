[![npm](https://img.shields.io/npm/v/@axtk/event-manager?labelColor=royalblue&color=royalblue&style=flat-square)](https://www.npmjs.com/package/@axtk/event-manager)
![browser](https://img.shields.io/badge/browser-✓-blue?labelColor=dodgerblue&color=dodgerblue&style=flat-square)
![node](https://img.shields.io/badge/node-✓-blue?labelColor=dodgerblue&color=dodgerblue&style=flat-square)

*A lightweight event manager*

# Usage

Initialization:

```js
import EventManager from '@axtk/event-manager';

let eventManager = new EventManager();
```

Adding a handler of a specific event type:

```js
eventManager.addListener('task started', event => {
    console.log(event);
});
```

Of all events matching the pattern:

```js
eventManager.addListener(/^task\s/, event => {
    console.log(event);
});
```

With captured parameters:

```js
eventManager.addListener(/^(\S+)\s(?<status>.*)$/, event => {
    console.log(event.params[0], event.params.status);
});
```

Adding a handler of all events dispatched to the `eventManager` instance:

```js
let listener = eventManager.addListener('*', event => {
    console.log(event);
});
```

Dispatching an event of a specific type and properties:

```js
eventManager.dispatch('task started', {x: 42});
```

Removing a previously declared listener:

```js
listener.remove();
```
