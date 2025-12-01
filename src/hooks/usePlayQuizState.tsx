export function usePlayQuizState() {
  // Quiz timer in seconds for each question
  const questionSecTimer = 20;

  const [currentQuizItemIndex, setCurrentQuizItemIndex] = useState<number>(0);

  const [history, setHistory] = useState<boolean[]>([]);

  // Available answers handler
  const [availableAnswers, setAvailableAnswers] = useState<string[]>([]);

  const [answer, setAnswer] = useState<string | null>(null);

  const [questionStatus, setQuestionStatus] = useState<
    "valid" | "invalid" | "unanswered"
  >("unanswered");
}
