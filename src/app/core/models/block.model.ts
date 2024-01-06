type AdType = 'Image' | 'Text' | 'Video';

export interface Ad {
  type: AdType;
  value: string; // In case of type Image add url_attachment into the value
  transitionSecond: number;
  redirect?: string;
}

export function mapToAd(rawAds: GetAd[]) {
  const ads: Ad[] = rawAds.map((rawAd) => {
    return {
      type: rawAd.type,
      redirect: rawAd.redirect,
      transitionSecond: rawAd.transition_second,
      value: (rawAd.url_attachment || '') + rawAd.value,
    };
  });
  return ads;
}

export interface Block {
  transitionTime: number;
  ads: Ad[];
}

export interface GetAd {
  url_attachment?: string;
  type: AdType;
  value: string;
  transition_second: number;
  redirect: string;
}

export interface GetBlock {
  transition_time: number;
  content: GetAd[];
}
