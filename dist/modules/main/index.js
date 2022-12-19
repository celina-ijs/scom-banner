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
    let Main = class Main extends components_2.Module {
        constructor() {
            super(...arguments);
            this._data = {
                title: {
                    caption: '',
                    color: ''
                }
            };
            this.defaultEdit = true;
        }
        getData() {
            return this._data;
        }
        async setData(data) {
            this._data = data;
            this.cardConfig.data = data;
            this.onUpdateBlock();
        }
        getTag() {
            return this.tag;
        }
        async setTag(value) {
            this.tag = value;
        }
        async edit() {
            this.cardConfig.data = this._data;
            this.pnlCard.visible = false;
            this.cardConfig.visible = true;
        }
        async confirm() {
            this._data = this.cardConfig.data;
            this.onUpdateBlock();
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
            const emptyProp = !data.title.caption;
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
        onUpdateBlock() {
            this.renderUI();
        }
        renderUI() {
            var _a, _b, _c, _d, _e, _f;
            this.pnlCardBody.clearInnerHTML();
            const titleColor = this._data.title.color || Theme.text.primary;
            const descColor = ((_a = this._data.description) === null || _a === void 0 ? void 0 : _a.color) || Theme.text.primary;
            const item = (this.$render("i-hstack", { background: { image: this._data.background || '', color: 'transparent' }, minHeight: 500, verticalAlignment: "center", class: index_css_1.backgroundStyle },
                this.$render("i-vstack", { gap: "1.5rem", class: index_css_1.containerStyle, padding: { left: '1rem', right: '1rem' } },
                    this.$render("i-label", { caption: this._data.title.caption, font: { size: '3rem', bold: true, color: titleColor }, lineHeight: 1.5 }),
                    this.$render("i-label", { caption: ((_b = this._data.description) === null || _b === void 0 ? void 0 : _b.caption) || '', font: { size: '1.375rem', color: descColor }, lineHeight: 1.2 }),
                    ((_d = (_c = this._data) === null || _c === void 0 ? void 0 : _c.action) === null || _d === void 0 ? void 0 : _d.caption) ? (this.$render("i-panel", null,
                        this.$render("i-button", { caption: this._data.action.caption, padding: { left: '1rem', right: '1rem', top: '0.5rem', bottom: '0.5rem' }, onClick: () => this._data.action.link ? window.location.href = this._data.action.link : {}, font: { color: ((_e = this._data.action) === null || _e === void 0 ? void 0 : _e.captionColor) || Theme.colors.primary.contrastText }, background: { color: ((_f = this._data.action) === null || _f === void 0 ? void 0 : _f.color) || Theme.colors.primary.main }, class: index_css_1.actionButtonStyle }))) : this.$render("i-label", null))));
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
