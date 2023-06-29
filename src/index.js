import nx from '@jswork/next';

const RETURN_VALUE = (_, value) => value;

nx.groupBy = function (inArray, inTarget, inTransform) {
  const result = {};
  const transoform = inTransform || RETURN_VALUE;
  for (let index = 0; index < inArray.length; index++) {
    const value = inArray[index];
    const isString = typeof inTarget === 'string';
    const key = isString ? nx.get(value, inTarget) : inTarget(index, value, inArray);
    const transformedValue = transoform(index, value, inArray);
    result[key] = (result[key] || []).concat(transformedValue);
  }
  return result;
};

if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = nx.groupBy;
}

export default nx.groupBy;
