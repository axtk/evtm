# event-manager

*Custom event manager*

## `class EventManager`

### Constructor

#### `EventManager()`

Returns an `EventManager` object instance.

### Methods

#### `addEventListener(type: string, handler: function): object`

Subscribes the `handler` function to the specified event `type` and returns an event listener object with a `remove()` method that removes this subscription.

#### `removeEventListener(type: string, handler: function)`

Removes the event subscription with the specified event `type` and event `handler`.

#### `dispatchEvent(type: string, props?: object)`

Dispatches an event of the specified `type` and with the specified properties.
