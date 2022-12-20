var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@banner/main/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.actionButtonStyle = exports.backgroundStyle = exports.containerStyle = void 0;
    const Theme = components_1.Styles.Theme.ThemeVars;
    exports.containerStyle = components_1.Styles.style({
        width: 'var(--layout-container-width)',
        maxWidth: 'var(--layout-container-max_width)',
        overflow: 'var(--layout-container-overflow)',
        textAlign: 'var(--layout-container-text_align)',
        margin: '0 auto'
    });
    exports.backgroundStyle = components_1.Styles.style({
        backgroundPosition: 'center !important',
        backgroundSize: 'cover !important'
    });
    exports.actionButtonStyle = components_1.Styles.style({
        boxShadow: 'none',
        $nest: {
            '&:hover': {
                background: Theme.colors.primary.dark,
                color: Theme.colors.primary.contrastText
            },
            '> i-icon:hover': {
                fill: '#fff !important'
            }
        }
    });
});
define("@banner/main", ["require", "exports", "@ijstech/components", "@banner/config", "@banner/main/index.css.ts"], function (require, exports, components_2, config_1, index_css_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Config = void 0;
    exports.Config = config_1.default;
    const Theme = components_2.Styles.Theme.ThemeVars;
    const configSchema = {
        type: 'object',
        required: [],
        properties: {
            titleFontColor: {
                type: 'string',
                format: 'color'
            },
            descriptionFontColor: {
                type: 'string',
                format: 'color'
            },
            linkButtonCaptionColor: {
                type: 'string',
                format: 'color'
            },
            linkButtonColor: {
                type: 'string',
                format: 'color'
            },
            textAlign: {
                type: 'string',
                enum: [
                    'left',
                    'center',
                    'right'
                ]
            }
        }
    };
    let Main = class Main extends components_2.Module {
        constructor() {
            super(...arguments);
            this._data = { title: '' };
            this.defaultEdit = true;
        }
        getData() {
            return this._data;
        }
        async setData(data) {
            this._data = data;
            this.cardConfig.data = data;
            this.onUpdateBlock(this.tag);
        }
        getTag() {
            return this.tag;
        }
        async setTag(value) {
            this.tag = value;
            this.onUpdateBlock(value);
        }
        getConfigSchema() {
            return configSchema;
        }
        onConfigSave(config) {
            this.tag = config;
            this.onUpdateBlock(config);
        }
        async edit() {
            this.cardConfig.data = this._data;
            this.pnlCard.visible = false;
            this.cardConfig.visible = true;
        }
        async confirm() {
            this._data = this.cardConfig.data;
            this.onUpdateBlock(this.tag);
            this.pnlCard.visible = true;
            this.cardConfig.visible = false;
        }
        async discard() {
            this.pnlCard.visible = true;
            this.cardConfig.visible = false;
        }
        async config() { }
        validate() {
            const data = this.cardConfig.data;
            const emptyProp = !data.title;
            if (emptyProp) {
                this.alertElm.message = {
                    status: 'error',
                    content: 'Required field is missing.'
                };
                this.alertElm.showModal();
                return false;
            }
            return true;
        }
        onUpdateBlock(config) {
            var _a;
            const { titleFontColor = Theme.text.primary, descriptionFontColor = Theme.text.primary, linkButtonCaptionColor = Theme.colors.primary.contrastText, linkButtonColor = Theme.colors.primary.main, textAlign } = config || {};
            this.pnlCardBody.clearInnerHTML();
            const mainStack = (this.$render("i-vstack", { gap: "1.5rem", class: index_css_1.containerStyle, padding: { left: '1rem', right: '1rem' } },
                this.$render("i-label", { caption: this._data.title, font: { size: '3rem', bold: true, color: titleFontColor }, lineHeight: 1.5 }),
                this.$render("i-label", { caption: this._data.description || '', font: { size: '1.375rem', color: descriptionFontColor }, lineHeight: 1.2 }),
                ((_a = this._data) === null || _a === void 0 ? void 0 : _a.linkCaption) ? (this.$render("i-panel", null,
                    this.$render("i-button", { caption: this._data.linkCaption, padding: { left: '1rem', right: '1rem', top: '0.5rem', bottom: '0.5rem' }, onClick: () => { var _a; return ((_a = this._data) === null || _a === void 0 ? void 0 : _a.linkUrl) ? window.location.href = this._data.linkUrl : {}; }, font: { color: linkButtonCaptionColor }, background: { color: linkButtonColor }, class: index_css_1.actionButtonStyle }))) : this.$render("i-label", null)));
            mainStack.style.textAlign = textAlign || 'left';
            const item = (this.$render("i-hstack", { background: { image: this._data.backgroundImage || '', color: 'transparent' }, minHeight: 500, verticalAlignment: "center", class: index_css_1.backgroundStyle }, mainStack));
            this.pnlCardBody.appendChild(item);
        }
        render() {
            return (this.$render("i-panel", { id: 'pnlBlock' },
                this.$render("i-panel", { id: 'pnlCard' },
                    this.$render("i-hstack", { id: 'pnlCardHeader', verticalAlignment: 'center', horizontalAlignment: 'center' }),
                    this.$render("i-panel", { id: 'pnlCardBody' }),
                    this.$render("i-panel", { id: 'pnlCardFooter' })),
                this.$render("pageblock-banner-config", { id: 'cardConfig', visible: false }),
                this.$render("pageblock-banner-alert", { id: "alertElm" })));
        }
    };
    Main = __decorate([
        components_2.customModule
    ], Main);
    exports.default = Main;
});
