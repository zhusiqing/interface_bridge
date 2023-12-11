interface InterfaceData {
    [index: string]: any;
}
interface InterfaceBridge {
    [index: string]: string;
}
declare class Bridge {
    bridge: InterfaceBridge;
    map: (data: InterfaceData) => InterfaceData;
    reverseMap: (data: InterfaceData) => InterfaceData;
    constructor(bridge: InterfaceBridge);
    pickData<T = InterfaceData>(data: InterfaceData, keys?: string[]): T;
    pickReverseData<T = InterfaceData>(data: InterfaceData, keys?: string[]): T;
    omitData<T = InterfaceData>(data: InterfaceData, keys?: string[]): T;
    omitReverseData<T = InterfaceData>(data: InterfaceData, keys?: string[]): T;
}

export { Bridge, InterfaceBridge, InterfaceData, Bridge as default };
