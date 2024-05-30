type GetKey = (value: any, key: number, items: any[]) => string;
type GroupedResult = Record<string, any[]>;

interface NxStatic {
  groupBy: (arr: any[], key: string | GetKey, options?: { expectKeys?: string[] }) => GroupedResult;
}
