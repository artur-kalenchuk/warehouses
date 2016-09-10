/**
 * This file/module contains configuration for the build process.
 */
module.exports = {

    app_files: {
        js: ['src/app/*.js'],
        jsunit: ['src/tests/*Spec.js'],

        atpl: ['src/app/**/*-tpl.html'],

        html: ['src/index.html'],
        sass: 'src/sass/main.scss'
    },


    vendor_files: {
        js: [
            'vendor/angular/angular.js',
            'vendor/angular-animate/angular-animate.min.js',
            'vendor/angular-aria/angular-aria.min.js',
            'vendor/angular-material/angular-material.js',
            'vendor/angular-sanitize/angular-sanitize.js',
            'vendor/angular-messages/angular-messages.js',
            'vendor/angular-ui-router/release/angular-ui-router.js',
            'vendor/lodash/lodash.js',
            'vendor/moment/moment.js',
            'vendor/angular-local-storage/dist/angular-local-storage.min.js',
            'vendor/angular-material-data-table/dist/md-data-table.js',
            'vendor/angular-filter/dist/angular-filter.js',
            'vendor/angular-loading-bar/build/loading-bar.js',
            'vendor/angular-ui-notification/dist/angular-ui-notification.js'
        ],
        css: [
            'vendor/angular-material-data-table/dist/md-data-table.css',
            'vendor/angular-loading-bar/build/loading-bar.css',
            'vendor/angular-ui-notification/dist/angular-ui-notification.css'
        ]
    }
};
