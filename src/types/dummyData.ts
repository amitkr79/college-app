export interface BannerItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  type: 'event' | 'notice';
}

export interface Paper {
  id: string;
  subjectCode: string;
  subjectName: string;
  department: string;
  semester: string;
  year: string;
  examType: string;
  paperUrl: string;
  tags: string[];
}

export interface PdfModalProps {
  visible: boolean;
  paper?: Paper | null;
  onClose: () => void;
}

export interface Papers{
  id?:string;
  paperUrl:string;
  title:string,
  year:string;
}
export interface CircularPdfModalProps {
  visible: boolean;
  paper?: Papers | null;
  onClose: () => void;
}