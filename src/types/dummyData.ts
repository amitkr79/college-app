export interface BannerItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  type: 'event' | 'notice';
}