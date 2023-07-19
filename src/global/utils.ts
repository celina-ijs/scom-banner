export interface IConfig {
  title: string;
  description?: string;
  backgroundImageCid?: string;
  backgroundImageUrl?: string;
  linkButtons?: ILinkButton[];
}

export interface ILinkButton {
  caption?: string;
  url?: string;
}