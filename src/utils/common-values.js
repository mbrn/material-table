export const elementSize = (props) =>
  props.options.padding === "default" ? "medium" : "small";
export const baseIconSize = (props) =>
  elementSize(props) === "medium" ? 48 : 32;
export const rowActions = (props) =>
  props.actions.filter((a) => a.position === "row" || typeof a === "function");
export const actionsColumnWidth = (props) =>
  rowActions(props).length * baseIconSize(props);
export const selectionMaxWidth = (props, maxTreeLevel) =>
  baseIconSize(props) + 9 * maxTreeLevel;

export const reducePercentsInCalc = (calc, fullValue) => {
  let index = calc.indexOf("%");
  while (index !== -1) {
    let leftIndex = index - 1;
    while (leftIndex >= 0 && "0123456789.".indexOf(calc[leftIndex]) !== -1) {
      leftIndex--;
    }
    leftIndex++;

    const value = Number.parseFloat(calc.substring(leftIndex, index));
    calc =
      calc.substring(0, leftIndex) +
      (value * fullValue) / 100 +
      "px" +
      calc.substring(index + 1);
    index = calc.indexOf("%");
  }

  return calc;
};
