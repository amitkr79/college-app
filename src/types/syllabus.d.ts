interface ISubject {
  code: string;
  title: string;
  pdfLink: string;
  date?: string;
}

interface IFullSyllabusItem {
  title: string;
  pdfLink: string;
}

interface IVtuSyllabus {
  stream: string;
  scheme: string;
  year: string;
  branch: string;
  title?: string;
  fullsyllabus: IFullSyllabusItem[];
  subjects: ISubject[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface FetchSyllabusParams {
  stream: string;
  scheme: string;
  year: string;
  branch: string;
}