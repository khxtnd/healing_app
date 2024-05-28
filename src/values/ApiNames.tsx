import { TimeUtils } from "@app/utils/TimeUtils";

export const Apis = {
    collectionListInHome: (url: string) => `${url}personal/collection-list?timestamp=${TimeUtils.getCurrentTimeInMillis()}`,
    bestGenreInHome: (url: string) => `${url}personal/home-lao-app?timestamp=${TimeUtils.getCurrentTimeInMillis()}`,
    newCateListInHome: (url: string, page: number, size: number) => `${url}new/cate-list?timestamp=${TimeUtils.getCurrentTimeInMillis()}&page=${page}&size=${size}`,
    getBannerInHome: (url: string, page: number, size: number) => `${url}banner/list?timestamp=${TimeUtils.getCurrentTimeInMillis()}&page=${page}&size=${size}`,
    rankingCateListInHome: (url: string) => `${url}ranking/cate-list?timestamp=${TimeUtils.getCurrentTimeInMillis()}`,
}