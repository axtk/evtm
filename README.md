[![npm](https://img.shields.io/npm/v/@axtk/event-manager?labelColor=royalblue&color=royalblue&style=flat-square)](https://www.npmjs.com/package/@axtk/event-manager)
![browser](https://img.shields.io/badge/browser-✓-blue?labelColor=dodgerblue&color=dodgerblue&style=flat-square)
![node](https://img.shields.io/badge/node-✓-blue?labelColor=dodgerblue&color=dodgerblue&style=flat-square)

# event-manager

*A lightweight event manager*

## Usage

```js
let eventManager = new EventManager();

eventManager.addListener('task started', event => {
    // a handler for the specific event
});
eventManager.addListener(/^task\s/, event => {
    // a handler for all events matching the pattern
});
eventManager.addListener(/^(\S+)\s(?<status>.*)$/, event => {
    // a handler for all events matching the pattern
    // with captured parameters
    console.log(event.params[0], event.params.status);
});
let listener = eventManager.addListener('*', event => {
    // a handler for all events dispatched to this eventManager
});

eventManager.dispatch('task started', {x: 42});
listener.remove();
```
