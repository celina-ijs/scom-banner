import {
  Module,
  customModule,
  Styles,
  Panel,
  Control
} from '@ijstech/components';
import { PageBlock, IConfig } from '@banner/global';
import Config from '@banner/config';
import {containerStyle, backgroundStyle, actionButtonStyle } from './index.css';
import Alert from '@banner/alert';
export { Config };
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

@customModule
export default class Main extends Module implements PageBlock {
  private pnlCard: Panel
  private pnlCardBody: Panel
  private cardConfig: Config
  private alertElm: Alert

  private _data: IConfig = { title: '' }
  tag: any
  defaultEdit: boolean = true
  readonly onConfirm: () => Promise<void>
  readonly onDiscard: () => Promise<void>
  readonly onEdit: () => Promise<void>

  getData() {
    return this._data
  }

  async setData(data: IConfig) {
    this._data = data
    this.cardConfig.data = data
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
    this.cardConfig.data = this._data
    this.pnlCard.visible = false
    this.cardConfig.visible = true
  }

  async confirm() {
    this._data = this.cardConfig.data
    this.onUpdateBlock(this.tag)
    this.pnlCard.visible = true
    this.cardConfig.visible = false
  }

  async discard() {
    this.pnlCard.visible = true
    this.cardConfig.visible = false
  }

  async config() { }
  
  validate() {
    const data = this.cardConfig.data;
    const emptyProp = !data.title;
    if (emptyProp) {
      this.alertElm.message = {
        status: 'error',
        content: 'Required field is missing.'
      }
      this.alertElm.showModal();
      return false;
    }
    return true;
  }

  onUpdateBlock(config: any) {
    const {
      titleFontColor = Theme.text.primary,
      descriptionFontColor = Theme.text.primary,
      linkButtonCaptionColor = Theme.colors.primary.contrastText,
      linkButtonColor = Theme.colors.primary.main,
      textAlign
    } = config || {};
    this.pnlCardBody.clearInnerHTML();
    const mainStack: Control = (
      <i-vstack gap="1.5rem" class={containerStyle} padding={{left: '1rem', right: '1rem'}}>
        <i-label
          caption={this._data.title}
          font={{ size: '3rem', bold: true, color: titleFontColor  }}
          lineHeight={1.5}
        ></i-label>
        <i-label
          caption={this._data.description || ''}
          font={{ size: '1.375rem', color: descriptionFontColor }}
          lineHeight={1.2}
        ></i-label>
        {
          this._data?.linkCaption ? (
            <i-panel>
              <i-button
                caption={this._data.linkCaption}
                padding={{left: '1rem', right: '1rem', top: '0.5rem', bottom: '0.5rem'}}
                onClick={() => this._data?.linkUrl ? window.location.href = this._data.linkUrl : {}}
                font={{ color: linkButtonCaptionColor }}
                background={{color: linkButtonColor}}
                class={actionButtonStyle}
              ></i-button>
            </i-panel>
          ) : <i-label></i-label>
        }
      </i-vstack>
    )
    mainStack.style.textAlign = textAlign || 'left';
    const item = (
      <i-hstack
        background={{image: this._data.backgroundImage || '', color: 'transparent'}}
        minHeight={500}
        verticalAlignment="center"
        class={backgroundStyle}
      >
        { mainStack }
      </i-hstack>
    )
    this.pnlCardBody.appendChild(item)
  }

  render() {
    return (
      <i-panel id='pnlBlock'>
        <i-panel id='pnlCard'>
          <i-hstack
            id='pnlCardHeader'
            verticalAlignment='center'
            horizontalAlignment='center'
          ></i-hstack>
          <i-panel id='pnlCardBody'></i-panel>
          <i-panel id='pnlCardFooter'></i-panel>
        </i-panel>
        <pageblock-banner-config
          id='cardConfig'
          visible={false}
        />
        <pageblock-banner-alert
          id="alertElm"
        />
      </i-panel>
    )
  }
}