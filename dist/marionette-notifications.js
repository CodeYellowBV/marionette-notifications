'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Marionette = _interopDefault(require('marionette'));
var _$1 = _interopDefault(require('underscore'));
var Collection = _interopDefault(require('crux/collection'));
var Model = _interopDefault(require('crux/model'));

function TItemView(data) {
var __t, __p = '', __e = _$1, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="notification notification-' +
__e(data.type) +
'">\n    ';
 if (data.prependContent) { ;
__p += '\n        <strong>' +
__e(data.prependContent) +
'</strong>:\n    ';
 } ;
__p += '\n    ' +
__e(data.content) +
'\n    ';
 _.each(data.links, function (linkItem, i) { ;
__p += '\n        – <a href="' +
__e(linkItem) +
'" class="_link _id-' +
__e(i) +
'">' +
__e(data.linkText[i]) +
'</a>\n    ';
 }) ;
__p += '\n    <a href="#" class="_close action-small icon-delete"></a>\n</div>\n';
return __p
}

/**
 * @property {model/notification} model
 */
var VItem = Marionette.ItemView.extend({
    template: TItemView,
    tagName: 'div',
    ui: {
        'close' : '._close',
        'link': '._link'
    },
    events: {
        'mouseenter': 'onMouseEnter',
        'mouseleave': 'onMouseLeave',
        'click @ui.close': 'close',
        'click @ui.link': 'clickLink'
    },
    delayTimer: null,
    templateHelpers: function () {
        return _$1.extend({
            links: this.getHrefs(),
        }, this.model.attributes)
    },
    /**
     * Returns the corrent for every link. If 'link' is a function we don't want to return this.
     */
    getHrefs: function () {
        return _$1.map(this.model.get('link'), function(link) {
            return _$1.isFunction(link) ? '#' : link;
        });
    },
    onRender: function () {
        this.$el.hide();
    },
    onShow: function() {
        // Wooo animations
        this.$el.slideDown(200);

        this.delayDestroy();
    },
    delayDestroy: function () {
        // If closeAfter isn't set to false, close the model after a delay
        if (this.model.get('closeAfter')) {
            this.delayTimer = _$1.delay(function () {
                this.model.destroy();
            }.bind(this), this.model.get('closeAfter'));
        }
    },
    onMouseEnter: function (e) {
        clearTimeout(this.delayTimer);
    },
    onMouseLeave: function (e) {
        this.delayDestroy();
    },
    close: function (e) {
        e.preventDefault();

        this.model.destroy();
    },
    clickLink: function (e) {
        e.preventDefault();
        // We need the link at index i. The index is stored in the className as _id-i.
        var index = e.currentTarget.className.match(/_id-([0-9]*)/)[1];
        var link = this.model.get('link')[index];
        if (_$1.isFunction(link)) {
            e.preventDefault();

            link();
        }

        this.model.destroy();
    },
    destroy: function () {
        this.$el.fadeOut(200, function () {
            Marionette.ItemView.prototype.destroy.call(this);
        }.bind(this));
    }
});

var MNotification = Model.extend({
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

var CNotification = Collection.extend({
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

var index = Marionette.CollectionView.extend({
    className: 'notifications',
    childView: VItem,
    initialize: function () {
        this.collection = new CNotification();
    },
    /**
     * Shortcut for an info notification.
     */
    info: function (attributes, options) {
        attributes.type = 'info';

        return this.collection.create(attributes, options);
    },

    /**
     * Shortcut for an error notification.
     */
    error: function (attributes, options) {
        attributes.type = 'error';

        return this.collection.create(attributes, options);
    },

    /**
     * Shortcut for an success notification.
     */
    success: function (attributes, options) {
        attributes.type = 'success';

        return this.collection.create(attributes, options);
    }
});

module.exports = index;