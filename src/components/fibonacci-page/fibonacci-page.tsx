import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./fibonacci-page.module.css";
import { fibonacci } from "./fibonacci-algo";
import { Circle } from "../ui/circle/circle";
import { useForm } from "../../hooks/use-from";

export const FibonacciPage: React.FC = () => {
  const [fib, setFib] = useState<number[][]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [isLoader, setIsLoader] = useState(false);

  const { values, setValues, handleChange } = useForm({
    inputValue: "",
  });

  function startAlgoritm(): void {
    const newSteps = fibonacci(Number(values.inputValue));
    setFib(newSteps);
    setStepIndex(0);
    setIsLoader(true);
  }

  useEffect(() => {
    if (isLoader) {
      let index = 0;
      const intervalId = setInterval(() => {
        setStepIndex(index);
        if (index === fib.length - 1) {
          clearInterval(intervalId);
          setIsLoader(false);
        }
        index++;
      }, 1000);
    }
  }, [isLoader, fib]);

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <section className={styles.section}>
        <div className={styles.form}>
          <Input
            onChange={handleChange}
            type={"не текст"}
            max={19}
            isLimitText={true}
            value={values.inputValue}
            name="inputValue"
          />
          <Button
            extraClass={"ml-4"}
            text={"Расчитать"}
            isLoader={isLoader}
            onClick={startAlgoritm}
          />
        </div>
        <ul className={styles.ul}>
          {fib.length > 0 && stepIndex < fib.length
            ? fib[stepIndex].map((item, index) => {
                return (
                  <li key={index}>
                    <Circle letter={String(item)} />
                  </li>
                );
              })
            : null}
        </ul>
      </section>
    </SolutionLayout>
  );
};
