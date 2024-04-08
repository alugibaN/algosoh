import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import styles from "./sorting-page.module.css";
import { randomArr } from "../../utils/randomArr/randomArr";
import { algo, bubbleSort } from "./algoritm/sorting-bubble";
import { sortinByChouse } from "./algoritm/sorting-by-chouse";
import RejectionColumns from "./algoritm/rejection-columns";

export const SortingPage: React.FC = () => {
  const [random, setRandom] = useState<number[]>([]);
  const [array, setArray] = useState<algo>({
    steps: [],
    indexA: [],
    indexB: [],
    sortedElements: [],
  });
  const [input, setInput] = useState<string>("");
  const [stepIndex, setStepIndex] = useState(0);
  const [isLoader, setIsLoader] = useState(false);
  const [sortingSteps, setSortingSteps] = useState<number[][]>([]);
  const [isCheckedBubble, setIsCheckedBubble] = React.useState(false);
  const [isCheckedChoice, setIsCheckedChoice] = React.useState(true);

  const getRandomArr = () => {
    const arr = randomArr(17, 3, true);
    setRandom(arr);
    setSortingSteps([]);
    setArray({ steps: [], indexA: [], indexB: [], sortedElements: [] });
    setIsLoader(false);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };
  const handleClickBubble = () => {
    setIsCheckedBubble(!isCheckedBubble);
    setIsCheckedChoice(!isCheckedChoice);
  };
  const handleClickChoice = () => {
    setIsCheckedChoice(!isCheckedChoice);
    setIsCheckedBubble(!isCheckedBubble);
  };
  function startAlgoritmUp(): void {
    if (isCheckedBubble) {
      const step = bubbleSort(random, true);
      setSortingSteps(step.steps);
      setArray(step);
    }
    if (isCheckedChoice) {
      const choice = sortinByChouse(random, true);
      setSortingSteps(choice.steps);
      setArray(choice);
    }
    setStepIndex(0);
    setIsLoader(true);
  }

  function startAlgoritmDown(): void {
    if (isCheckedBubble) {
      const step = bubbleSort(random, false);
      setSortingSteps(step.steps);
      setArray(step);
    }

    if (isCheckedChoice) {
      const choice = sortinByChouse(random, false);
      setSortingSteps(choice.steps);
      setArray(choice);
    }
    setStepIndex(0);
    setIsLoader(true);
  }
  useEffect(() => {
    if (isLoader) {
      let index = 0;
      const intervalId = setInterval(() => {
        setStepIndex(index);
        if (index === sortingSteps.length - 1) {
          clearInterval(intervalId);
          setIsLoader(false);
        }
        index++;
      }, 500);

      return () => {
        clearInterval(intervalId);
        setIsLoader(false);
      };
    }
  }, [isLoader, sortingSteps]);

  return (
    <SolutionLayout title="Сортировка массива">
      <section className={styles.section}>
        <div className={styles.wrapp}>
          <div className={styles.cheackbox}>
            <RadioInput
              label={"Выбор"}
              onClick={() => {
                handleClickChoice();
              }}
              onChange={onChange}
              checked={isCheckedChoice}
            />
            <RadioInput
              label={"Пузыриком"}
              onClick={() => {
                handleClickBubble();
              }}
              checked={isCheckedBubble}
              onChange={onChange}
            />
          </div>
          <div className={styles.sorting}>
            <Button
              text={"По возрастанию"}
              sorting={Direction.Ascending}
              onClick={startAlgoritmUp}
              isLoader={isLoader}
              disabled={random.length < 1 ? true : false}
            />
            <Button
              text={"По убыванию"}
              sorting={Direction.Descending}
              isLoader={isLoader}
              disabled={random.length < 1 ? true : false}
              onClick={startAlgoritmDown}
            />
          </div>
          <Button text={"Новый массив"} onClick={getRandomArr} />
        </div>
        <RejectionColumns
          array={array}
          stepIndex={stepIndex}
          arr={sortingSteps.length > 0 ? sortingSteps[stepIndex] : random}
        />
      </section>
    </SolutionLayout>
  );
};
