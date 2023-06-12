import keycloak from "../../keycloak";
import { getWordsResponse } from "../../types";
import API from "../axios";

export const getWords = async (
  word: string,
  page: number,
  limit: number
): Promise<getWordsResponse> => {
  try {
    await keycloak.updateToken(30);
    const result = await API.get(
      `/word/?page=${page}&limit=${limit}&word=${word}`,
      { headers: { Authorization: `Bearer ${keycloak.token}` } }
    );
    const { docs, totalDocs, totalPages, ...other } = result.data;
    return { docs, totalDocs, totalPages };
  } catch (e) {
    return { docs: [], totalDocs: 0, totalPages: 0 };
  }
};
