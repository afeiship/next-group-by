type GetKey = (key: number, obj: any) => string;
type Transform = (key: number, value: any, arr: any[]) => any;
type GroupedResult = Record<string, any[]>;

interface NxStatic {
  groupBy: (arr: any[], key: string | GetKey, tranform?: Transform) => GroupedResult;
}
