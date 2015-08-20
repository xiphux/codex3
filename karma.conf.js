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
      'app/read/**/*.js',
      'app/**/*.html'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome', 'PhantomJS'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-coverage',
            'karma-ng-html2js-preprocessor'
    ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },
    
    reporters: ['progress', 'coverage'],
    
    preprocessors: {
      'app/**/!(*.test).js': ['coverage'],
      'app/**/*.html': ['ng-html2js']
    },
    
    ngHtml2JsPreprocessor: {
      stripPrefix: 'app/'
    }

  });
};
