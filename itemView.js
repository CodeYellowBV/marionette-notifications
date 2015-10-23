define(function (require) {
    'use strict';
    var Marionette = require('marionette');
    var _ = require('underscore');

    var template =
        '<div class="notification notification-<%-type%>">' +
        '    <% if (prependContent) { %>' +
        '        <strong><%-prependContent%></strong>:' +
        '    <% } %>' +
        '    <%-content%>' +
        '    <% _.each(links, function (linkItem, i) { %>' +
        '        – <a href="<%-linkItem%>" class="_link _id-<%-i%>"><%-linkText[i]%></a>' +
        '    <% }) %>' +
        '    <a href="#" class="_close action-small icon-delete"></a>' +
        '</div>';

    /**
     * @property {model/notification} model
     */
    return Marionette.ItemView.extend({
        template: _.template(template),
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
            return _.extend({
                links: this.getHrefs(),
            }, this.model.attributes)
        },
        /**
         * Returns the corrent for every link. If 'link' is a function we don't want to return this.
         */
        getHrefs: function () {
            return _.map(this.model.get('link'), function(link) {
                return _.isFunction(link) ? '#' : link;
            });
        },
        render: function () {
            this.$el.html(_.template(template)(this.templateHelpers()));
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
                this.delayTimer = _.delay(function () {
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
            if (_.isFunction(link)) {
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
});
