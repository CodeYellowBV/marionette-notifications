# marionette-notifications
Shows sexy notifications in a region.

Some features:

- When a notification is added that already has the same content as a notification that already exists, no notification is added.
- A notification will disappear after 3 seconds. When hovering over a notification, it will not disappear.

Installation:

```
$ npm install marionette-notifications --save
```

## Usage

First make sure you have `underscore`, `marionette` and `backbone-crux` as a dependency.

Now create a view where you listen to all events that need to trigger a notification (I will name it `view/notification.js`);

```js
var Notification = require('marionette-notifications');
var vent = require('vent');

module.exports = Notification.extend({
    initialize: function () {
        Notification.prototype.initialize.call(this);

        // Listen to events here, e.g.:
        this.listenTo(vent, 'user:delete', this.onUserDelete);
    },
    onUserDelete: function () {
        // Let's create the notification, shall we?
        this.info({
            content: 'User is successfully deleted.'
        });
    }
});
```

In your template, create a div: `<div id="_notifications></div>`. Then add this as a region:

```js
app.addRegions({
    notification: '#_notification'
})
```

Now show the region:

```js
app.addInitializer(function () {
    var VNotification = require('view/notification');

    app.notification.show(new VNotification());
});
```

For now, no CSS is added. You can copy/paste this to use as a base:

```scss
.notifications {
    position: absolute;
    top: 20px;
    z-index: 100;
    width: 100%;
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    pointer-events: none;
}

.notification {
    max-width: 300px;
    padding: 10px 40px 10px 14px;
    color: #000;
    background: #fbf9e4;
    margin-bottom: 15px;
    position: relative;
    background-size: 20px 20px;
    background-repeat: no-repeat;
    background-position: 10px 10px;
    pointer-events: all;

    a {
        text-decoration: underline;
    }

    &.notification-error {
        padding-left: 40px;
        background-image: url('img/alert.svg');
        color: #ba0000;

        a {
            color: #ba0000;
        }
    }

    .action-small {
        margin-left: 11px;
        position: absolute;
        top: 13px;
        right: 7px;
    }
}
```

## Usage

| __Option__  | __Description__ | __Type__  | __Default__ |
| ---         | ---             | ---       | ---         |
| `prependContent` | Add some text wrapped in `<strong>` before `content`. | `string` | `null` |
| `content` | Content of the notification. | `string` | `''` |
| `type` | Type of the notification. Must be one of these: `error`, `info` or `success`. | `string` | `'info'` |
| `closeAfter` | Close the popup after x ms. | `integer` | `3000` |
| `linkText` | Add a link after the `content`. Can also be an array of text | `string || [string]` | `null` |
| `link` | URL of the link. Can also be a callback. If a callback, the url will be set to `#`. Can also be an array of links or callbacks.| `mixed` | `null` |

Shortcuts for adding a notification:
`this.info(options)`, `this.error(options)` and `this.success(options)`.
