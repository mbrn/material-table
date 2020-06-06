import * as React from "react";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Autocomplete from '@material-ui/lab/Autocomplete';
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

  renderAutocompleteField() {
    return (
      <Autocomplete
        {...this.getProps()}
        clearOnEscape
        options={this.props.columnDef.autocomplete}
        freeSolo={this.props.columnDef.freeSolo}
        inputValue={this.props.value || ''}
        onChange={(event, newValue) => this.props.onChange(newValue)}
        onInputChange={(event, newValue) => this.props.onChange(event.target.value)}
        renderInput={(params) =>
          <TextField
            {...params}
            placeholder={this.props.columnDef.title}
            value={this.props.value || ''}
            onChange={(event) => this.props.onChange(event.target.value)}
            style={{
              maxWidth: "200px"
            }}
          />
        }
      />
    );
  }

  renderLookupField() {
    const { helperText, ...props } = this.getProps();
    return (
      <Select
        {...props}
        value={this.props.value === undefined ? "" : this.props.value}
        onChange={(event) => this.props.onChange(event.target.value)}
        style={{
          fontSize: 16,
        }}
        SelectDisplayProps={{ "aria-label": this.props.columnDef.title }}
      >
        {Object.keys(this.props.columnDef.lookup).map((key) => (
          <MenuItem key={key} value={key}>
            {this.props.columnDef.lookup[key]}
          </MenuItem>
        ))}
      </Select>
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
              fontSize: 16,
            }
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
              fontSize: 16,
            }
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
            inputProps: {
              "aria-label": `${this.props.columnDef.title}: press space to edit`,
            },
              fontSize: 16,
            }
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
        onChange={(event) => this.props.onChange(event.target.value)}
        InputProps={{
          style: {
            inputProps: {
              "aria-label": this.props.columnDef.title,
            },
            fontSize: 16,
          }
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
            fontSize: 16,
            textAlign: "right",
            "aria-label": this.props.columnDef.title,
          }
        }}
      />
    );
  }

  render() {
    let component = "ok";

    if (this.props.columnDef.autocomplete) {
      component = this.renderAutocompleteField();
    } else if (this.props.columnDef.lookup) {
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
