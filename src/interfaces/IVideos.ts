export interface IVideo {
  id: string;
  snippet: {
    channelId: string;
    channelTitle: string;
    publishedAt: string;
    title: string;
  };
  statistics: {
    viewCount: string;
  }
}

export interface IClickedVideo {
  channelTitle: string;
  id: string;
  publishedAt: string;
  thumbnailUrl: string;
  title: string;
}

export interface IChannelDetails {
  snippet: {
    thumbnails: {
      default: {
        url: string;
      }
    }
  }
  statistics: {
    subscriberCount: string;
  }
}

export interface ITrendingVideos {
  id: string;
  contentDetails: {
    duration: string;
  };
  snippet: {
    title: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails: {
      medium: {
        url: string;
      }
    }
  };
  statistics: {
    viewCount: string;
  };
}

export interface IExploredVideos {
  id: string;
  contentDetails: {
    duration: string;
  };
  snippet: {
    title: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails: {
      medium: {
        url: string;
      }
    }
  };
  statistics: {
    viewCount: string;
  };
}

export interface IRelatedVideos {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails: {
      medium: {
        url: string;
      }
    }
  };
}

export interface ISearchedVideos {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails: {
      medium: {
        url: string;
      }
    }
  };
}

export interface IBreakingNews {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails: {
      medium: {
        url: string;
      }
    }
  };
}

export interface ISuggestedVideos {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails: {
      medium: {
        url: string;
      }
    }
  };
}