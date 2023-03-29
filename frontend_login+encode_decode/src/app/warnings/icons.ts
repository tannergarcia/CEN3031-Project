export class Warning {
    id?: string;
    type?: WarningTypes;
    content?: string;
    closing?: boolean;
    static_route?: boolean;
    fade?: boolean;

    constructor(init?:Partial<Warning>) {
        Object.assign(this, init);
    }
}

export class WarningOptions {
    id?: string;
    closing?: boolean;
    static_route?: boolean;
}

export enum WarningTypes {
    Success,
    Error,
    Info,
    Warning
}