
export declare interface ItemInCollection {
    id: number;
    itemName: string,
    avatar: string,
    itemType: string,
    isLike: number
  }
  export declare interface CollectionType {
    collectionId: number;
    collectionName: string,
    items: ItemInCollection
  }
  
  export declare interface Banner {
    id: number,
    key: string,
    file: string,
    title_en: string,
    title_vi: string,
    title_la: string,
    link: string,
    position: number,
    status: number,
    created_by: number,
    created_at: string,
    updated_at: string,
    updated_by: number
  }
  export declare interface Category {
    id: number,
    cateName: string,
    items:  Song
  }
  
  export declare interface Song {
    id: number,
    songName: string,
    avatar: string,
    mediaPath: string,
    bitRate: number,
    duration: number,
    totalListens: number,
    totalDownload: number,
    totalLiked: number,
    totalShared: number,
    hasLyric: boolean,
    isLike: number,
    numberOfArtists: number,
    artists: Artist[]
  }
  export declare interface Artist {
    id: number,
    aliasName: string,
    realName: string
  }