type GetKey = (value: any, key: number, items: any[]) => string;
type GroupedResult = Record<string, any[]>;
type GroupByOptions = {
  expectKeys?: string[];
  computedKey?: string;
};

interface NxStatic {
  groupBy: (arr: any[], key: string | GetKey, options?: GroupByOptions) => GroupedResult;
}
