import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import styles from "./string.module.css";
import { Button } from "../ui/button/button";
import reverseString from "./revers-algo";
import { Circle } from "../ui/circle/circle";
import getCharStatus from "../../utils/getColor/color";
import { useForm } from "../../hooks/use-from";

export const StringComponent: React.FC = () => {
  const [words, setWords] = useState<string[][] | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [isLoader, setIsLoader] = useState(false);

  const { values, setValues, handleChange } = useForm({
    inputValue: "",
  });
  function startAlgoritm(): void {
    const newSteps = reverseString(values.inputValue);
    setWords(newSteps);
    setStepIndex(0);
    if (!newSteps.length) return;

    setIsLoader(true);
    let index = 0;

    const intervalId = setInterval(() => {
      setStepIndex(index);
      if (index >= newSteps.length - 1) {
        clearInterval(intervalId);
        setIsLoader(false);
      }
      index++;
    }, 1000);
  }

  return (
    <SolutionLayout title="Строка">
      <section className={styles.section}>
        <div className={styles.form}>
          <Input
            onChange={handleChange}
            type={"text"}
            maxLength={11}
            isLimitText={true}
            value={values.inputValue}
            name="inputValue"
          />
          <Button
            extraClass={"ml-4"}
            text={"Развернуть"}
            onClick={startAlgoritm}
            isLoader={isLoader}
          />
        </div>
        <ul className={styles.ul}>
          {words
            ? words[stepIndex].map((item, index) => {
                return (
                  <li key={index}>
                    <Circle
                      letter={item}
                      state={getCharStatus({ index, words, stepIndex })}
                    />
                  </li>
                );
              })
            : null}
        </ul>
      </section>
    </SolutionLayout>
  );
};
