import { ElementStates } from "../../types/element-states";
import { Props } from "../../types/props";

export default function getCharStatus ({index, words, stepIndex}:Props) {
  const maxIndex = words[stepIndex].length - 1;

  if (
    index < stepIndex ||
    index > maxIndex - stepIndex ||
    stepIndex === words.length - 1 
  ) {
return ElementStates.Modified
  }
  if (index === stepIndex || index === maxIndex - stepIndex){
    return ElementStates.Changing
  }
  return ElementStates.Default
}