define(function (require) {
    'use strict';
    var Model = require('crux/model');

    return Model.extend({
        defaults: function () {
            return {
                prepend_content: null,
                content: '',
                // Possible options: info, error, undo
                type: 'info',
                // Set to false to disable
                closeAfter: 3000,
                link: null,
                linkText: null
            };
        },

        // This model has no API endpoints
        sync: function () {
            return null;
        },

        fetch: function () {
            return null;
        },

        save: function () {
            return null;
        }
    });
});
