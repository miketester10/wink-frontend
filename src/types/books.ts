export interface VolumeInfo {
  title: string;
  authors?: string[];
  description?: string;
  imageLinks?: {
    thumbnail?: string;
    smallThumbnail?: string;
  };
  infoLink?: string;
  publishedDate?: string;
  publisher?: string;
}

export interface BookItem {
  id: string;
  volumeInfo: VolumeInfo;
}

export interface BooksResponse {
  totalItems: number;
  items?: BookItem[];
}
