(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');

  nx.groupBy = function (inArray, inCallback) {
    var result = {};
    for (var index = 0; index < inArray.length; index++) {
      var element = inArray[index];
      var value = inCallback.call(inArray, index, element, inArray);
      result[value] = (result[value] || []).concat(element);
    }
    return result;
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.groupBy;
  }
})();
