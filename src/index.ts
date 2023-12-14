import { pick, omit } from 'lodash-es';

export interface InterfaceData {
  [index: string]: any;
}
export interface InterfaceBridge {
  [index: string]: string;
}
export interface InterfaceOptions {
  // 是否精确匹配
  isExact?: boolean
}

const mapBridge = (bridge: InterfaceBridge, options: InterfaceOptions) => (data: InterfaceData) => {
  const result: InterfaceBridge = {};
  const keys = Object.keys(bridge);
  // 储存数据key
  const dataKeys = Object.keys(data)
  keys.forEach((key) => {
    const mapKey = bridge[key] ?? key;
    result[mapKey] = data[key];
    // 删除已转化的key
    const useIndex = dataKeys.findIndex(el => el === key)
    if (~useIndex) {
      dataKeys.splice(useIndex, 1)
    }
  });
  // 是否是精确匹配
  if (!options.isExact) {
    // 将未转化的key和值放入
    dataKeys.forEach((key) => {
      result[key] = data[key];
    })
  }

  return result;
};

const reverseKeyValue = (bridge: InterfaceBridge) =>
  Object.fromEntries(Object.entries(bridge).map(([key, value]) => [value, key]));

export class Bridge {
  bridge: InterfaceBridge;
  map: (data: InterfaceData) => InterfaceData;
  reverseMap: (data: InterfaceData) => InterfaceData;
  options: InterfaceOptions = {
    isExact: false
  };
  constructor(bridge: InterfaceBridge, options: InterfaceOptions) {
    this.bridge = bridge;
    this.options = Object.assign(this.options, options);
    this.map = mapBridge(bridge, this.options);
    this.reverseMap = mapBridge(reverseKeyValue(bridge), this.options);
  }
  pickData<T = InterfaceData>(data: InterfaceData, keys?: string[]): T {
    const mapData = this.map(data);
    return (keys?.length ? pick(mapData, keys) : mapData) as T;
  }
  pickReverseData<T = InterfaceData>(data: InterfaceData, keys?: string[]): T {
    const reverseMapData = this.reverseMap(data);
    return (keys?.length ? pick(reverseMapData, keys) : reverseMapData) as T;
  }

  omitData<T = InterfaceData>(data: InterfaceData, keys?: string[]): T {
    const mapData = this.map(data);
    return (keys?.length ? omit(mapData, keys) : mapData) as T;
  }

  omitReverseData<T = InterfaceData>(data: InterfaceData, keys?: string[]): T {
    const reverseMapData = this.reverseMap(data);
    return (keys?.length ? omit(reverseMapData, keys) : reverseMapData) as T;
  }
}
export default Bridge;

