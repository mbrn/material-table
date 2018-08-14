# material-table

[![Build Status](https://travis-ci.org/mbrn/material-table.svg?branch=master)](https://travis-ci.org/mbrn/material-table)
[![npm package](https://img.shields.io/npm/v/material-table/latest.svg)](https://www.npmjs.com/package/material-table)
[![NPM Downloads](https://img.shields.io/npm/dm/material-table.svg?style=flat)](https://npmcharts.com/compare/material-table?minimal=true)
[![Follow on Twitter](https://img.shields.io/twitter/follow/baranmehmet.svg?label=follow+baranmehmet)](https://twitter.com/baranmehmet)

A console application that contains a lof of features to help developer

[__DEMO__](https://mbrn.github.io/material-table/)

## Installation
    $ npm install material-table --save

## Usage 

```javascript
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MaterialTable from 'material-table'

class App extends Component {
  render() {
    return (
      <div style={{maxWidth: '100%'}}>
        <MaterialTable
          columns={[
            {title: 'Adı', field: 'name'},
            {title: 'Soyadı', field: 'surname'},
            {title: 'Doğum Yılı', field: 'birthYear', isNumeric: true},
            {title: 'Doğum Yeri', field: 'birthCity', lookup: {34: 'İstanbul', 63: 'Şanlıurfa'}}
          ]}
          data={[{name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63}]}
          title="Demo Title"
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('react-div'));
```

## Properties

| Property | Type   | Default           | Description                                                       |
|:---------|:-------|:------------------|:------------------------------------------------------------------|
| actions  | Array  |                   | Action list. An icon button will be rendered for each actions     |
| columns  | Array  |                   | Column definitions                                                |
| data     | Array  |                   | Data to be rendered                                               |
| options  | object |                   | All options of table                                              |
| title    | string | 'Table Title'     | Table Title (only render if toolbar option is true                |

#### actions

| Field     | Type      | Default   | Description                                                                               |    
|:----------|:----------|:----------|:------------------------------------------------------------------------------------------|
| icon      | string    |           | Icon of button from material icons                                                        |
| onClick   | func      |           | This event will be fired when button clicked. Parameters are `event` and `row or rows`    |
| tooltip   | string    |           | Tooltip for button                                                                        |

#### columns

| Field     | Type      | Default   | Description                                                                                   |
|:----------|:----------|:----------|:----------------------------------------------------------------------------------------------|
| hidden    | boolean   | false     | Flag for hide column                                                                          |
| isNumeric | boolean   | false     | Flag for render data as numeric                                                               |
| lookup    | object    |           | Key value pair for lookup render data from                                                    |
| render    | func      |           | Render a custom node for cell. Parameter is `rowData` and return value must be ReactElement.  |
| title     | string    |           | Header text                                                                                   |

#### data

#### options

Options property could be given to component as `options` property. You can change behaviour of grid 


