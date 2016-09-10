module.exports = function (config) {
    'use strict';

    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'build/js/vendor/*.js',
            'build/js/bundle*.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'src/tests/**/*.js'
        ],
        autoWatch: true,
        singleRun: false,
        browsers: ['PhantomJS']
    });
};
