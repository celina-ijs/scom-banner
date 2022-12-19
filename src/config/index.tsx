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
  private edtDescColor: Input;
  private edtTitleColor: Input;
  private edtButtonCaption: Input;
  private edtButtonLink: Input;
  private edtButtonColor: Input;
  private edtButtonCaptionColor: Input;
  private edtBackground: Upload;
  private backgroundData: { file: File, base64: string } = {
    file: undefined,
    base64: ''
  };

  get data() {
    const _data: IConfig = {
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
    return _data
  }

  set data(config: IConfig) {
    this.edtTitle.value = config.title?.caption || "";
    this.edtTitleColor.value = config.title?.color || "";
    this.edtDesc.value = config.description?.caption || "";
    this.edtDescColor.value = config.description?.color || "";
    this.edtButtonCaption.value = config.action?.caption || "";
    this.edtButtonLink.value = config.action?.link || "";
    this.edtButtonCaptionColor.value = config.action?.captionColor || "";
    this.edtButtonColor.value = config.action?.color || "";
    if (config.background) {
      this.edtBackground.preview(config.background);
    }
    if (!this.edtBackground.fileList.length && config.background)
      this.edtBackground.fileList = [new File([], '')];
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
        <i-label caption="Title Font Color:"></i-label>
        <i-input id="edtTitleColor" inputType="color" width="100px"></i-input>
        <i-label caption="Description:"></i-label>
        <i-input
          id="edtDesc"
          class={textareaStyle}
          width="100%"
          height="auto"
          resize="auto-grow"
          inputType='textarea'
        ></i-input>
        <i-label caption="Description Font Color:"></i-label>
        <i-input id="edtDescColor" inputType="color" width="100px"></i-input>
        <i-label caption="Link Button Caption"></i-label>
        <i-input id="edtButtonCaption" width="100%"></i-input>
        <i-label caption="Link Button Color:"></i-label>
        <i-input id="edtButtonColor" inputType="color" width="100px"></i-input>
        <i-label caption="Link Button Caption Color:"></i-label>
        <i-input id="edtButtonCaptionColor" inputType="color" width="100px"></i-input>
        <i-label caption="Link Button URL:"></i-label>
        <i-input id="edtButtonLink" width="100%"></i-input>
        <i-label caption="Backgound Image:"></i-label>
        <i-upload
          id="edtBackground"
          maxHeight={200}
          maxWidth={200}
          class={uploadStyle}
          onChanged={this.onChangedImage.bind(this)}
          onRemoved={() => this.onRemovedImage()}
        ></i-upload>
      </i-vstack>
    )
  }
}