var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/scom-banner/global/utils.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("@scom/scom-banner/global/index.ts", ["require", "exports", "@scom/scom-banner/global/utils.ts"], function (require, exports, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(utils_1, exports);
});
define("@scom/scom-banner/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
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
define("@scom/scom-banner", ["require", "exports", "@ijstech/components", "@scom/scom-banner/index.css.ts"], function (require, exports, components_2, index_css_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    const propertiesSchema = {
        type: 'object',
        properties: {
            title: {
                type: 'string',
                minLength: 1,
                required: true
            },
            description: {
                type: 'string'
            },
            linkCaption: {
                type: 'string'
            },
            linkUrl: {
                type: 'string'
            },
            backgroundImage: {
                type: 'string'
            }
        }
    };
    let ScomBanner = class ScomBanner extends components_2.Module {
        constructor(parent, options) {
            super(parent, options);
            this._oldData = { title: '' };
            this._data = { title: '' };
            this.oldTag = {};
            this.tag = {};
            this.defaultEdit = true;
        }
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        getData() {
            return this._data;
        }
        async setData(data) {
            this._oldData = Object.assign({}, this._data);
            this._data = data;
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
            // this.pnlCard.visible = false
        }
        async confirm() {
            this.onUpdateBlock(this.tag);
            // this.pnlCard.visible = true
        }
        async discard() {
            // this.pnlCard.visible = true
        }
        async config() { }
        getEmbedderActions() {
            const themeSchema = {
                type: 'object',
                properties: {
                    titleFontColor: {
                        type: 'string',
                        format: 'color',
                        readOnly: true
                    },
                    descriptionFontColor: {
                        type: 'string',
                        format: 'color',
                        readOnly: true
                    },
                    linkButtonCaptionColor: {
                        type: 'string',
                        format: 'color',
                        readOnly: true
                    },
                    linkButtonColor: {
                        type: 'string',
                        format: 'color',
                        readOnly: true
                    },
                    textAlign: {
                        type: 'string',
                        enum: [
                            'left',
                            'center',
                            'right'
                        ],
                        readOnly: true
                    }
                }
            };
            return this._getActions(propertiesSchema, themeSchema);
        }
        getActions() {
            const themeSchema = {
                type: 'object',
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
            return this._getActions(propertiesSchema, themeSchema);
        }
        _getActions(propertiesSchema, themeSchema) {
            const actions = [
                {
                    name: 'Settings',
                    icon: 'cog',
                    command: (builder, userInputData) => {
                        return {
                            execute: async () => {
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(userInputData);
                                this.setData(userInputData);
                            },
                            undo: () => {
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(this._oldData);
                                this.setData(this._oldData);
                            },
                            redo: () => { }
                        };
                    },
                    userInputDataSchema: propertiesSchema,
                },
                {
                    name: 'Theme Settings',
                    icon: 'palette',
                    command: (builder, userInputData) => {
                        return {
                            execute: async () => {
                                if (!userInputData)
                                    return;
                                this.oldTag = Object.assign({}, this.tag);
                                this.setTag(userInputData);
                                if (builder)
                                    builder.setTag(userInputData);
                            },
                            undo: () => {
                                if (!userInputData)
                                    return;
                                this.setTag(this.oldTag);
                                if (builder)
                                    builder.setTag(this.oldTag);
                            },
                            redo: () => { }
                        };
                    },
                    userInputDataSchema: themeSchema
                }
            ];
            return actions;
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
            const item = (this.$render("i-hstack", { background: { image: this._data.backgroundImage || '', color: 'transparent' }, verticalAlignment: "center", class: index_css_1.backgroundStyle }, mainStack));
            this.pnlCardBody.appendChild(item);
        }
        init() {
            super.init();
            const data = this.getAttribute('data', true);
            if (data) {
                this.setData(data);
            }
        }
        render() {
            return (this.$render("i-panel", { id: "pnlBlock" },
                this.$render("i-panel", { id: "pnlCard" },
                    this.$render("i-hstack", { id: "pnlCardHeader", verticalAlignment: "center", horizontalAlignment: "center" }),
                    this.$render("i-panel", { id: "pnlCardBody", minHeight: 48 }),
                    this.$render("i-panel", { id: "pnlCardFooter" }))));
        }
    };
    ScomBanner = __decorate([
        components_2.customModule,
        components_2.customElements('i-scom-banner')
    ], ScomBanner);
    exports.default = ScomBanner;
});
