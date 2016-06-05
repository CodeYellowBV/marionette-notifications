const rollup = require('rollup');
const jst = require('rollup-plugin-jst');

rollup.rollup({
    entry: 'src/index.js',
    external: [
        'marionette',
        'underscore',
        'crux/collection', 'crux/model',
    ],
    plugins: [
        jst(),
    ],
}).then(function (bundle) {
    bundle.write({
        format: 'cjs',
        moduleName: 'marionette-notifications',
        dest: 'dist/marionette-notifications.js',
    });
}).catch(function (err) {
    console.log(String(err));
    process.exit(1);
});
