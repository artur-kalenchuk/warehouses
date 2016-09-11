/**
 * This file/module contains configuration for the build process.
 */
module.exports = {

    app_files: {
        js: ['src/app/*.js', 'src/app/**/*js'],
        jsunit: ['src/tests/*Spec.js'],

        atpl: ['src/app/**/*-tpl.html'],

        html: ['src/index.html'],
        sass: 'src/sass/main.scss'
    },


    vendor_files: {
        css: [
            'vendor/angular-material-data-table/dist/md-data-table.css',
            'vendor/angular-loading-bar/build/loading-bar.css',
            'vendor/angular-ui-notification/dist/angular-ui-notification.css',
            'vendor/angular-material-expansion-panel/dist/md-expansion-panel.css',
            'vendor/material-design-icons/iconfont/material-icons.css'
        ],
        assets: [
            'vendor/material-design-icons/iconfont/MaterialIcons-Regular.eot',
            'vendor/material-design-icons/iconfont/MaterialIcons-Regular.ijmap',
            'vendor/material-design-icons/iconfont/MaterialIcons-Regular.svg',
            'vendor/material-design-icons/iconfont/MaterialIcons-Regular.ttf',
            'vendor/material-design-icons/iconfont/MaterialIcons-Regular.woff',
            'vendor/material-design-icons/iconfont/MaterialIcons-Regular.woff2'
        ]
    }
};
