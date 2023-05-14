type Email = string;
type Name = string;
type Password = string;
type ImgPath = string;
type VideoPath = string;
type Color = string;
type Genre = 'comedy' | 'crime' | 'documentary' | 'drama' | 'horror' | 'family' | 'romance' | 'scifi' | 'thriller'
type Year = number;
type Rating = number;
type Minutes = number;

export interface User {
  name: Name;
  email: Email;
  password: Password;
  avatar?: ImgPath;
}

export interface Film {
  name: Name;
  description: string;
  publishedAt: Date;
  genres: Genre;
  releaseYear: Year;
  rating: Rating;
  previewVideo: ImgPath;
  video: VideoPath;
  actors: Name[];
  director: Name;
  duration: Minutes;
  commentsCount: number;
  user: User;
  poster: ImgPath;
  backgroundColor: Color;
}

export interface Comment {
  text: string;
  rating: Rating;
  publishedAt: Date;
  commentAuthor: User;
}
