import { Problem } from "../tipos/problemas";
import { twoSum } from "./two-sum";
import { reverseLinkedList } from "./reverse-linked-list";

interface ProblemMap {
  [key: string]: Problem;
}

export const problemas: ProblemMap = {
  "two-sum": twoSum,
  "reverse-linked-list": reverseLinkedList,
  // "jump-game": jumpGame,
  // "search-a-2d-matrix": search2DMatrix,
  // "valid-parentheses": validParentheses,
};
