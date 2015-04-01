define(function (require) {
    'use strict';
    var Marionette = require('marionette'),
        TItem = require('text!./itemView.html'),
        _ = require('underscore'),
        vent = require('vent');

    /**
     * @property {model/notification} model
     */
    return Marionette.ItemView.extend({
        template: _.template(TItem),
        tagName: 'div',
        ui: {
            'close' : '._close',
            'callBack' : '._call-back',
            'link': '._link'
        },
        events: {
            'mouseenter': 'onMouseEnter',
            'mouseleave': 'onMouseLeave',
            'click @ui.close': 'close',
            'click @ui.callBack': 'callBack',
            'click @ui.link': 'clickLink'
        },
        delayTimer: null,
        render: function () {
            this.$el.html(this.template(this.model.attributes));
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
            this.model.destroy();
        },
        destroy: function () {
            this.$el.fadeOut(200, function () {
                Marionette.ItemView.prototype.destroy.call(this);
            }.bind(this));
        }
    });
});
