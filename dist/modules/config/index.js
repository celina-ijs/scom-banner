var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@banner/config/config.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.pointerStyle = exports.uploadStyle = exports.textareaStyle = void 0;
    exports.textareaStyle = components_1.Styles.style({
        $nest: {
            'textarea': {
                border: 'none',
                outline: 'none'
            }
        }
    });
    exports.uploadStyle = components_1.Styles.style({
        margin: '0',
        $nest: {
            '.i-upload_preview-img': {
                maxHeight: '100%',
                display: 'block'
            },
            '.i-upload-wrapper': {
                maxHeight: 'inherit',
                overflow: 'hidden',
                marginBottom: 0
            }
        }
    });
    exports.pointerStyle = components_1.Styles.style({
        cursor: 'pointer'
    });
});
define("@banner/config", ["require", "exports", "@ijstech/components", "@banner/config/config.css.ts"], function (require, exports, components_2, config_css_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let Config = class Config extends components_2.Module {
        constructor() {
            super(...arguments);
            this.backgroundData = {
                file: undefined,
                base64: ''
            };
        }
        get data() {
            const _data = {
                title: this.edtTitle.value || "",
                description: this.edtDesc.value || "",
                linkCaption: this.edtButtonCaption.value || "",
                linkUrl: this.edtButtonLink.value || "",
                backgroundImage: this.edtBackgroundUrl.value || "" //this.backgroundData.base64
            };
            return _data;
        }
        set data(config) {
            this.edtTitle.value = config.title || "";
            this.edtDesc.value = config.description || "";
            this.edtButtonCaption.value = config.linkCaption || "";
            this.edtButtonLink.value = config.linkUrl || "";
            if (config.backgroundImage)
                this.edtBackground.preview(config.backgroundImage);
            // if (!this.edtBackground.fileList.length && config.backgroundImage)
            //   this.edtBackground.fileList = [new File([], '')];
            this.edtBackgroundUrl.value = config.backgroundImage;
        }
        onRemovedImage() {
            this.backgroundData.base64 = '';
            this.backgroundData.file = undefined;
        }
        async onChangedImage(source, files) {
            const file = files[0];
            this.backgroundData.base64 = file ? await source.toBase64(file) : undefined;
            this.backgroundData.file = file;
        }
        render() {
            return (this.$render("i-vstack", { id: "pnlConfig", gap: '0.5rem', padding: { top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' } },
                this.$render("i-hstack", null,
                    this.$render("i-label", { caption: "Title" }),
                    this.$render("i-label", { caption: "*", font: { color: 'red' }, margin: { left: '4px' } }),
                    this.$render("i-label", { caption: ":" })),
                this.$render("i-input", { id: "edtTitle", width: "100%" }),
                this.$render("i-label", { caption: "Description:" }),
                this.$render("i-input", { id: "edtDesc", class: config_css_1.textareaStyle, width: "100%", height: "auto", resize: "auto-grow", inputType: 'textarea' }),
                this.$render("i-label", { caption: "Link Button Caption" }),
                this.$render("i-input", { id: "edtButtonCaption", width: "100%" }),
                this.$render("i-label", { caption: "Link Button URL:" }),
                this.$render("i-input", { id: "edtButtonLink", width: "100%" }),
                this.$render("i-label", { caption: "Backgound Image:", visible: false }),
                this.$render("i-upload", { visible: false, id: "edtBackground", maxHeight: 200, maxWidth: 200, class: config_css_1.uploadStyle, onChanged: this.onChangedImage.bind(this), onRemoved: () => this.onRemovedImage() }),
                this.$render("i-label", { caption: "Background image url" }),
                this.$render("i-input", { id: "edtBackgroundUrl", width: "100%" })));
        }
    };
    Config = __decorate([
        components_2.customModule,
        components_2.customElements("pageblock-banner-config")
    ], Config);
    exports.default = Config;
});
