define(function (require) {
    'use strict';

    var Collection = require('crux/collection'),
        MNotification = require('./model');

    return Collection.extend({
        model: MNotification,
        // This collection has no API endpoints

        create: function (attributes, options) {
            // If the notification content is already present in the collection, don't add it.
            var isAlreadyAdded = this.some(function (mNotification) {
                return mNotification.get('content') === attributes.content;
            });

            if (!isAlreadyAdded) {
                return Collection.prototype.create.call(this, attributes, options);
            }
        }
    });
});
