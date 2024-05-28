
import { Apis } from "@app/values/ApiNames";
import axios from "axios";

const timeout = 10000;

const getHeader = async () => {
  const basicHeader = {
    'Accept-language': "en",
    userId: "123",
    msisdn: "123",
    token: "123",
    'Client-Type': "Android",
    Revision: "1234"
  }
  try {
    return {
      ...basicHeader,
    }
  } catch (error) {
    return basicHeader;
  }
}

const getMainUrl = async () => {
  return "http://api.umusic.la/umusic-service/v1/"
}

export const CallApi = {
  getCollectionListInHome: () => new Promise(async (resolve, reject) => {
    try {
      const reqHeader = await getHeader();
      const mainUrl = await getMainUrl();
      const response = await axios.get(Apis.collectionListInHome(mainUrl), { headers: reqHeader, timeout })
      if (response.status === 200)
        resolve(response.data.data)
      else
        reject(response.data.desc)
    } catch (error) {
      reject("getCollectionListInHome error")
    }
  }),

  getBannerInHome: (page: number, size: number) => new Promise(async (resolve, reject) => {
    try {
      const reqHeader = await getHeader();
      const mainUrl = await getMainUrl();
      const response = await axios.get(Apis.getBannerInHome(mainUrl, page, size), { headers: reqHeader, timeout })
      if (response.status === 200)
        resolve(response.data.data)
      else
        reject(response.data.desc)
    } catch (error) {

      reject("getListBanner error")
    }
  }),
  getRankingCateInHome: () => new Promise(async (resolve, reject) => {
    try {
      const reqHeader = await getHeader();
      const mainUrl = await getMainUrl();
      const response = await axios.get(Apis.rankingCateListInHome(mainUrl), { headers: reqHeader, timeout })
      if (response.status === 200)
        resolve(response.data.data)
      else
        reject(response.data.desc)
    } catch (error) {
      reject("get collectionChart error")
    }
  }),

  getBestGenreInHome: () => new Promise(async (resolve, reject) => {
    try {
      const reqHeader = await getHeader();
      const mainUrl = await getMainUrl();
      const response = await axios.get(Apis.bestGenreInHome(mainUrl), { headers: reqHeader, timeout })
      if (response.status === 200)
        resolve(response.data.data)
      else
        reject(response.data.desc)
    } catch (error) {
      reject("getSearchRecommend error")
    }
  }),
  getNewCateInHome: (page: number, size: number) => new Promise(async (resolve, reject) => {
    try {
      const reqHeader = await getHeader();
      const mainUrl = await getMainUrl();
      const response = await axios.get(Apis.newCateListInHome(mainUrl, page, size), { headers: reqHeader, timeout })
      if (response.status === 200)
        resolve(response.data.data)
      else
        reject(response.data.desc)
    } catch (error) {
      reject("get Invididual error")
    }
  }),
}