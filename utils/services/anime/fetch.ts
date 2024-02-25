import { fetchWrapper } from "@/utils/fetchWrapper";
import { ICurrentAnime } from "@/types/anime";

export const getAnimeFullById = async (id: number): Promise<ICurrentAnime> => {
  const res = await fetchWrapper<ICurrentAnime>(`/anime/${id}/full`)
  return res
}
