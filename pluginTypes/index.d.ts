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
    import { Module, ControlElement, Container } from '@ijstech/components';
    import { IConfig } from "@scom/scom-banner/global/index.ts";
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
    export default class ScomBanner extends Module {
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
        private getData;
        private setData;
        private getTag;
        private updateTag;
        private setTag;
        private setTheme;
        private getEmbedderActions;
        private getActions;
        private _getActions;
        getConfigurators(): {
            name: string;
            target: string;
            getActions: any;
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
        }[];
        private onUpdateBlock;
        init(): void;
        render(): any;
    }
}
