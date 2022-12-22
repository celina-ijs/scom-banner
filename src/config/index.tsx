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
  private edtBackgroundUrl: Input;
  private backgroundData: { file: File, base64: string } = {
    file: undefined,
    base64: ''
  }

  get data() {
    const _data: IConfig = {
      title: this.edtTitle.value || "",
      description: this.edtDesc.value || "",
      linkCaption: this.edtButtonCaption.value || "",
      linkUrl: this.edtButtonLink.value || "",
      backgroundImage: this.edtBackgroundUrl.value || ""//this.backgroundData.base64
    };
    return _data
  }

  set data(config: IConfig) {
    this.edtTitle.value = config.title || "";
    this.edtDesc.value = config.description || "";
    this.edtButtonCaption.value = config.linkCaption || "";
    this.edtButtonLink.value = config.linkUrl || "";
    if (config.backgroundImage)
      this.edtBackground.preview(config.backgroundImage);

    // if (!this.edtBackground.fileList.length && config.backgroundImage)
    //   this.edtBackground.fileList = [new File([], '')];
    this.edtBackgroundUrl.value = config.backgroundImage;
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

          <i-label caption="Link Button Caption"></i-label>
          <i-input id="edtButtonCaption" width="100%"></i-input>

          <i-label caption="Link Button URL:"></i-label>
          <i-input id="edtButtonLink" width="100%"></i-input>
          <i-label caption="Backgound Image:" visible={false}></i-label>
          <i-upload
              visible={false}
              id="edtBackground"
              maxHeight={200}
              maxWidth={200}
              class={uploadStyle}
              onChanged={this.onChangedImage.bind(this)}
              onRemoved={() => this.onRemovedImage()}
          ></i-upload>
          <i-label caption={"Background image url"}></i-label>
          <i-input id={"edtBackgroundUrl"} width={"100%"}></i-input>
        </i-vstack>
    )
  }
}
