/// <amd-module name="@scom/scom-banner/global/utils.ts" />
declare module "@scom/scom-banner/global/utils.ts" {
    export interface IConfig {
        title: string;
        description?: string;
        backgroundImage?: string;
        linkButtons?: ILinkButton[];
        showHeader?: boolean;
        showFooter?: boolean;
    }
    export interface ILinkButton {
        caption?: string;
        url?: string;
    }
}
/// <amd-module name="@scom/scom-banner/global/index.ts" />
declare module "@scom/scom-banner/global/index.ts" {
    export interface PageBlock {
        getData: () => any;
        setData: (data: any) => Promise<void>;
        getTag: () => any;
        setTag: (tag: any) => Promise<void>;
        validate?: () => boolean;
        defaultEdit?: boolean;
        tag?: any;
        readonly onEdit: () => Promise<void>;
        readonly onConfirm: () => Promise<void>;
        readonly onDiscard: () => Promise<void>;
        edit: () => Promise<void>;
        confirm: () => Promise<void>;
        discard: () => Promise<void>;
        config: () => Promise<void>;
    }
    export * from "@scom/scom-banner/global/utils.ts";
}
/// <amd-module name="@scom/scom-banner/index.css.ts" />
declare module "@scom/scom-banner/index.css.ts" {
    export const containerStyle: string;
    export const backgroundStyle: string;
    export const actionButtonStyle: string;
}
/// <amd-module name="@scom/scom-banner" />
declare module "@scom/scom-banner" {
    import { Module, ControlElement, Container, IDataSchema } from '@ijstech/components';
    import { PageBlock, IConfig } from "@scom/scom-banner/global/index.ts";
    interface ScomBannerElement extends ControlElement {
        data: IConfig;
        showHeader?: boolean;
        showFooter?: boolean;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ["i-scom-banner"]: ScomBannerElement;
            }
        }
    }
    export default class ScomBanner extends Module implements PageBlock {
        private pnlCard;
        private pnlCardBody;
        private dappContainer;
        private _oldData;
        private _data;
        private oldTag;
        tag: any;
        defaultEdit: boolean;
        readonly onConfirm: () => Promise<void>;
        readonly onDiscard: () => Promise<void>;
        readonly onEdit: () => Promise<void>;
        static create(options?: ScomBannerElement, parent?: Container): Promise<ScomBanner>;
        constructor(parent?: Container, options?: ScomBannerElement);
        get showFooter(): boolean;
        set showFooter(value: boolean);
        get showHeader(): boolean;
        set showHeader(value: boolean);
        getData(): IConfig;
        setData(data: IConfig): Promise<void>;
        getTag(): any;
        private updateTag;
        setTag(value: any): Promise<void>;
        setTheme(value: string): void;
        getConfigSchema(): {
            type: string;
            required: any[];
            properties: {
                titleFontColor: {
                    type: string;
                    format: string;
                };
                descriptionFontColor: {
                    type: string;
                    format: string;
                };
                linkButtonCaptionColor: {
                    type: string;
                    format: string;
                };
                linkButtonColor: {
                    type: string;
                    format: string;
                };
                textAlign: {
                    type: string;
                    enum: string[];
                };
            };
        };
        onConfigSave(config: any): void;
        edit(): Promise<void>;
        confirm(): Promise<void>;
        discard(): Promise<void>;
        config(): Promise<void>;
        getEmbedderActions(): {
            name: string;
            icon: string;
            command: (builder: any, userInputData: any) => {
                execute: () => Promise<void>;
                undo: () => void;
                redo: () => void;
            };
            userInputDataSchema: IDataSchema;
        }[];
        getActions(): {
            name: string;
            icon: string;
            command: (builder: any, userInputData: any) => {
                execute: () => Promise<void>;
                undo: () => void;
                redo: () => void;
            };
            userInputDataSchema: IDataSchema;
        }[];
        _getActions(propertiesSchema: IDataSchema, themeSchema: IDataSchema): {
            name: string;
            icon: string;
            command: (builder: any, userInputData: any) => {
                execute: () => Promise<void>;
                undo: () => void;
                redo: () => void;
            };
            userInputDataSchema: IDataSchema;
        }[];
        onUpdateBlock(config: any): void;
        init(): void;
        render(): any;
    }
}
