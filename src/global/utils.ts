interface IConfig {
  title: {
    caption: string;
    color?: string;
  };
  description?: {
    caption?: string;
    color?: string;
  },
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
