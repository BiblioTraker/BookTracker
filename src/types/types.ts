export interface Comment {
  _id: string;
  text: string;
  name: string;
}

export interface Book {
  _id: string;
  id: string;
  title: string;
  author: string;
  cover: string;
  status: "À lire" | "En cours" | "Lu" | "À acheter" | "À vendre";
  rating: number;
  isForSale: boolean;
  comments: Comment[];
}