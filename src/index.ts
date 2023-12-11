import { pick, omit } from 'lodash-es';

export interface InterfaceData {
  [index: string]: any;
}
export interface InterfaceBridge {
  [index: string]: string;
}
const mapBridge = (bridge: InterfaceBridge) => (data: InterfaceData) => {
  const result: InterfaceBridge = {};
  const keys = Object.keys(bridge);
  keys.forEach((key) => {
    const mapKey = bridge[key] ?? key;
    result[mapKey] = data[key];
  });
  return result;
};

const reverseKeyValue = (bridge: InterfaceBridge) =>
  Object.fromEntries(Object.entries(bridge).map(([key, value]) => [value, key]));

export class Bridge {
  bridge: InterfaceBridge;
  map: (data: InterfaceData) => InterfaceData;
  reverseMap: (data: InterfaceData) => InterfaceData;
  constructor(bridge: InterfaceBridge) {
    this.bridge = bridge;
    this.map = mapBridge(bridge);
    this.reverseMap = mapBridge(reverseKeyValue(bridge));
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
