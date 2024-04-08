import { Column } from "../../ui/column/column";
import styles from "../sorting-page.module.css";
import { ElementStates } from "../../../types/element-states";
import { algo } from "./sorting-bubble";

const RejectionColumns = ({
  arr,
  array,
  stepIndex,
}: {
  arr: number[];
  array: algo;
  stepIndex: number;
}) => {
  console.log(stepIndex)
  return (
    <ul className={styles.list}>
      {arr !== undefined
        ? arr.map((item, index) => {
            const color = getColumnState(item, array, stepIndex, arr);
            return (
              <li key={index} className={`${styles.li}`}>
                <Column index={item} state={color} />
              </li>
            );
          })
        : null}
    </ul>
  );
};

export default RejectionColumns;


function getColumnState(
  item: number,
  array: algo,
  stepIndex: number,
  arr: number[]
  ) {
    let isChecked = false
    let isCheckedTwo = false
    let stepIndexChecked = 0


  if (
  arr.includes(array.indexA[stepIndex]) &&
  item === array.indexA[stepIndex] 
  && stepIndex + 1 !== arr.length
  ) {
    isChecked = true
    stepIndexChecked++

  return ElementStates.Changing;
  } else if (
  arr.includes(array.indexB[stepIndex]) &&
  item === array.indexB[stepIndex] 
  && stepIndex + 1 !== arr.length
  ) {
  return ElementStates.Changing;
} 
if(isChecked && item === array.sortedElements[stepIndexChecked]){
  stepIndexChecked++
    return ElementStates.Modified;
}
// console.log(isChecked)
// console.log(stepIndexChecked)
  return ElementStates.Default;
  }

  
  
  
// else if (array.sortedElements.includes(item) && (arr.includes(array.indexA[stepIndex]) || arr.includes(array.indexB[stepIndex]))) {

//   return ElementStates.Modified;
//   }
// else if (array.sortedElements.includes(item)) {
//   return ElementStates.Modified;
// }





















  // function getColumnState (item:number, array:algo, stepIndex:number, arr:number[]) {
//   if (arr.includes(array.indexA[stepIndex])) {
//     const gg =arr.includes(array.indexA[stepIndex])
//     console.log(gg)
//     return ElementStates.Modified;
//   } else if(!arr.includes(array.indexA[stepIndex])) {
//     return ElementStates.Default;
//   }
// }

// function getColumnState(
//   item: number,
//   array: algo,
//   stepIndex: number,
//   arr: number[]
// ) {
//   if (
//     arr.includes(array.indexA[stepIndex]) &&
//     item === array.indexA[stepIndex]
//   ) {
//     return ElementStates.Changing;
//   } else if (arr.includes(array.indexB[stepIndex]) &&
//   item === array.indexB[stepIndex]) {
//     return ElementStates.Changing;
// } else if (!arr.includes(item) && array.sortedElements.includes(item)) {
//   return ElementStates.Modified;

//   }
//   return ElementStates.Default
// }
  
  
  