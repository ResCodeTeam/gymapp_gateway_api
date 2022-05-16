import axios from "axios";

export function apiAdapter(baseURL: string) {
  return axios.create({
    baseURL: baseURL,
  })
}