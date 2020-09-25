export interface ISubcribedChannels {
  snippet: {
    description: string;
    publishedAt: string;
    resourceId: {
      channelId: string;
    }
    title: string;
    thumbnails: {
      default: {
        url: string;
      }
    }
  }
  contentDetails: {
    totalItemCount: number;
  }
}

export interface IChannelCard {
  channelId: string;
  thumbnailUrl: string;
  title: string;
  publishedAt: string;
  description: string;
  totalItemCount: number;
}