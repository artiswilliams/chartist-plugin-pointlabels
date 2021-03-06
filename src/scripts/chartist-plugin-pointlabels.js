/**
 * Chartist.js plugin to display a data label on top of the points in a line chart.
 *
 */
/* global Chartist */
(function(window, document, Chartist) {
  'use strict';

  var defaultOptions = {
    labelClass: 'ct-label',
    labelOffset: {
      x: 0,
      y: -10
    },
    textAnchor: 'middle',
    labelInterpolationFnc: Chartist.noop
  };

  Chartist.plugins = Chartist.plugins || {};
  Chartist.plugins.ctPointLabels = function(options) {

    options = Chartist.extend({}, defaultOptions, options);

    return function ctPointLabels(chart) {
      if(chart instanceof Chartist.Line) {
        chart.on('draw', function(data) {
          if(data.type === 'point') {
            data.group.elem('text', {
              x: data.x + options.labelOffset.x,
              y: data.y + options.labelOffset.y,
              style: 'text-anchor: ' + options.textAnchor
            }, options.labelClass).text(options.labelInterpolationFnc(data.value.x === undefined ? data.value.y : data.value.x + ', ' + data.value.y));
          }
        });
      }
      if(chart instanceof Chartist.Bar) {
        chart.on('draw', function(data) {
          if(data.type === 'bar') {
            data.group.elem('text', {
              x: data.x2 + options.labelOffset.x,
              y: data.y2 + options.labelOffset.y,
              style: 'text-anchor: ' + options.textAnchor
            }, options.labelClass).text(options.labelInterpolationFnc(data.value.x === undefined ? '' : data.value.x));
          }
        });
      }
    };
  };

}(window, document, Chartist));
