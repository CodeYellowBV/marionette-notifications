define(function (require) {
    'use strict';
    var Marionette = require('marionette'),
        VItem = require('./itemview'),
        _ = require('underscore');

    return Marionette.CollectionView.extend({
        className: 'notifications',
        childView: VItem
    });
});
