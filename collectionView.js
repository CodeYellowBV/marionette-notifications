define(function (require) {
    'use strict';
    var Marionette = require('marionette'),
        VItem = require('./itemView'),
        CNotification = require('./collection'),
        _ = require('underscore');

    return Marionette.CollectionView.extend({
        className: 'notifications',
        childView: VItem,
        initialize: function () {
            this.collection = new CNotification();
        }
    });
});
