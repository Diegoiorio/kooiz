import axios from "axios";
import type {
  FetchQuizCategoriesResponse,
  QuizCategory,
} from "../types/quis-types";

const BASE_URL = "https://opentdb.com";

export class QuizAPI {
  static async fetchCatregories(): Promise<QuizCategory[]> {
    const { data } = await axios.get<FetchQuizCategoriesResponse>(
      `${BASE_URL}/api_category.php`
    );

    return data.trivia_categories;
  }
}
