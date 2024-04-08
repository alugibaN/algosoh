import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import styles from "./queue-page.module.css";
import { QueueAlgo } from "./queue-class";
import { ElementStates } from "../../types/element-states";
import { useForm } from "../../hooks/use-from";

export const QueuePage: React.FC = () => {
  const [isIndex, setIsIndex] = useState(false);
  const [isRemoveIndex, setIsRemoveIndex] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [stack, setStack] = useState(new QueueAlgo<string>());
  const [isColorAdd, setIsColorAdd] = useState(true);
  const [isColorRemove, setIsColorRemove] = useState(false);
  const st = stack.container;
  const newStack = new QueueAlgo<string>();

  const { values, setValues, handleChange } = useForm({
    inputValue: "",
  });

  const pushSteck = (input: string):void => {
    newStack.container = [...stack.container];
    newStack.frontIndex = stack.frontIndex;
    newStack.backIndex = stack.backIndex;
    
    newStack.enqueue(input);
    setIsColorAdd(true)
    setStack(newStack);
    setIsIndex(true);
    setValues({inputValue:''})
    setTimeout(() => {
      setIsColorAdd(false);
    }, 500);
  };
  
  const removeStack = ():void => {
    setIsColorRemove(true)
    setValues({inputValue:''})

    setTimeout(():void => {
      setIsColorRemove(false)
    newStack.container = [...stack.container];
    newStack.frontIndex = stack.frontIndex;
    newStack.backIndex = stack.backIndex;
    newStack.dequeue("");
    setStack(newStack);
  }, 500);

  };

  const clearStack = ():void => {
    stack.clear();
    setIsRemoveIndex(false);
    setIsIndex(false);
  };

  const tt = (index:number)=>{
return isColorAdd && index === stack.backIndex - 1? ElementStates.Changing :  isColorRemove && index === stack.frontIndex?ElementStates.Changing
: ElementStates.Default
  }
  return (
    <SolutionLayout title="Очередь">
      <section className={styles.section}>
        <div className={styles.form}>
          <Input
            type={"text"}
            name="inputValue"     
            maxLength={4}
            isLimitText={true}
            value={values.inputValue}
            onChange={handleChange}
                 />
          <Button
            extraClass={"ml-2"}
            text={"Добавить"}
            isLoader={isLoader}
            disabled={values.inputValue.length > 0 ? false : true}
            onClick={() => {
              pushSteck(values.inputValue);
            }}
          />
          <Button
            extraClass={"ml-2"}
            text={"удалить"}
            isLoader={isLoader}
            onClick={removeStack}
            disabled={!isIndex}
          />
          <Button
            extraClass={"ml-40"}
            text={"очистить"}
            isLoader={isLoader}
            onClick={clearStack}
            disabled={!isIndex}
          />
        </div>
        <ul className={`${styles.ul} mt-40`}>
          {st.map((item, index) => {
            return (
              <li key={index}>
                <Circle
                  letter={String(item)}
                  head={isIndex && index === stack.frontIndex? "head" : null}
                  // state={}
                  state={ tt(index)}
                  tail={isIndex && index === stack.backIndex - 1 ? "tail" : null}
                />
              </li>
            );
          })}
        </ul>
      </section>
    </SolutionLayout>
  );
};
