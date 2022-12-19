import {
  Module,
  customModule,
  Styles,
  Panel
} from '@ijstech/components';
import { PageBlock, IConfig } from '@banner/global';
import Config from '@banner/config';
import {containerStyle, backgroundStyle, actionButtonStyle } from './index.css';
import Alert from '@banner/alert';
export { Config };
const Theme = Styles.Theme.ThemeVars;

@customModule
export default class Main extends Module implements PageBlock {
  private pnlCard: Panel
  private pnlCardBody: Panel
  private cardConfig: Config
  private alertElm: Alert

  private _data: IConfig = {
    title: {
      caption: '',
      color: ''
    }
  }
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
    this.onUpdateBlock()
  }

  getTag() {
    return this.tag
  }

  async setTag(value: any) {
    this.tag = value
  }

  async edit() {
    this.cardConfig.data = this._data
    this.pnlCard.visible = false
    this.cardConfig.visible = true
  }

  async confirm() {
    this._data = this.cardConfig.data
    this.onUpdateBlock()
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
    const emptyProp = !data.title.caption;
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

  onUpdateBlock() {
    this.renderUI()
  }

  renderUI() {
    this.pnlCardBody.clearInnerHTML()
    const titleColor = this._data.title.color || Theme.text.primary;
    const descColor = this._data.description?.color || Theme.text.primary;
    const item = (
      <i-hstack
        background={{image: this._data.background || '', color: 'transparent'}}
        minHeight={500}
        verticalAlignment="center"
        class={backgroundStyle}
      >
        <i-vstack gap="1.5rem" class={containerStyle} padding={{left: '1rem', right: '1rem'}}>
          <i-label
            caption={this._data.title.caption}
            font={{ size: '3rem', bold: true, color: titleColor  }}
            lineHeight={1.5}
          ></i-label>
          <i-label
            caption={this._data.description?.caption || ''}
            font={{ size: '1.375rem', color: descColor }}
            lineHeight={1.2}
          ></i-label>
          {
            this._data?.action?.caption ? (
              <i-panel>
                <i-button
                  caption={this._data.action.caption}
                  padding={{left: '1rem', right: '1rem', top: '0.5rem', bottom: '0.5rem'}}
                  onClick={() => this._data.action.link ? window.location.href = this._data.action.link : {}}
                  font={{ color: this._data.action?.captionColor || Theme.colors.primary.contrastText }}
                  background={{color: this._data.action?.color || Theme.colors.primary.main}}
                  class={actionButtonStyle}
                ></i-button>
              </i-panel>
            ) : <i-label></i-label>
          }
        </i-vstack>
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