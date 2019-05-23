/* eslint-disable no-unused-vars */
import * as React from 'react';
import {
    TextField, FormControl, Checkbox,
    ListItemText, InputAdornment, withStyles,
    Popover, List, ListItem,
} from '@material-ui/core';
import { MuiPickersUtilsProvider, TimePicker, DatePicker, DateTimePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import PropTypes from 'prop-types';
/* eslint-enable no-unused-vars */

class MTableFilterButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null
        };
    }
    handleOpenPopoverButtonClick = (e) => {
        this.setState({
            anchorEl: e.currentTarget
        });
    }
    handlePopoverClose = () => {
        this.setState({
            anchorEl: null
        });
    }
    handleLookupCheckboxToggle = (columnDef, key) => {
        let filterValue = (columnDef.tableData.filterValue || []).slice();
        const elementIndex = filterValue.indexOf(key);
        if (elementIndex == -1) {
            filterValue.push(key);
        } else {
            filterValue.splice(elementIndex, 1);
        }
        if (filterValue.length == 0) filterValue = undefined;
        this.props.onFilterChanged(columnDef.tableData.id, filterValue);
    }
    handleCheckboxToggle = (columnDef) => {
        let val;
        if (columnDef.tableData.filterValue === undefined) {
            val = 'checked';
        } else if (columnDef.tableData.filterValue === 'checked') {
            val = 'unchecked';
        }
        this.props.onFilterChanged(columnDef.tableData.id, val);
    }
    renderFilterBody(columnDef) {
        if (columnDef.field || columnDef.customFilterAndSearch) {
            if (columnDef.lookup) {
                return this.renderLookupFilter(columnDef);
            } else if (columnDef.type === 'boolean') {
                return this.renderBooleanFilter(columnDef);
            } else if (['date', 'datetime', 'time'].includes(columnDef.type)) {
                return this.renderDateTypeFilter(columnDef);
            } else {
                return this.renderDefaultFilter(columnDef);
            }
        }
        return null;
    }
    renderLookupFilter = (columnDef) => {
        const { classes } = this.props;
        return (
            <FormControl style={{ width: '100%' }}>
                <List className={classes.filterList}>
                    {Object.keys(columnDef.lookup).map(key => (
                        <ListItem
                            className={classes.filterListItem}
                            key={key} role={undefined} dense button
                            onClick={() => this.handleLookupCheckboxToggle(columnDef, key)}
                        >
                            <Checkbox
                                className={classes.filterCheckbox}
                                checked={columnDef.tableData.filterValue ? columnDef.tableData.filterValue.indexOf(key.toString()) > -1 : false}
                                tabIndex={-1}
                                disableRipple
                            />
                            <ListItemText primary={columnDef.lookup[key]} className={classes.filterText} />
                        </ListItem>
                    ))}
                </List>
            </FormControl>
        );
    }
    renderBooleanFilter = (columnDef) => {
        const { classes } = this.props;
        return (
            <Checkbox
                className={classes.filterCheckbox}
                indeterminate={columnDef.tableData.filterValue === undefined}
                checked={columnDef.tableData.filterValue === 'checked'}
                onChange={() => this.handleCheckboxToggle(columnDef)}
            />
        );
    }
    renderDefaultFilter = (columnDef) => {
        return (
            <TextField
                style={columnDef.type === 'numeric' ? { float: 'right' } : {}}
                type={columnDef.type === 'numeric' ? 'number' : 'text'}
                value={columnDef.tableData.filterValue || ''}
                onChange={(event) => {
                    this.props.onFilterChanged(columnDef.tableData.id, event.target.value);
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <></>
                        </InputAdornment>
                    )
                }}
            />
        );
    }
    renderDateTypeFilter = (columnDef) => {
        let dateInputElement = null;
        const onDateInputChange = date => this.props.onFilterChanged(columnDef.tableData.id, date);

        if (columnDef.type === 'date') {
            dateInputElement = (
                <DatePicker
                    value={columnDef.tableData.filterValue || null}
                    onChange={onDateInputChange}
                    clearable
                />
            );
        } else if (columnDef.type === 'datetime') {
            dateInputElement = (
                <DateTimePicker
                    value={columnDef.tableData.filterValue || null}
                    onChange={onDateInputChange}
                    clearable
                />
            );
        } else if (columnDef.type === 'time') {
            dateInputElement = (
                <TimePicker
                    value={columnDef.tableData.filterValue || null}
                    onChange={onDateInputChange}
                    clearable
                />
            );
        }

        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                {dateInputElement}
            </MuiPickersUtilsProvider>
        );
    }
    render() {
        const columnDef = this.props.columnDef;
        if (columnDef.filtering === false) return null;
        const { classes } = this.props;
        const popoverOpened = this.state.anchorEl != null;
        const iconColor = `rgba(0, 0, 0, ${columnDef.tableData.filterValue ? '1' : '0.2'})`;
        return (
            <>
                <this.props.icons.Filter
                    style={{ color: iconColor }}
                    className={classes.filterIcon}
                    aria-owns={popoverOpened ? 'filter-popover' : undefined}
                    aria-haspopup="true"
                    variant="contained"
                    onClick={e => this.handleOpenPopoverButtonClick(e)}
                />
                <Popover
                    id='filter-popover'
                    open={popoverOpened}
                    anchorEl={this.state.anchorEl}
                    onClose={this.handlePopoverClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <div className={classes.filterBody}>
                        {this.renderFilterBody(columnDef)}
                    </div>
                </Popover>
            </>);
    }
}

export const styles = theme => ({
    filterIcon: {
        verticalAlign: 'middle',
        cursor: 'pointer'
    },
    filterBody: {
        padding: '8px'
    },
    filterCheckbox: {
        padding: '12px'
    },
    filterList: {
        padding: '0'
    },
    filterListItem: {
        padding: '0 12px'
    },
    filterText: {
        fontSize: '1rem',
        fontWeight: '400',
        lineHeight: '1.5em'
    },
});

MTableFilterButton.propTypes = {
    icons: PropTypes.object.isRequired,
    columnDef: PropTypes.object.isRequired,
    onFilterChanged: PropTypes.func.isRequired,
    classes: PropTypes.object,
};

export default withStyles(styles)(MTableFilterButton);