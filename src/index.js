import nx from '@jswork/next';

const defaults = {
  expectKeys: [],
  computedKey: '__computed__'
};

nx.groupBy = function(inArray, inTarget, inOptions) {
  const { computedKey, expectKeys } = nx.mix(null, defaults, inOptions);
  const result = {};
  result[computedKey] = {};

  // group by target
  for (let index = 0; index < inArray.length; index++) {
    const value = inArray[index];
    const isString = typeof inTarget === 'string';
    const key = isString ? nx.get(value, inTarget) : inTarget(value, index, inArray);
    result[key] = (result[key] || []).concat(value);
  }

  // check expect keys
  if (expectKeys.length) {
    expectKeys.forEach((key) => {
      if (!result[key]) result[key] = [];
    });
  }

  // stat keys
  for (const key in result) {
    if (key === computedKey) continue;
    result[computedKey][key] = result[key].length;
  }

  return result;
};

if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = nx.groupBy;
}

export default nx.groupBy;
