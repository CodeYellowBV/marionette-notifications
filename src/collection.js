import Collection from 'crux/collection';
import MNotification from './model';

export default Collection.extend({
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
