global.React = require('react');

const testContext = require.context('./src/', true, /\.test\.js$/);
testContext.keys().forEach(testContext);

const sourceContext = require.context('./src/', true, /\.js$/);
sourceContext.keys().forEach(sourceContext);
