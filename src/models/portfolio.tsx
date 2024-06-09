export class Portfolio {
  constructor(
    public name: string,
    public link: string,
    public thumbnail: string
  ) {}
}

export enum ProjectType {
  FRONTEND,
  BACKEND,
  FULLSTACK,
  PUBLISHING,
  BUSINESS
}

const switchClassification = (type: ProjectType) => {
  switch (type) {
    case ProjectType.FRONTEND:
      return "【 Front-end Development 】";
    case ProjectType.BACKEND:
      return "【 Back-end Development 】";
    case ProjectType.FULLSTACK:
      return "【 Full-stack Development 】";
    case ProjectType.PUBLISHING:
      return "【 Web Publishing 】";
    case ProjectType.BUSINESS:
      return "【 Business 】";
    default:
      return "【 Front-end Development 】";
  }
};

export class PortfolioVisitor extends Portfolio {
  classification: string;
  language: string;
  description: string;
  study: string;
  range: string;
  sublink: object;
  constructor(
    name: string,
    link: string,
    thumbnail: string,
    classification: ProjectType,
    language: string,
    description: string,
    study: string,
    range: string,
    sublink: object
  ) {
    super(name, link, thumbnail);
    this.classification = switchClassification(classification);
    this.language = language;
    this.description = description;
    this.study = study;
    this.range = range;
    this.sublink = sublink;
  }
}
