const rollup = require('rollup');
const jst = require('rollup-plugin-jst');

rollup.rollup({
    entry: 'src/index.js',
    external: [
        'backbone',
        'backbone.marionette',
        'underscore',
    ],
    plugins: [
        jst(),
    ],
}).then(function (bundle) {
    bundle.write({
        format: 'umd',
        globals: {
            backbone: 'Backbone',
            'backbone.marionette': 'Marionette',
            underscore: '_',
        },
        moduleName: 'marionette-notifications',
        dest: 'dist/marionette-notifications.js',
    });
}).catch(function (err) {
    console.log(String(err));
    process.exit(1);
});
