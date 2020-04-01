/*!
 * name: @feizheng/next-group-by
 * description: Creates an object composed of keys generated from the results of running each element of collection thru iteratee.
 * url: https://github.com/afeiship/next-group-by
 * version: 1.1.0
 * date: 2020-04-01 12:45:34
 * license: MIT
 */

(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');
  /* prettier-ignore */
  var RETURN_VALUE = function(_, value) { return value;}

  nx.groupBy = function (inArray, inCallback, inTransform) {
    var result = {};
    var transoform = inTransform || RETURN_VALUE;
    for (var index = 0; index < inArray.length; index++) {
      var value = inArray[index];
      var key = inCallback(index, value, inArray);
      var transformedValue = transoform(index, value, inArray);
      result[key] = (result[key] || []).concat(transformedValue);
    }
    return result;
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.groupBy;
  }
})();

//# sourceMappingURL=next-group-by.js.map
