import { Channel } from './chanel.model';

export interface YoutubeVideo {
  channel: Channel;
  videoId: string;
  channelId: string;
  likeCount: number;
  published: string;
  viewCount: number;
  wilsonScore: number;
  dislikeCount: number;
  averageRating: number;
  subtitleLanguages: string[];
  category: string;
}
