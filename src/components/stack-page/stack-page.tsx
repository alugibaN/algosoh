import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Stack } from "./stack-class";
import { ElementStates } from "../../types/element-states";
import { useForm } from "../../hooks/use-from";

export const StackPage: React.FC = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const [isLoader, setIsLoader] = useState(false);
  const [isColor, setIsColor] = useState(true);
  const [stack, setStack] = useState(new Stack());
  const newStack = new Stack();
  const st = stack.container;

  const { values, setValues, handleChange } = useForm({
    inputValue: "",
  });
  const pushSteck = (input: number):void => {
    setIsColor(true);
    newStack.container = [...stack.container];
    newStack.push(input);
    setStack(newStack);
    setTimeout(() => {
      setIsColor(false);
    }, 500);
  };

  const removeStack = ():void => {
    setIsColor(true);
    setTimeout(() => {
      newStack.container = [...stack.container];
      newStack.pop();
      setStack(newStack);
      setValues({inputValue:''})
      setIsColor(false);
      setStepIndex(st.length - 1);
    }, 500);
  };

  const clearStack = ():void => {
    newStack.container = [];
    setStack(new Stack());
    setValues({inputValue:''})
  };
  return (
    <SolutionLayout title="Стек">
      <section className={styles.section}>
        <div className={styles.form}>
          <Input
            onChange={handleChange}
            type={"text"}
            maxLength={4}
            isLimitText={true}
            name="inputValue"     
            value={values.inputValue}
          />
          <Button
            extraClass={"ml-2"}
            text={"Добавить"}
            isLoader={isLoader}
            disabled={values.inputValue.length === 0 ? true : false}
            onClick={() => {
              pushSteck(Number(values.inputValue));
            }}
          />
          <Button
            extraClass={"ml-2"}
            text={"удалить"}
            isLoader={isLoader}
            onClick={removeStack}
            disabled={st.length === 0 ? true : false}
          />
          <Button
            extraClass={"ml-40"}
            text={"очистить"}
            isLoader={isLoader}
            onClick={clearStack}
            disabled={st.length === 0 ? true : false}
          />
        </div>
        <ul className={`${styles.ul} mt-40`}>
          {stack.container.length > 0
            ? stack.container.map((item, index) => {
                return (
                  <li key={index}>
                    <Circle
                      state={
                        isColor && st.length - 1 === index
                          ? ElementStates.Changing
                          : ElementStates.Default
                      }
                      letter={String(item)}
                      head={st.length - 1 === index ? "top" : ""}
                      tail={String(index)}
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
