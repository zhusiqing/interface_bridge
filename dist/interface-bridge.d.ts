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
    pickData(data: InterfaceData, keys?: string[]): InterfaceData;
    pickReverseData(data: InterfaceData, keys?: string[]): InterfaceData;
    omitData(data: InterfaceData, keys?: string[]): InterfaceData;
    omitReverseData(data: InterfaceData, keys?: string[]): InterfaceData;
}

export { Bridge, InterfaceBridge, InterfaceData, Bridge as default };
