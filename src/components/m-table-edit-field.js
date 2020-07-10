import * as React from "react";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
  DateTimePicker,
} from "@material-ui/pickers";
import PropTypes from "prop-types";

class MTableEditField extends React.Component {
  getProps() {
    const {
      columnDef,
      rowData,
      onRowDataChange,
      errorState,
      ...props
    } = this.props;
    return props;
  }

  renderLookupField() {
    const { helperText, error, ...props } = this.getProps();
    return (
      <FormControl error={Boolean(error)}>
        <Select
          {...props}
          value={this.props.value === undefined ? "" : this.props.value}
          onChange={(event) => this.props.onChange(event.target.value)}
          style={{
            fontSize: 13,
          }}
          SelectDisplayProps={{ "aria-label": this.props.columnDef.title }}
        >
          {Object.keys(this.props.columnDef.lookup).map((key) => (
            <MenuItem key={key} value={key}>
              {this.props.columnDef.lookup[key]}
            </MenuItem>
          ))}
        </Select>
        {Boolean(helperText) && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  }

  renderBooleanField() {
    return (
      <Checkbox
        {...this.getProps()}
        value={String(this.props.value)}
        checked={Boolean(this.props.value)}
        onChange={(event) => this.props.onChange(event.target.checked)}
        style={{
          paddingLeft: 0,
          paddingTop: 0,
          paddingBottom: 0,
        }}
        inputProps={{
          "aria-label": this.props.columnDef.title,
        }}
      />
    );
  }

  renderDateField() {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={this.props.locale}>
        <DatePicker
          {...this.getProps()}
          format="dd.MM.yyyy"
          value={this.props.value || null}
          onChange={this.props.onChange}
          clearable
          InputProps={{
            style: {
              fontSize: 13,
            },
          }}
          inputProps={{
            "aria-label": `${this.props.columnDef.title}: press space to edit`,
          }}
        />
      </MuiPickersUtilsProvider>
    );
  }
  renderTimeField() {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={this.props.locale}>
        <TimePicker
          {...this.getProps()}
          format="HH:mm:ss"
          value={this.props.value || null}
          onChange={this.props.onChange}
          clearable
          InputProps={{
            style: {
              fontSize: 13,
            },
            inputProps: {
              "aria-label": `${this.props.columnDef.title}: press space to edit`,
            },
          }}
        />
      </MuiPickersUtilsProvider>
    );
  }

  renderDateTimeField() {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={this.props.locale}>
        <DateTimePicker
          {...this.getProps()}
          format="dd.MM.yyyy HH:mm:ss"
          value={this.props.value || null}
          onChange={this.props.onChange}
          clearable
          InputProps={{
            style: {
              fontSize: 13,
            },
            inputProps: {
              "aria-label": `${this.props.columnDef.title}: press space to edit`,
            },
          }}
        />
      </MuiPickersUtilsProvider>
    );
  }

  renderTextField() {
    return (
      <TextField
        {...this.getProps()}
        style={
          this.props.columnDef.type === "numeric" ? { float: "right" } : {}
        }
        type={this.props.columnDef.type === "numeric" ? "number" : "text"}
        placeholder={
          this.props.columnDef.editPlaceholder || this.props.columnDef.title
        }
        value={this.props.value === undefined ? "" : this.props.value}
        onChange={(event) =>
          this.props.onChange(
            this.props.columnDef.type === "numeric"
              ? event.target.valueAsNumber
              : event.target.value
          )
        }
        InputProps={{
          style: {
            fontSize: 13,
          },
          inputProps: {
            "aria-label": this.props.columnDef.title,
          },
        }}
      />
    );
  }

  renderCurrencyField() {
    return (
      <TextField
        {...this.getProps()}
        placeholder={
          this.props.columnDef.editPlaceholder || this.props.columnDef.title
        }
        value={this.props.value === undefined ? "" : this.props.value}
        onChange={(event) => this.props.onChange(event.target.value)}
        inputProps={{
          style: {
            fontSize: 13,
            textAlign: "right",
            "aria-label": this.props.columnDef.title,
          },
        }}
      />
    );
  }

  render() {
    let component = "ok";

    if (this.props.columnDef.lookup) {
      component = this.renderLookupField();
    } else if (this.props.columnDef.type === "boolean") {
      component = this.renderBooleanField();
    } else if (this.props.columnDef.type === "date") {
      component = this.renderDateField();
    } else if (this.props.columnDef.type === "time") {
      component = this.renderTimeField();
    } else if (this.props.columnDef.type === "datetime") {
      component = this.renderDateTimeField();
    } else if (this.props.columnDef.type === "currency") {
      component = this.renderCurrencyField();
    } else {
      component = this.renderTextField();
    }

    return component;
  }
}

MTableEditField.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  columnDef: PropTypes.object.isRequired,
  dateTimePickerLocalization: PropTypes.object,
};

export default MTableEditField;
