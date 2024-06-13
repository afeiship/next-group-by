require('../src');

describe('next/groupBy', function() {
  test('nx.groupBy odd/eve', function() {
    const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const res1 = nx.groupBy(arr1, (item) => {
      return item % 2;
    });

    expect(res1['0'].length).toBe(4);
    expect(res1['1'].length).toBe(5);
  });

  test('nx.groupBy image type', function() {
    const arr = [
      'sljflsdjf.jpg',
      'bb.jpg',
      'bc.jpg',
      'ccsdf.jpg',
      'ccsdf.jpg',
      'http://www.agc.cn/1.jpg',
      'sldjfsld.jpg',
      'wx://localResource'
    ];
    const res1 = nx.groupBy(arr, (item) => {
      const rs = item.split('://');
      return rs.length === 2 ? rs[0] : 'normal';
    });

    expect(res1.normal.length).toBe(6);
    expect(res1.wx.length).toBe(1);
    expect(res1.http.length).toBe(1);
  });

  test('callback is string will get key from item', () => {
    const data = require('./group-key.js');
    const res = nx.groupBy(data, 'action');

    expect(res.fix).toEqual([
      { action: 'fix', message: '82b05c46 - fix: 大背景->小背景 文字错误修复' }, {
        action: 'fix',
        message: 'd5d915a1 - fix: 数据:全局干扰项-block/elements为空兼容'
      },
      { action: 'fix', message: 'f0c7f827 - fix(bug): v1.9.3+' }
    ]);
    expect(res.feat).toEqual([
      { action: 'feat', message: '7a03355d - feat: 非文本类型均支持添加多个' }
    ]);
  });

  test('pic with diff', () => {
    const data = require('./pic.json');
    const res = nx.groupBy(data, (item) => {
      return item.file.size ? 'wx' : 'old';
    });

    expect(res.old).toEqual(data);
  });

  test('group by fn with expectKeys', () => {
    const data = [
      { id: 1, name: 'a', score: 1 },
      { id: 2, name: 'b', score: 22 },
      { id: 3, name: 'c', score: 23 },
      { id: 4, name: 'd', score: 45 },
      { id: 5, name: 'e', score: 50 },
      { id: 6, name: 'f', score: 11 },
      { id: 7, name: 'g', score: 83 },
      { id: 8, name: 'h', score: 90 }
    ];
    const res = nx.groupBy(data, (item) => {
      if (item.score < 20) return 'l1';
      if (item.score < 40 && item.score >= 20) return 'l2';
      if (item.score < 60 && item.score >= 40) return 'l3';
      if (item.score < 80 && item.score >= 60) return 'l4';
      if (item.score >= 80) return 'l5';
      if (item.score > 100) return 'best';
    }, {
      expectKeys: ['l1', 'l2', 'l3', 'l4', 'l5', 'best']
    });
    expect(res).toEqual({
        l1: [{ id: 1, name: 'a', score: 1 }, { id: 6, name: 'f', score: 11 }],
        l2: [{ id: 2, name: 'b', score: 22 }, { id: 3, name: 'c', score: 23 }],
        l3: [{ id: 4, name: 'd', score: 45 }, { id: 5, name: 'e', score: 50 }],
        l5: [{ id: 7, name: 'g', score: 83 }, { id: 8, name: 'h', score: 90 }],
        l4: [],
        best: [],
        __raw__: data,
        __computed__: {
          __raw__: data.length,
          l1: 2,
          l2: 2,
          l3: 2,
          l4: 0,
          l5: 2,
          best: 0
        }
      }
    );
  });

  test('group by , change computedKey/rawKey', () => {
    const data = [
      { id: 1, name: 'a', score: 1 },
      { id: 2, name: 'b', score: 22 },
      { id: 3, name: 'c', score: 23 },
      { id: 4, name: 'd', score: 45 },
      { id: 5, name: 'e', score: 50 },
      { id: 6, name: 'f', score: 11 },
      { id: 7, name: 'g', score: 83 },
      { id: 8, name: 'h', score: 90 }
    ];
    const res = nx.groupBy(data, (item) => {
      if (item.score < 20) return 'l1';
      if (item.score < 40 && item.score >= 20) return 'l2';
      if (item.score < 60 && item.score >= 40) return 'l3';
      if (item.score < 80 && item.score >= 60) return 'l4';
      if (item.score >= 80) return 'l5';
      if (item.score > 100) return 'best';
    }, {
      expectKeys: ['l1', 'l2', 'l3', 'l4', 'l5', 'best'],
      computedKey: 'stats',
      rawKey: 'all'
    });
    expect(res).toEqual({
        all: data,
        l1: [{ id: 1, name: 'a', score: 1 }, { id: 6, name: 'f', score: 11 }],
        l2: [{ id: 2, name: 'b', score: 22 }, { id: 3, name: 'c', score: 23 }],
        l3: [{ id: 4, name: 'd', score: 45 }, { id: 5, name: 'e', score: 50 }],
        l5: [{ id: 7, name: 'g', score: 83 }, { id: 8, name: 'h', score: 90 }],
        l4: [],
        best: [],
        stats: {
          all: data.length,
          l1: 2,
          l2: 2,
          l3: 2,
          l4: 0,
          l5: 2,
          best: 0
        }
      }
    );
  });

  test('group by , no expectKeys', () => {
    const data = [
      { id: 1, name: 'a', score: 1 },
      { id: 2, name: 'b', score: 22 },
      { id: 3, name: 'c', score: 23 },
      { id: 4, name: 'd', score: 45 },
      { id: 5, name: 'e', score: 50 },
      { id: 6, name: 'f', score: 11 },
      { id: 7, name: 'g', score: 83 },
      { id: 8, name: 'h', score: 90 }
    ];
    const res = nx.groupBy(data, (item) => {
      if (item.score < 20) return 'l1';
      if (item.score < 40 && item.score >= 20) return 'l2';
      if (item.score < 60 && item.score >= 40) return 'l3';
      if (item.score < 80 && item.score >= 60) return 'l4';
      if (item.score >= 80) return 'l5';
      if (item.score > 100) return 'best';
    });
    expect(res).toEqual({
        __raw__: data,
        l1: [{ id: 1, name: 'a', score: 1 }, { id: 6, name: 'f', score: 11 }],
        l2: [{ id: 2, name: 'b', score: 22 }, { id: 3, name: 'c', score: 23 }],
        l3: [{ id: 4, name: 'd', score: 45 }, { id: 5, name: 'e', score: 50 }],
        l5: [{ id: 7, name: 'g', score: 83 }, { id: 8, name: 'h', score: 90 }],
        __computed__: {
          __raw__: data.length,
          l1: 2,
          l2: 2,
          l3: 2,
          l5: 2
        }
      }
    );
  });
});
