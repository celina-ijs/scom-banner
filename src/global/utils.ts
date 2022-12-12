interface IConfig {
  title?: string;
  description?: string;
  action?: {
    caption?: string;
    link?: string;
  },
  background?: string;
  file?: File;
}

export {
  IConfig
}