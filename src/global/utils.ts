export interface IConfig {
  title: string;
  description?: string;
  backgroundImage?: string;
  linkButtons?: ILinkButton[];
}

export interface ILinkButton {
  caption?: string;
  url?: string;
}