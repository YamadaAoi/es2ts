import { axiosForES } from "../utils/axiosForES";

export interface DisplayData {
  indexName: string;
  data: any;
}

export function getMapping(url: string) {
  return axiosForES.get(url);
}

export function getAllIndex(host: string) {
  return axiosForES.get(`${host}/_cluster/health?level=indices&pretty`);
}
