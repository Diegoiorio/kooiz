import { Step, type ScreenRenderProps } from "../types/quis-types";
import SetQuestionQty from "./SetQuestionQty";
import { SetQuestionCategory } from "./SetQuestionCategory";
import { SetQuestionDifficulty } from "./SetQuestionDifficulty";
import { PlayQuiz } from "./PlayQuiz";
import { Score } from "./Score";
import { Loader } from "./Loader";

export function ScreenRendererByStep(p: ScreenRenderProps) {
  // Step rendering
  const renderScreenByStep = () => {
    switch (p.step) {
      case Step.Loading:
        return <Loader />;
      case Step.SetQuestionQty:
        return (
          <SetQuestionQty
            onClickNext={p.changeQuestionAmount}
            defaultValue={15}
            max={30}
            min={5}
            step={5}
          />
        );
      case Step.SetQuestionCategory:
        return (
          <SetQuestionCategory
            categories={p.categories}
            onClickNext={p.changeQuestionCategory}
          />
        );
      case Step.SetQuestionDifficulty:
        return (
          <SetQuestionDifficulty onClickNext={p.changeQuestionDifficulty} />
        );
      case Step.Play:
        return (
          <PlayQuiz
            quiz={p.quiz}
            onFinished={(history_: boolean[]) => {
              p.setHistory(history_);
              p.setStep(Step.ScoreScreen);
            }}
          />
        );
      case Step.ScoreScreen:
        return (
          <Score
            history={p.history}
            onNext={() => {
              p.setStep(Step.SetQuestionQty);
            }}
          />
        );
    }
  };

  return renderScreenByStep();
}
