import {
  Module,
  customModule,
  Styles,
  Panel,
  Control,
  ControlElement,
  customElements,
  Container,
  IDataSchema
} from '@ijstech/components';
import { PageBlock, IConfig } from './global/index';
import { containerStyle, backgroundStyle, actionButtonStyle } from './index.css';
const Theme = Styles.Theme.ThemeVars;

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
}

const propertiesSchema: IDataSchema = {
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
    backgroundImage: {
      type: 'string'
    },
    linkButtons: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          caption: {
            type: 'string'
          },
          url: {
            type: 'string'
          }
        }
      }
    }
  }
};

interface ScomBannerElement extends ControlElement {
  data: IConfig
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ["i-scom-banner"]: ScomBannerElement;
    }
  }
}

@customModule
@customElements('i-scom-banner')
export default class ScomBanner extends Module implements PageBlock {
  private pnlCard: Panel;
  private pnlCardBody: Panel;

  private _oldData: IConfig = { title: '' };
  private _data: IConfig = { title: '' };
  private oldTag: any = {};
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

  getData() {
    return this._data
  }

  async setData(data: IConfig) {
    this._oldData = { ...this._data };
    this._data = data
    this.onUpdateBlock(this.tag)
  }

  getTag() {
    return this.tag
  }

  async setTag(value: any) {
    this.tag = value;
    this.onUpdateBlock(value);
  }

  getConfigSchema() {
    return configSchema;
  }

  onConfigSave(config: any) {
    this.tag = config;
    this.onUpdateBlock(config);
  }

  async edit() {
    // this.pnlCard.visible = false
  }

  async confirm() {
    this.onUpdateBlock(this.tag)
    // this.pnlCard.visible = true
  }

  async discard() {
    // this.pnlCard.visible = true
  }

  async config() { }

  getEmbedderActions() {
    const themeSchema: IDataSchema = {
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
        textAlign: {
          type: 'string',
          enum: [
            'left',
            'center',
            'right'
          ],
          readOnly: true
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
    }

    return this._getActions(propertiesSchema, themeSchema);
  }

  getActions() {
    const themeSchema: IDataSchema = {
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
        textAlign: {
          type: 'string',
          enum: [
            'left',
            'center',
            'right'
          ]
        },
        height: {
          type: 'string'
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
    }

    return this._getActions(propertiesSchema, themeSchema);
  }

  _getActions(propertiesSchema: IDataSchema, themeSchema: IDataSchema) {
    const actions = [
      {
        name: 'Settings',
        icon: 'cog',
        command: (builder: any, userInputData: any) => {
          return {
            execute: async () => {
              if (builder?.setData) builder.setData(userInputData);
              this.setData(userInputData);
            },
            undo: () => {
              if (builder?.setData) builder.setData(this._oldData);
              this.setData(this._oldData);
            },
            redo: () => { }
          }
        },
        userInputDataSchema: propertiesSchema,
      },
      {
        name: 'Theme Settings',
        icon: 'palette',
        command: (builder: any, userInputData: any) => {
          return {
            execute: async () => {
              if (!userInputData) return;
              this.oldTag = { ...this.tag };
              this.setTag(userInputData);
              if (builder) builder.setTag(userInputData);
            },
            undo: () => {
              if (!userInputData) return;
              this.setTag(this.oldTag);
              if (builder) builder.setTag(this.oldTag);
            },
            redo: () => { }
          }
        },
        userInputDataSchema: themeSchema
      }
    ]
    return actions
  }

  onUpdateBlock(config: any) {
    const {
      titleFontColor = Theme.text.primary,
      descriptionFontColor = Theme.text.primary,
      linkButtonStyle = [],
      textAlign = 'left',
      height
    } = config || {};
    this.pnlCardBody.clearInnerHTML();
    const mainStack: Control = (
      <i-vstack gap="1.5rem" class={containerStyle}>
        <i-label
          caption={this._data.title}
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
    const item = (
      <i-hstack
        background={{ image: this._data.backgroundImage || '', color: 'transparent' }}
        verticalAlignment="center"
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
    const data = this.getAttribute('data', true);
    if (data) {
      this.setData(data);
    }
  }

  render() {
    return (
      <i-panel id="pnlBlock">
        <i-panel id="pnlCard">
          <i-hstack
            id="pnlCardHeader"
            verticalAlignment="center"
            horizontalAlignment="center"
          />
          <i-panel id="pnlCardBody" minHeight={48} />
          <i-panel id="pnlCardFooter" />
        </i-panel>
      </i-panel>
    )
  }
}