import type { DotLottiePlayer, PlayQuizDeps } from "../types/quis-types";

export function createPlayQuizUtilities(deps: PlayQuizDeps) {
  const decodeHtmlEntities = (str: string): string => {
    if (typeof window === "undefined") return str; // safety per SSR/test

    const parser = new DOMParser();
    const doc = parser.parseFromString(str, "text/html");
    return doc.documentElement.textContent ?? "";
  };

  const dotLottieRefCallback = (dotLottie: DotLottiePlayer | null): void => {
    deps.setDotLottie(dotLottie);
  };

  const failQuestion = (): void => {
    deps.setHistory([...deps.history, false]);
    deps.setQuestionStatus("invalid");
  };

  const generateQuestionColor = (availableAnswer: string): string => {
    return deps.questionStatus === "unanswered"
      ? "black"
      : deps.isValidAnswer(availableAnswer)
      ? "green"
      : "red";
  };

  return {
    decodeHtmlEntities,
    dotLottieRefCallback,
    failQuestion,
    generateQuestionColor,
  };
}
