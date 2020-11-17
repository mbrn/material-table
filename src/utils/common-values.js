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
  const captureGroups = calc.match(/(\d*)%/);
  if (captureGroups && captureGroups.length > 1) {
    const percentage = captureGroups[1];
    return calc.replace(/\d*%/, `${fullValue * (percentage / 100)}px`);
  }
  return calc.replace(/\d*%/, `${fullValue}px`);
};
