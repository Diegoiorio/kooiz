import axios from "axios";
import type {
  FetchQuizCategoriesResponse,
  FetchQuizParams,
  FetchQuizResponse,
  QuizCategory,
  QuizItem,
} from "../types/quis-types";

const BASE_URL = "https://opentdb.com";

export class QuizAPI {
  // Fetch quiz category
  static async fetchCatregories(): Promise<QuizCategory[]> {
    const { data } = await axios.get<FetchQuizCategoriesResponse>(
      `${BASE_URL}/api_category.php`
    );

    return data.trivia_categories;
  }

  // Fetch quiz questions
  static async fetchQuiz(params: FetchQuizParams): Promise<QuizItem[]> {
    const { data } = await axios.get<FetchQuizResponse>(`${BASE_URL}/api.php`, {
      params: params,
    });

    return data.results;
  }
}
