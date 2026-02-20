export interface Portfolio {
  id: string;
  name: string;
  link: string;
  thumbnail: string;
  classification: string;
  language: string;
  description: string;
  study: string;
  range: string;
  sublink: {
    [key: string]: string;
  };
  active?: boolean;
  classification_label: string;
  order: number;
}
