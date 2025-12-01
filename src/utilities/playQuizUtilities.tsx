import type { DotLottiePlayer } from "../types/quis-types";

export class PlayQuizUtilities {
  protected isValidAnswer: (answer: string) => boolean;
  protected setDotLottie: (
    value: React.SetStateAction<DotLottiePlayer | null>
  ) => void;
  protected setHistory: (value: React.SetStateAction<boolean[]>) => void;
  protected questionStatus: "valid" | "invalid" | "unanswered";
  protected history: boolean[];
  protected setQuestionStatus: (
    value: React.SetStateAction<"valid" | "invalid" | "unanswered">
  ) => void;

  constructor(
    isValidAnswer: (answer: string) => boolean,
    setDotLottie: (value: React.SetStateAction<DotLottiePlayer | null>) => void,
    setHistory: (value: React.SetStateAction<boolean[]>) => void,
    questionStatus: "valid" | "invalid" | "unanswered",
    history: boolean[],
    setQuestionStatus: (
      value: React.SetStateAction<"valid" | "invalid" | "unanswered">
    ) => void
  ) {
    this.isValidAnswer = isValidAnswer;
    this.setDotLottie = setDotLottie;
    this.setHistory = setHistory;
    this.questionStatus = questionStatus;
    this.history = history;
    this.setQuestionStatus = setQuestionStatus;
  }

  decodeHtmlEntities = (str: string) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
  };

  dotLottieRefCallback = (dotLottie: DotLottiePlayer | null) => {
    this.setDotLottie(dotLottie);
  };

  failQuestion = () => {
    this.setHistory([...this.history, false]);
    this.setQuestionStatus("invalid");
  };

  generateQuestionColor = (availableAnswer: string) => {
    return this.questionStatus === "unanswered"
      ? "black"
      : this.isValidAnswer(availableAnswer)
      ? "green"
      : "red";
  };
}
