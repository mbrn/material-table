# material-table

[![Build Status](https://travis-ci.org/mbrn/material-table.svg?branch=master)](https://travis-ci.org/mbrn/material-table)
[![npm package](https://img.shields.io/npm/v/material-table/latest.svg)](https://www.npmjs.com/package/material-table)
[![NPM Downloads](https://img.shields.io/npm/dm/material-table.svg?style=flat)](https://npmcharts.com/compare/material-table?minimal=true)
[![Follow on Twitter](https://img.shields.io/twitter/follow/baranmehmet.svg?label=follow+baranmehmet)](https://twitter.com/baranmehmet)

Datatable for React based on https://material-ui.com/api/table/ with additional features

[__DEMO AND DOCUMENTATION__](https://mbrn.github.io/material-table/)

## Installation
    npm install material-table --save

> Add material icons url to your html:
`<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">`

## Usage 

```js
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
            {title: 'Doğum Yılı', field: 'birthYear', type: 'numeric'},
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

## Documentation

You can access all examples and documentation from [__docs site__](https://mbrn.github.io/material-table/)

## Licence

This project is licensed under the terms of the [MIT license](/LICENSE).

