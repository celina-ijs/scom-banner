import {
  Module,
  customModule,
  Styles,
  Panel,
  Control,
  ControlElement,
  customElements,
  Container,
  IDataSchema,
  IUISchema
} from '@ijstech/components';
import { IConfig } from './global/index';
import { containerStyle, backgroundStyle, actionButtonStyle } from './index.css';
import dataJson from './data.json';
const Theme = Styles.Theme.ThemeVars;

const propertiesSchemaString = `{
  "type":"object",
  "required":[
    "title"
  ],
  "properties":{
    "title":{
      "type":"string"
    },
    "description":{
      "type":"string"
    },
    "backgroundImageUrl":{
      "type":"string"
    },
    "backgroundImageCid": {
      "type":"string"
    },
    "linkButtons":{
      "type":"array",
      "items":{
        "type":"object",
        "properties":{
          "caption":{
            "type":"string"
          },
          "url":{
            "type":"string"
          },
          "buttonType": {
            "type": "string",
            "oneOf": [
              {
                "title": "Filled",
                "const": "filled"
              },
              {
                "title": "Outlined",
                "const": "outlined"
              },
              {
                "title": "Text",
                "const": "text"
              }
            ]
          },
          "light": {
            "title": "Light mode",
            "type": "object",
            "properties": {
              "textColor":{
                "title":"Text color",
                "type":"string",
                "format":"color"
              },
              "backgroundColor":{
                "type":"string",
                "format":"color"
              }
            }
          },
          "dark": {
            "title": "Dark mode",
            "type": "object",
            "properties": {
              "textColor":{
                "title":"Text color",
                "type":"string",
                "format":"color"
              },
              "backgroundColor":{
                "type":"string",
                "format":"color"
              }
            }
          }
        }
      }
    },
    "dark":{
      "type":"object",
      "properties":{
        "titleFontColor":{
          "type":"string",
          "format":"color",
          "readOnly":true
        },
        "descriptionFontColor":{
          "type":"string",
          "format":"color",
          "readOnly":true
        },
        "linkButtonStyle":{
          "type":"array",
          "items":{
            "type":"object",
            "properties":{
              "captionColor":{
                "type":"string",
                "format":"color"
              },
              "color":{
                "type":"string",
                "format":"color"
              },
              "buttonType":{
                "type":"string",
                "enum":[
                  "filled",
                  "outlined",
                  "text"
                ]
              }
            }
          }
        }
      }
    },
    "light":{
      "type":"object",
      "properties":{
        "titleFontColor":{
          "type":"string",
          "format":"color",
          "readOnly":true
        },
        "descriptionFontColor":{
          "type":"string",
          "format":"color",
          "readOnly":true
        },
        "linkButtonStyle":{
          "type":"array",
          "items":{
            "type":"object",
            "properties":{
              "captionColor":{
                "type":"string",
                "format":"color"
              },
              "color":{
                "type":"string",
                "format":"color"
              },
              "buttonType":{
                "type":"string",
                "enum":[
                  "filled",
                  "outlined",
                  "text"
                ]
              }
            }
          }
        }
      }
    },
    "textAlign":{
      "type":"string",
      "oneOf":[
        {"title": "Left", "const":  "left"},
        {"title": "Center", "const":  "center"},
        {"title": "Right", "const":  "right"}
      ]
    },
    "height":{
      "type":"number"
    }
  }
}
`;
const propertiesUISchemaString = `{
  "type": "VerticalLayout",
  "elements": [
    {
      "type": "HorizontalLayout",
      "elements": [
        {
          "type": "Categorization",
          "elements": [
            {
              "type": "Category",
              "label": "General settings",
              "elements": [
                {
                  "type": "VerticalLayout",
                  "elements": [
                    {
                      "type": "HorizontalLayout",
                      "elements": [
                        {
                          "type": "Control",
                          "scope": "#/properties/title"
                        }
                      ]
                    },
                    {
                      "type": "HorizontalLayout",
                      "elements": [
                        {
                          "type": "Control",
                          "scope": "#/properties/description"
                        }
                      ]
                    },
                    {
                      "type": "HorizontalLayout",
                      "elements": [
                        {
                          "type": "Control",
                          "scope": "#/properties/backgroundImageUrl"
                        }
                      ]
                    },
                    {
                      "type": "HorizontalLayout",
                      "elements": [
                        {
                          "type": "Control",
                          "scope": "#/properties/backgroundImageCid"
                        }
                      ]
                    },
                    {
                      "type": "HorizontalLayout",
                      "elements": [
                        {
                          "type": "Control",
                          "scope": "#/properties/linkButtons",
                          "options": {
                            "elementLabelProp": "caption",
                            "detail": {
                              "type": "VerticalLayout",
                              "elements": [
                                {
                                  "type": "HorizontalLayout",
                                  "elements": [
                                    {
                                      "type": "Control",
                                      "scope": "#/properties/caption"
                                    },
                                    {
                                      "type": "Control",
                                      "scope": "#/properties/url"
                                    },
                                    {
                                      "type": "Control",
                                      "scope": "#/properties/buttonType"
                                    }
                                  ]
                                },
                                {
                                  "type": "HorizontalLayout",
                                  "elements": [
                                    {
                                      "type": "Group",
                                      "label": "Dark",
                                      "elements": [
                                        {
                                          "type": "VerticalLayout",
                                          "elements": [
                                            {
                                              "type": "HorizontalLayout",
                                              "elements": [
                                                {
                                                  "type": "Control",
                                                  "scope": "#/properties/dark/properties/textColor"
                                                },
                                                {
                                                  "type": "Control",
                                                  "scope": "#/properties/dark/properties/backgroundColor"
                                                }
                                              ]
                                            }
                                          ]
                                        }
                                      ]
                                    }
                                  ]
                                },
                                {
                                  "type": "HorizontalLayout",
                                  "elements": [
                                    {
                                      "type": "Group",
                                      "label": "Light",
                                      "elements": [
                                        {
                                          "type": "VerticalLayout",
                                          "elements": [
                                            {
                                              "type": "HorizontalLayout",
                                              "elements": [
                                                {
                                                  "type": "Control",
                                                  "scope": "#/properties/light/properties/textColor"
                                                },
                                                {
                                                  "type": "Control",
                                                  "scope": "#/properties/light/properties/backgroundColor"
                                                }
                                              ]
                                            }
                                          ]
                                        }
                                      ]
                                    }
                                  ]
                                }
                              ]
                            }
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "type": "Category",
              "label": "Theme settings",
              "elements": [
                {
                  "type": "VerticalLayout",
                  "elements": [
                    {
                      "type": "HorizontalLayout",
                      "elements": [
                        {
                          "type": "Control",
                          "scope": "#/properties/textAlign"
                        }
                      ]
                    },
                    {
                      "type": "HorizontalLayout",
                      "elements": [
                        {
                          "type": "Control",
                          "scope": "#/properties/height"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}


`;
const propertiesSchema: IDataSchema = JSON.parse(propertiesSchemaString);
const propertiesUISchema: IUISchema = JSON.parse(propertiesUISchemaString);

interface ScomBannerElement extends ControlElement {
  lazyLoad?: boolean;
  data: IConfig;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ["i-scom-banner"]: ScomBannerElement;
    }
  }
}

const defaultColors = {
  titleFontColor: '#565656',
  descriptionFontColor: '#565656'
}

@customModule
@customElements('i-scom-banner')
export default class ScomBanner extends Module {
  private pnlCardBody: Panel;

  private _data: IConfig = { title: '' };
  tag: any = {};
  defaultEdit: boolean = true;
  readonly onConfirm: () => Promise<void>;
  readonly onDiscard: () => Promise<void>;
  readonly onEdit: () => Promise<void>;

  static async create(options?: ScomBannerElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  constructor(parent?: Container, options?: ScomBannerElement) {
    super(parent, options);
  }

  private getData() {
    return this._data
  }

  private async setData(data: IConfig) {
    this._data = data
    this.onUpdateBlock(this.tag)
  }

  private getTag() {
    return this.tag
  }

  private updateTag(type: 'light'|'dark', value: any) {
    this.tag[type] = this.tag[type] ?? {};
    for (let prop in value) {
      if (value.hasOwnProperty(prop))
        this.tag[type][prop] = value[prop];
    }
  }

  private async setTag(value: any) {
    const newValue = value || {};
    if (newValue.light) this.updateTag('light', newValue.light);
    if (newValue.dark) this.updateTag('dark', newValue.dark);
    if (newValue.hasOwnProperty('height')) this.tag.height = newValue.height;
    if (newValue.hasOwnProperty('textAlign')) this.tag.textAlign = newValue.textAlign;
    this.onUpdateBlock(value);
  }

  private setTheme(value: string) {
    this.onUpdateBlock(this.tag);
  }

  private getThemeSchema(readOnly = false) {
    const themeSchema: IDataSchema = {
      type: 'object',
      properties: {
        dark: {
          type: 'object',
          properties: {
            titleFontColor: {
              type: 'string',
              format: 'color',
              readOnly
            },
            descriptionFontColor: {
              type: 'string',
              format: 'color',
              readOnly
            },
            linkButtonStyle: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  captionColor: {
                    type: 'string',
                    format: 'color'
                  },
                  color: {
                    type: 'string',
                    format: 'color'
                  },
                  buttonType: {
                    type: 'string',
                    enum: [
                      'filled',
                      'outlined',
                      'text'
                    ]
                  }
                }
              }
            }
          }
        },
        light: {
          type: 'object',
          properties: {
            titleFontColor: {
              type: 'string',
              format: 'color',
              readOnly
            },
            descriptionFontColor: {
              type: 'string',
              format: 'color',
              readOnly
            },
            linkButtonStyle: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  captionColor: {
                    type: 'string',
                    format: 'color'
                  },
                  color: {
                    type: 'string',
                    format: 'color'
                  },
                  buttonType: {
                    type: 'string',
                    enum: [
                      'filled',
                      'outlined',
                      'text'
                    ]
                  }
                }
              }
            }
          }
        },
        textAlign: {
          type: 'string',
          enum: [
            'left',
            'center',
            'right'
          ],
          readOnly
        },
        height: {
          type: 'number'
        }
      }
    }

    return themeSchema;
  }

  private _getActions(propertiesSchema: IDataSchema, themeSchema: IDataSchema) {
    const actions = [
      {
        name: 'Settings',
        icon: 'cog',
        command: (builder: any, userInputData: any) => {
          let oldData = {};
          return {
            execute: async () => {
              oldData = JSON.parse(JSON.stringify(this._data))
              if (userInputData?.title !== undefined) this._data.title = userInputData.title;
              if (userInputData?.description !== undefined) this._data.description = userInputData.description;
              if (userInputData?.backgroundImageUrl !== undefined) this._data.backgroundImageUrl = userInputData.backgroundImageUrl;
              if (userInputData?.backgroundImageCid !== undefined) this._data.backgroundImageCid = userInputData.backgroundImageCid;
              if (userInputData?.linkButtons !== undefined) this._data.linkButtons = userInputData.linkButtons;
              this.onUpdateBlock(this.tag);
              if (builder?.setData) builder.setData(this._data);
            },
            undo: async () => {
              this._data = JSON.parse(JSON.stringify(oldData))
              this.onUpdateBlock(this.tag);
              if (builder?.setData) builder.setData(this._data);
            },
            redo: () => { }
          }
        },
        userInputDataSchema: propertiesSchema,
        userInputUISchema: propertiesUISchema
      }
      // {
      //   name: 'Theme Settings',
      //   icon: 'palette',
      //   command: (builder: any, userInputData: any) => {
      //     let oldTag = {};
      //     return {
      //       execute: async () => {
      //         if (!userInputData) return;
      //         oldTag = JSON.parse(JSON.stringify(this.tag));
      //         if (builder) builder.setTag(userInputData);
      //         else this.setTag(userInputData);
      //       },
      //       undo: () => {
      //         if (!userInputData) return;
      //         if (builder) builder.setTag(oldTag);
      //         else this.setTag(oldTag);
      //       },
      //       redo: () => { }
      //     }
      //   },
      //   userInputDataSchema: themeSchema
      // }
    ]
    return actions
  }

  getConfigurators() {
    const self = this;
    return [
      {
        name: 'Builder Configurator',
        target: 'Builders',
        getActions: () => {
          const themeSchema = this.getThemeSchema();
          return this._getActions(propertiesSchema, themeSchema);
        },
        getData: this.getData.bind(this),
        setData: async (data: IConfig) => {
          // const defaultData = dataJson.defaultBuilderData as any;
          // await this.setData({...defaultData, ...data})
          await this.setData(data)
        },
        getTag: this.getTag.bind(this),
        setTag: this.setTag.bind(this)
      },
      {
        name: 'Emdedder Configurator',
        target: 'Embedders',
        getActions: () => {
          const themeSchema = this.getThemeSchema(true);
          return this._getActions(propertiesSchema, themeSchema);
        },
        getLinkParams: () => {
          const data = this._data || {};
          return {
            data: window.btoa(JSON.stringify(data))
          }
        },
        setLinkParams: async (params: any) => {
          if (params.data) {
            const utf8String = decodeURIComponent(params.data);
            const decodedString = window.atob(utf8String);
            const newData = JSON.parse(decodedString);
            let resultingData = {
              ...self._data,
              ...newData
            };
            await this.setData(resultingData);
          }
        },
        getData: this.getData.bind(this),
        setData: this.setData.bind(this),
        getTag: this.getTag.bind(this),
        setTag: this.setTag.bind(this)
      }
    ]
  }

  private onUpdateBlock(config: any) {
    const themeVar = document.body.style.getPropertyValue('--theme') || 'dark';
    const {
      titleFontColor = defaultColors.titleFontColor,
      descriptionFontColor = defaultColors.descriptionFontColor,
      linkButtonStyle = []
    } = config[themeVar] || {};
    const {
      textAlign = 'left',
      height = 'auto'
    } = config || {};
    this.pnlCardBody.clearInnerHTML();
    const mainStack: Control = (
      <i-vstack gap="1.5rem" class={containerStyle}>
        <i-label
          caption={this._data?.title || 'Your banner title'}
          font={{ size: '3rem', bold: true, color: titleFontColor }}
          lineHeight={1.5}
        />
        <i-label
          visible={!!this._data.description}
          caption={this._data.description || ''}
          font={{ size: '1.375rem', color: descriptionFontColor }}
          lineHeight={1.2}
        />
      </i-vstack>
    )
    const buttons = this._data.linkButtons?.filter(link => link.caption || link.url);
    if (buttons && buttons.length) {
      const horizontalAlignment = textAlign == 'right' ? 'end' : textAlign == 'left' ? 'start' : textAlign;
      let buttonPanel = (
        <i-hstack verticalAlignment='center' horizontalAlignment={horizontalAlignment} gap="0.5rem"></i-hstack>
      )
      buttons.forEach((link, i) => {
        const buttonOptions: any = {};
        const {
          captionColor = Theme.colors.primary.contrastText,
          color = Theme.colors.primary.main,
          buttonType = 'filled'
        } = linkButtonStyle[i] || {}; 
        if (buttonType === 'outlined') {
          buttonOptions.border = { width: 1, style: 'solid', color: color };
        }
        buttonPanel.append(
          <i-button
            caption={link.caption || ""}
            padding={{ left: '1rem', right: '1rem', top: '0.5rem', bottom: '0.5rem' }}
            onClick={() => link.url ? window.location.href = link.url : {}}
            font={{ color: captionColor }}
            background={{ color: buttonType === 'filled' ? color : 'transparent' }}
            class={actionButtonStyle}
            {...buttonOptions}
          />
        )
      })
      mainStack.append(buttonPanel)
    }
    mainStack.style.textAlign = textAlign || 'left';
    const options: any = {};
    if (height) {
      options.height = height;
    }
    let url = this._data.backgroundImageUrl || '';
    if (this._data.backgroundImageCid) {
      url = "https://ipfs.scom.dev/ipfs/" + this._data.backgroundImageCid;
    }
    const item = (
      <i-hstack
        background={{ image: url, color: 'transparent' }}
        verticalAlignment="center"
        minHeight={150}
        class={backgroundStyle}
        {...options}
      >
        {mainStack}
      </i-hstack>
    )
    this.pnlCardBody.appendChild(item)
  }

  init() {
    super.init();
    const lazyLoad = this.getAttribute('lazyLoad', true, false);
    if (!lazyLoad) {
      const data = this.getAttribute('data', true);
      data && this.setData(data);
    }
    this.setTag({
      light: {...defaultColors},
      dark: {...defaultColors}
    })
  }

  render() {
    return (
      <i-panel id="pnlCard">
        <i-hstack
          id="pnlCardHeader"
          verticalAlignment="center"
          horizontalAlignment="center"
        />
        <i-panel id="pnlCardBody" minHeight={48} />
        <i-panel id="pnlCardFooter" />
      </i-panel>
    )
  }
}