import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { LinkedList } from "./list-class";
import { useForm } from "../../hooks/use-from";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { getRandomArray } from "../../utils/randomArr/randomArr";
import { ArrowIcon } from "../ui/icons/arrow-icon";

const initialArray: string[] = getRandomArray(4, 9999);

export const ListPage: React.FC = () => {
  const { values, setValues, handleChange } = useForm({
    inputValue: "",
    inputIndex: "",
  });
  const [list, setList] = useState(new LinkedList<string>(initialArray));
  const [addList, setAddList] = useState<string[]>([]);
  const [deleteElement, setDeleteElement] = useState<string[]>([]);
  let [indexAdd, setIndexAdd] = useState<number>(0);
  const [serchElement, setSerchElement] = useState("");

  const [isAddHead, setIsAddHead] = useState(false);
  const [isAddTail, setIsAddTail] = useState(false);
  const [isDeleteHead, setIsDeleteHead] = useState(false);
  const [isDeleteTail, setIsDeleteTail] = useState(false);
  const [isAddByIndex, setIsAddByIndex] = useState(false);
  const [isDeleteByIndex, setIsDeleteByIndex] = useState(false);
  const [isArrAdd, setIsArrAdd] = useState(false);
  const [listArr, setListArr] = useState(list.toArray());
  const [isFlag, setIsFlag] = useState(false);

  const addHead = ():void => {
    if (list.getSize() < 6 && values.inputValue) {
      setAddList([values.inputValue]);
      setSerchElement(values.inputValue);
      setIsAddHead(true);
      setIndexAdd(0);

      setTimeout(() => {
        list.prepend(values.inputValue);
        setListArr([...list.toArray()]); // Обновляем listArr напрямую из list.toArray()
        setIsAddHead(false);
        setIsArrAdd(true);
        setValues({ ...values, inputValue: "" });
      }, 500);
    }
  };

  const addTail = ():void => {
    if (list.getSize() < 6 && values.inputValue) {
      setSerchElement(values.inputValue);
      setAddList([values.inputValue]);
      setIndexAdd(listArr.length - 1);
      setIsAddTail(true);
      setTimeout(() => {
        list.append(values.inputValue);
        setListArr([...list.toArray()]); // Обновляем listArr напрямую из list.toArray()
        setIsArrAdd(true);
        setIsAddTail(false);
        setValues({ ...values, inputValue: "" });
      }, 500);
    }
  };

  const deleteHead = ():void => {
    if (listArr.length >= 0) {
      setDeleteElement([listArr[0]]);
      let newlistArr = list.toArray();
      newlistArr[0] = "";
      setListArr([...newlistArr]); // Обновляем listArr напрямую из list.toArray()
      setIsDeleteHead(true);
      setIndexAdd(0);
      setTimeout(() => {
        list.deleteHead();
        setListArr([...list.toArray()]); // Обновляем listArr напрямую из list.toArray()
        setIsDeleteHead(false);
        setValues({ ...values, inputValue: "" });
      }, 1000);
    }
  };

  const deleteTail = ():void => {
    setDeleteElement([listArr[listArr.length - 1]]);
    let newlistArr = list.toArray();
    newlistArr[listArr.length - 1] = "";
    setListArr([...newlistArr]); // Обновляем listArr напрямую из list.toArray()
    setIsDeleteTail(true);
    setIndexAdd(listArr.length - 1);
    setTimeout(() => {
      list.deleteTail();
      setListArr([...list.toArray()]); // Обновляем listArr напрямую из list.toArray()
      setIsDeleteTail(false);
      setValues({ ...values, inputValue: "" });
    }, 1000);
  };

  const addToIndex = ():void => {
    if (
      Number(values.inputIndex) >= 0 &&
      Number(values.inputValue) < 6 &&
      list.getSize() < 6
    ) {
      let currentIndex = 0;
      setIndexAdd(0);
      setIsAddByIndex(true);
      setAddList([values.inputValue]);
      setSerchElement(values.inputValue);
      const interval = setInterval(() => {
        if (currentIndex >= Number(values.inputIndex)) {
          list.addByIndex(Number(values.inputIndex), values.inputValue);
          clearInterval(interval);
          setIsAddByIndex(false);
          setListArr([...list.toArray()]); // Обновляем listArr напрямую из list.toArray()
        }
        setIndexAdd(currentIndex);
        currentIndex++;
      }, 500);
      setValues({ inputIndex: "", inputValue: "" });
    }
  };

  const deleteToIndex = ():void => {
    if (
      Number(values.inputIndex) < 6 &&
      Number(values.inputIndex) >= 0 &&
      list.getSize() > 0 &&
      list.getSize() - 1 >= Number(values.inputIndex)
    ) {
      let currentIndex = 0;
      setIsFlag(true);
      setIndexAdd(0);
      const interval = setInterval(() => {
        if (currentIndex === Number(values.inputIndex)) {
          clearInterval(interval);
          setIsDeleteByIndex(true);
          let newlistArr = list.toArray();
          newlistArr[Number(values.inputIndex)] = "";
          setListArr([...newlistArr]); // Обновляем listArr напрямую из list.toArray()
          setDeleteElement([listArr[Number(values.inputIndex)]]);
          list.deleteByIndex(Number(values.inputIndex));
          setTimeout(() => {
            setIsDeleteByIndex(false);
            setListArr([...list.toArray()]); // Обновляем listArr напрямую из list.toArray()
            setIsFlag(false);
            setIndexAdd(0);
          }, 1000);
        }
        setIndexAdd(currentIndex);
        currentIndex++;
      }, 500);
      setValues({ ...values, inputIndex: "" });
    }
  };

  const colorModified = (item: string, index: number) => {
    if (
      (serchElement === item && index === indexAdd) ||
      (serchElement === item && index === indexAdd + 1)
    ) {
      setTimeout(() => {
        setSerchElement("");

        setIsArrAdd(false);
        setAddList([]);
      }, 500);
      return ElementStates.Modified;
    }
    if ((index <= indexAdd && isAddByIndex) || (index <= indexAdd && isFlag)) {
      return ElementStates.Changing;
    }

    return ElementStates.Default;
  };

  const isHead = (index: number):string => {
    if (listArr.length === 1 && isAddTail) {
        return '';
    } else if (index === 0 && !isAddHead && !isAddByIndex) {
        return 'head';
    } else if (index === 0 && isAddByIndex && indexAdd !== 0) {
        return 'head';
    } else {
        return '';
    }
};

const isTail = (index: number):string => {
    if (listArr.length === 1 && isDeleteHead) {
        return '';
    } else if (index === listArr.length - 1 && !isDeleteTail && !isDeleteByIndex) {
        return 'tail';
    } else {
        return '';
    }
};

  return (
    <SolutionLayout title="Связанный список">
      <section className={styles.section}>
        <div className={`${styles.form} mb-10`}>
          <div>
            <Input
              placeholder="Введите значение"
              name="inputValue"
              type="text"
              maxLength={4}
              isLimitText={true}
              value={values.inputValue}
              onChange={handleChange}
            />
          </div>
          <Button
            text="Добавить в Head"
            linkedList="big"
            onClick={addHead}
            isLoader={isAddHead}
            disabled={
              values.inputValue.length <= 0 ||
              (listArr.length >= 6 && listArr.length <= 0)
            }
          />
          <Button
            text="добавить в Tail"
            linkedList="big"
            onClick={addTail}
            isLoader={isAddTail}
            disabled={
              values.inputValue.length <= 0 ||
              (listArr.length >= 6 && listArr.length <= 0)
            }
          />
          <Button
            text="удались с Head"
            linkedList="big"
            onClick={deleteHead}
            isLoader={isDeleteHead}
            disabled={listArr.length <= 0}
          />
          <Button
            text="удалить с Tail"
            linkedList="big"
            onClick={deleteTail}
            isLoader={isDeleteTail}
            disabled={listArr.length <= 0}
          />
        </div>
        <div className={styles.form}>
          <div>
            <Input
              placeholder="Введите  индекс"
              name="inputIndex"
              type="text"
              value={values.inputIndex}
              onChange={handleChange}
            />
          </div>
          <Button
            text="Добавить по индексу"
            linkedList="big"
            onClick={addToIndex}
            isLoader={isAddByIndex}
            disabled={
              (!values.inputValue && !values.inputIndex) ||
              list.getSize() >= 6 ||
              list.getSize() < Number(values.inputIndex) ||
              Number(values.inputIndex) >= 6 ||
              Number(values.inputIndex) < 0
            }
          />
          <Button
            text="Удалить по индексу"
            linkedList="big"
            onClick={deleteToIndex}
            isLoader={isDeleteByIndex}
            disabled={
              !values.inputIndex ||
              list.getSize() === 0 ||
              list.getSize() - 1 < Number(values.inputIndex) ||
              Number(values.inputIndex) >= 6 ||
              Number(values.inputIndex) < 0
            }
          />
        </div>
        <ul className={`${styles.ul} mt-20`}>
          {listArr.map((item, index) => {
            return (
              <li className={styles.li} key={index}>
                <div className={styles.container}>
                  {index === indexAdd &&
                  (isAddTail || isAddByIndex || isAddHead)
                    ? addList.map((item) => {
                        return (
                          <Circle
                            key={index}
                            letter={String(item)}
                            state={ElementStates.Changing}
                            extraClass="ml-6"
                            isSmall={true}
                            
                          />
                        );
                      })
                    : null}
                </div>
                <div className={styles.container}>
                  <Circle
                    state={colorModified(item, index)}
                    letter={String(item)}
                    extraClass="mb-5"
                    head={isHead(index)}
                    tail={isTail(index)}
                  />
                  {index !== listArr.length - 1 && <ArrowIcon/>}
                </div>
                <div className={styles.container}>
                  {(index === indexAdd && (isDeleteHead || isDeleteTail)) ||
                  (isDeleteByIndex && index === indexAdd)
                    ? deleteElement.map((item, index) => {
                        return (
                          <Circle
                            key={index}
                            letter={String(item)}
                            state={ElementStates.Changing}
                            extraClass=""
                            isSmall={true}
                          />
                        );
                      })
                    : null}
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </SolutionLayout>
  );
};
