(function () {
  require('../src');

  var countryData = [
    {
      countryName: '安道尔',
      countryPinyin: 'an dao er',
      phoneCode: '00376',
      countryCode: 'AD'
    },
    {
      countryName: '法属圭亚那',
      countryPinyin: 'fa shu gui ya na',
      phoneCode: '00594',
      countryCode: 'GF'
    },
    {
      countryName: '根西岛',
      countryPinyin: 'gen xi dao',
      phoneCode: '0044',
      countryCode: 'GG'
    },
    {
      countryName: '加纳',
      countryPinyin: 'jia na',
      phoneCode: '00233',
      countryCode: 'GH'
    },
    {
      countryName: '直布罗陀',
      countryPinyin: 'zhi bu luo tuo',
      phoneCode: '00350',
      countryCode: 'GI'
    }
  ];

  describe('next/groupBy', function () {
    test('nx.groupBy odd/eve', function () {
      var arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

      var res1 = nx.groupBy(arr1, (_, item) => {
        return item % 2;
      });

      expect(res1['0'].length).toBe(4);
      expect(res1['1'].length).toBe(5);
    });

    test('nx.groupBy image type', function () {
      var arr = [
        'sljflsdjf.jpg',
        'bb.jpg',
        'bc.jpg',
        'ccsdf.jpg',
        'ccsdf.jpg',
        'http://www.agc.cn/1.jpg',
        'sldjfsld.jpg',
        'wx://localResource'
      ];

      var res1 = nx.groupBy(arr, (_, item) => {
        var rs = item.split('://');
        return rs.length === 2 ? rs[0] : 'normal';
      });

      expect(res1.normal.length).toBe(6);
      expect(res1.wx.length).toBe(1);
      expect(res1.http.length).toBe(1);
    });

    test('nx.groupBy with transoform', () => {
      var data = require('./table_slim.json');
      var res = nx.groupBy(
        data,
        (_, item) => item.row,
        (_, item) => {
          return { row: item.row, col: item.column };
        }
      );
      expect(res).toEqual({ '0': [{ row: 0, col: 0 }], '1': [{ row: 1, col: 1 }] });
    });

    test("callback is string will get key from item", () => {
      var data = require('./group-key.js');
      var res = nx.groupBy(data, 'action');

      expect(res).toEqual({
        fix: [
          { action: 'fix', message: '82b05c46 - fix: 大背景->小背景 文字错误修复' },
          {
            action: 'fix',
            message: 'd5d915a1 - fix: 数据:全局干扰项-block/elements为空兼容'
          },
          { action: 'fix', message: 'f0c7f827 - fix(bug): v1.9.3+' }
        ],
        feat: [{ action: 'feat', message: '7a03355d - feat: 非文本类型均支持添加多个' }]
      });
    });
  });
})();
