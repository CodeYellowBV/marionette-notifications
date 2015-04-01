define(function (require) {
    'use strict';

    var Marionette = require('marionette'),
        VCollectionView = require('./collectionview'),
        CNotification = require('./collection'),
        $ = require('jquery'),
        _ = require('underscore');

    return Marionette.Region.extend({
        el: '#_notification',
        enable: function () {
            this.show(new VCollectionView({
                collection: new CNotification()
            }));
        }
    });
});
