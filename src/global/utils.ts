export interface IConfig {
  title: string;
  description?: string;
  backgroundImage?: string;
  linkButtons?: ILinkButton[];
  showHeader?: boolean;
  showFooter?: boolean;
}

export interface ILinkButton {
  caption?: string;
  url?: string;
}