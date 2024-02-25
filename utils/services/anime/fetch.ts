import { fetchWrapper } from "@/utils/fetchWrapper";
import { ICurrentAnime , IAnimeCharacters, IAnimeRecommendations } from "@/types/anime";

export const getAnimeFullById = async (id: number): Promise<ICurrentAnime> => {
  const res = await fetchWrapper<ICurrentAnime>(`/anime/${id}/full`)
  return res
}
export const getAnimeCharacters = async (id: number): Promise<IAnimeCharacters> => {
  const res = await fetchWrapper<IAnimeCharacters>(`/anime/${id}/characters`)
  return res
}

export const getAnimeRecommendations = async (id: number): Promise<IAnimeRecommendations> => {
  const res = await fetchWrapper<IAnimeRecommendations>(`/anime/${id}/recommendations`)
  return res
}