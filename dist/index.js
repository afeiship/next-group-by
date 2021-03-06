/*!
 * name: @jswork/next-group-by
 * description: Creates an object composed of keys generated from the results of running each element of collection thru iteratee.
 * homepage: https://github.com/afeiship/next-group-by
 * version: 1.0.0
 * date: 2020-11-20 13:22:22
 * license: MIT
 */

(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  /* prettier-ignore */
  var RETURN_VALUE = function (_, value) { return value; }
  var STRING = 'string';

  nx.groupBy = function (inArray, inTarget, inTransform) {
    var result = {};
    var transoform = inTransform || RETURN_VALUE;
    for (var index = 0; index < inArray.length; index++) {
      var value = inArray[index];
      var key =
        typeof inTarget === STRING ? nx.get(value, inTarget) : inTarget(index, value, inArray);
      var transformedValue = transoform(index, value, inArray);
      result[key] = (result[key] || []).concat(transformedValue);
    }
    return result;
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.groupBy;
  }
})();
