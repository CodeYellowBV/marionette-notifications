import Marionette from 'backbone.marionette';
import VItem from './itemView';
import CNotification from './collection';

export default Marionette.CollectionView.extend({
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
