import nx from '@jswork/next';

const defaults = {
  expectKeys: [],
  rawKey: '__raw__',
  computedKey: '__computed__'
};

nx.groupBy = function (inArray, inTarget, inOptions) {
  const { computedKey, expectKeys, rawKey } = nx.mix(null, defaults, inOptions);
  const result = {};

  // support raw references
  if (rawKey) result[rawKey] = inArray.slice(0);

  // group by target
  for (let index = 0; index < inArray.length; index++) {
    const value = inArray[index];
    const isString = typeof inTarget === 'string';
    const key = isString ? nx.get(value, inTarget) : inTarget(value, index, inArray);
    result[key] = (result[key] || []).concat(value);
  }

  // support __computed__
  if (computedKey) {
    result[computedKey] = {};
    // check expect keys
    if (expectKeys.length) {
      expectKeys.forEach((key) => {
        if (!result[key]) result[key] = [];
        if (!result[computedKey][key]) result[computedKey][key] = 0;
      });
    }

    // stat keys
    for (const key in result) {
      if (key === computedKey) continue;
      result[computedKey][key] = result[key].length;
    }
  }

  return result;
};

if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = nx.groupBy;
}

export default nx.groupBy;
