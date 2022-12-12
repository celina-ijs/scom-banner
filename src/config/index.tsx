import {
  Module,
  customModule,
  customElements,
  ControlElement,
  Input,
  Upload
} from '@ijstech/components';
import { textareaStyle, uploadStyle } from './config.css';
import { IConfig } from '@banner/global';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['pageblock-banner-config']: ControlElement;
    }
  }
}

@customModule
@customElements("pageblock-banner-config")
export default class Config extends Module {
  private edtTitle: Input;
  private edtDesc: Input;
  private edtButtonCaption: Input;
  private edtButtonLink: Input;
  private edtBackground: Upload;
  private backgroundData: { file: File, base64: string } = {
    file: undefined,
    base64: ''
  };

  get data() {
    const _data: IConfig = {
      title: this.edtTitle.value || "",
      description: this.edtDesc.value || "",
      action: {
        caption: this.edtButtonCaption.value || "",
        link: this.edtButtonLink.value || ""
      },
      background: this.backgroundData.base64,
      file: this.backgroundData.file
    };
    return _data
  }

  set data(config: IConfig) {
    this.edtTitle.value = config.title || "";
    this.edtDesc.value = config.description || "";
    this.edtButtonCaption.value = config.action.caption || "";
    this.edtButtonLink.value = config.action.link || "";
    if (config.background) {
      this.edtBackground.preview(config.background);
    }
    this.edtBackground.fileList = config.file ? [config.file] : [];
  }

  private onRemovedImage() {
    this.backgroundData.base64 = '';
    this.backgroundData.file = undefined;
  }

  private async onChangedImage(source: Upload, files: File[]) {
    const file = files[0];
    this.backgroundData.base64 = file ? await source.toBase64(file) as string : undefined;
    this.backgroundData.file = file;
  }

  render() {
    return (
      <i-vstack id="pnlConfig" gap='0.5rem' padding={{ top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' }}>
        <i-hstack>
          <i-label caption="Title"></i-label>
          <i-label caption="*" font={{ color: 'red' }} margin={{left: '4px'}}></i-label>
          <i-label caption=":"></i-label>
        </i-hstack>
        <i-input id="edtTitle" width="100%"></i-input>
        <i-label caption="Description:"></i-label>
        <i-input
          id="edtDesc"
          class={textareaStyle}
          width="100%"
          height="auto"
          resize="auto-grow"
          inputType='textarea'
        ></i-input>
        <i-label caption="Action button"></i-label>
        <i-vstack
          border={{ width: 1, style: 'solid', color: 'rgba(217,225,232,.38)', radius: 5 }}
          gap='0.5rem'
          padding={{ top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' }}
        >
          <i-label caption="Caption:"></i-label>
          <i-input id="edtButtonCaption" width="100%"></i-input>
          <i-label caption="Link:"></i-label>
          <i-input id="edtButtonLink" width="100%"></i-input>
          <i-label caption="Backgound:"></i-label>
          <i-upload
            id="edtBackground"
            maxHeight={200}
            maxWidth={200}
            class={uploadStyle}
            // fileList={item?.file ? [item.file] : [] }
            onChanged={this.onChangedImage.bind(this)}
            onRemoved={() => this.onRemovedImage()}
          ></i-upload>
        </i-vstack>
      </i-vstack>
    )
  }
}