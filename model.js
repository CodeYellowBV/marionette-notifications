define(function (require) {
    'use strict';
    var Model = require('crux/model');

    return Model.extend({
        defaults: function () {
            return {
                prependContent: null,
                content: '',
                // Possible options: info, error, success
                type: 'info',
                // Set to false to disable
                closeAfter: 3000,
                // Array of links or callbacks after a link click
                link: [],
                linkText: [],
            };
        },
        initialize: function (attrs, options) {
            if (attrs && attrs.link && !(attrs.link instanceof Array)) this.set('link', [attrs.link]);
            if (attrs && attrs.linkText && !(attrs.linkText instanceof Array)) this.set('linkText', [attrs.linkText]);
            if (this.get('link').length !== this.get('linkText').length) {
                console.error('Link and linkText arrays are of unequal length.');
                return;
            }
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
