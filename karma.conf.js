module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'dev/bower_components/angular/angular.js',
      'dev/bower_components/angular-route/angular-route.js',
      'dev/bower_components/angular-mocks/angular-mocks.js',
      'dev/bower_components/angular-resource/angular-resource.js',
      'dev/bower_components/lodash/lodash.js',
      'dev/bower_components/material-design-lite/material.js',
      'app/components/**/*.module.js',
      'app/components/**/*.js',
      'app/browse/**/*.module.js',
      'app/browse/**/*.js',
      'app/read/**/*.module.js',
      'app/read/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
