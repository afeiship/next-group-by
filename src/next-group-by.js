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
