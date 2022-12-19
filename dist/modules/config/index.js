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
                title: {
                    caption: this.edtTitle.value || "",
                    color: this.edtTitleColor.value || ""
                },
                description: {
                    caption: this.edtDesc.value || "",
                    color: this.edtDescColor.value || ""
                },
                action: {
                    caption: this.edtButtonCaption.value || "",
                    captionColor: this.edtButtonCaptionColor.value || "",
                    color: this.edtButtonColor.value || "",
                    link: this.edtButtonLink.value || ""
                },
                background: this.backgroundData.base64
            };
            return _data;
        }
        set data(config) {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            this.edtTitle.value = ((_a = config.title) === null || _a === void 0 ? void 0 : _a.caption) || "";
            this.edtTitleColor.value = ((_b = config.title) === null || _b === void 0 ? void 0 : _b.color) || "";
            this.edtDesc.value = ((_c = config.description) === null || _c === void 0 ? void 0 : _c.caption) || "";
            this.edtDescColor.value = ((_d = config.description) === null || _d === void 0 ? void 0 : _d.color) || "";
            this.edtButtonCaption.value = ((_e = config.action) === null || _e === void 0 ? void 0 : _e.caption) || "";
            this.edtButtonLink.value = ((_f = config.action) === null || _f === void 0 ? void 0 : _f.link) || "";
            this.edtButtonCaptionColor.value = ((_g = config.action) === null || _g === void 0 ? void 0 : _g.captionColor) || "";
            this.edtButtonColor.value = ((_h = config.action) === null || _h === void 0 ? void 0 : _h.color) || "";
            if (config.background) {
                this.edtBackground.preview(config.background);
            }
            if (!this.edtBackground.fileList.length && config.background)
                this.edtBackground.fileList = [new File([], '')];
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
                this.$render("i-label", { caption: "Title Font Color:" }),
                this.$render("i-input", { id: "edtTitleColor", inputType: "color", width: "100px" }),
                this.$render("i-label", { caption: "Description:" }),
                this.$render("i-input", { id: "edtDesc", class: config_css_1.textareaStyle, width: "100%", height: "auto", resize: "auto-grow", inputType: 'textarea' }),
                this.$render("i-label", { caption: "Description Font Color:" }),
                this.$render("i-input", { id: "edtDescColor", inputType: "color", width: "100px" }),
                this.$render("i-label", { caption: "Link Button Caption" }),
                this.$render("i-input", { id: "edtButtonCaption", width: "100%" }),
                this.$render("i-label", { caption: "Link Button Color:" }),
                this.$render("i-input", { id: "edtButtonColor", inputType: "color", width: "100px" }),
                this.$render("i-label", { caption: "Link Button Caption Color:" }),
                this.$render("i-input", { id: "edtButtonCaptionColor", inputType: "color", width: "100px" }),
                this.$render("i-label", { caption: "Link Button URL:" }),
                this.$render("i-input", { id: "edtButtonLink", width: "100%" }),
                this.$render("i-label", { caption: "Backgound Image:" }),
                this.$render("i-upload", { id: "edtBackground", maxHeight: 200, maxWidth: 200, class: config_css_1.uploadStyle, onChanged: this.onChangedImage.bind(this), onRemoved: () => this.onRemovedImage() })));
        }
    };
    Config = __decorate([
        components_2.customModule,
        components_2.customElements("pageblock-banner-config")
    ], Config);
    exports.default = Config;
});
