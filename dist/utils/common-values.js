"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.selectionMaxWidth = exports.actionsColumnWidth = exports.rowActions = exports.baseIconSize = exports.elementSize = void 0;

var elementSize = function elementSize(props) {
  return props.options.padding === "default" ? "medium" : "small";
};

exports.elementSize = elementSize;

var baseIconSize = function baseIconSize(props) {
  return elementSize(props) === "medium" ? 48 : 32;
};

exports.baseIconSize = baseIconSize;

var rowActions = function rowActions(props) {
  return props.actions.filter(function (a) {
    return a.position === "row" || typeof a === "function";
  });
};

exports.rowActions = rowActions;

var actionsColumnWidth = function actionsColumnWidth(props) {
  return rowActions(props).length * baseIconSize(props);
};

exports.actionsColumnWidth = actionsColumnWidth;

var selectionMaxWidth = function selectionMaxWidth(props, maxTreeLevel) {
  return baseIconSize(props) + 9 * maxTreeLevel;
};

exports.selectionMaxWidth = selectionMaxWidth;
