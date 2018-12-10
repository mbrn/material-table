
export default options => a => {
    if (options.selection) {
        return a.isRowAction;
    } else {
        return (!a.isFreeAction && !a.isSelectedAction) || (a.isRowAction);
    }
};