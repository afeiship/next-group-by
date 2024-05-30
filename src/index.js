import nx from '@jswork/next';

const defaults = {
  expectKeys: []
};

nx.groupBy = function(inArray, inTarget, inOptions) {
  const result = {};
  const options = nx.mix(null, defaults, inOptions);
  // group by target
  for (let index = 0; index < inArray.length; index++) {
    const value = inArray[index];
    const isString = typeof inTarget === 'string';
    const key = isString ? nx.get(value, inTarget) : inTarget(value, index, inArray);
    result[key] = (result[key] || []).concat(value);
  }
  // check expect keys
  if (options.expectKeys.length) {
    options.expectKeys.forEach((key) => {
      if (!result[key]) result[key] = [];
    });
  }

  return result;
};

if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = nx.groupBy;
}

export default nx.groupBy;
