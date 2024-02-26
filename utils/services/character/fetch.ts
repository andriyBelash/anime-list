import { fetchWrapper } from "@/utils/fetchWrapper";
import { ICurrentCharacter } from "@/types/characters";

export const getCurrentCharacter = async (id: number): Promise<ICurrentCharacter> => {
  const res = await fetchWrapper<ICurrentCharacter>(`/characters/${id}/full`)
  return res
}