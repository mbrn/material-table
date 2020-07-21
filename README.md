> :warning: Please do not create pull requests that contains a lot of change. Because we are working on refactoring and testing. Just pull requests that fixes a bug with a few line changes.

<br/>
<br/>

<p align="center" style="box-shadow: 2px 2px;">
  <a href="https://material-table.com" rel="noopener" target="_blank" ><img width="200" src="https://raw.githubusercontent.com/mbrn/material-table.com/master/docs/assets/logo-back.png" alt="material-table"></a></p>
</p>

<h1 align="center">material-table</h1>

<div align="center">

A simple and powerful Datatable for React based on [Material-UI Table](https://material-ui.com/api/table/) with some additional features.

[![Build Status](https://travis-ci.org/mbrn/material-table.svg?branch=master)](https://travis-ci.org/mbrn/material-table)
[![Financial Contributors on Open Collective](https://opencollective.com/material-table/all/badge.svg?label=financial+contributors)](https://opencollective.com/material-table) [![npm package](https://img.shields.io/npm/v/material-table/latest.svg)](https://www.npmjs.com/package/material-table)
[![NPM Downloads](https://img.shields.io/npm/dm/material-table.svg?style=flat)](https://npmcharts.com/compare/material-table?minimal=true)
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/mbrn/material-table.svg)](http://isitmaintained.com/project/mbrn/material-table "Average time to resolve an issue")
[![xscode](https://img.shields.io/badge/Available%20on-xs%3Acode-blue?style=?style=plastic&logo=appveyor&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRF////////VXz1bAAAAAJ0Uk5T/wDltzBKAAAAlUlEQVR42uzXSwqAMAwE0Mn9L+3Ggtgkk35QwcnSJo9S+yGwM9DCooCbgn4YrJ4CIPUcQF7/XSBbx2TEz4sAZ2q1RAECBAiYBlCtvwN+KiYAlG7UDGj59MViT9hOwEqAhYCtAsUZvL6I6W8c2wcbd+LIWSCHSTeSAAECngN4xxIDSK9f4B9t377Wd7H5Nt7/Xz8eAgwAvesLRjYYPuUAAAAASUVORK5CYII=)](https://xscode.com/mbrn/material-table)
[![Follow on Twitter](https://img.shields.io/twitter/follow/baranmehmet.svg?label=follow+baranmehmet)](https://twitter.com/baranmehmet)
[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/material-table/Lobby)

</div>

## Roadmap

- [More on our roadmap can be found here](https://github.com/mbrn/material-table/blob/master/.github/ROADMAP.md)

## Key features

- [Actions](https://material-table.com/#/docs/features/actions)
- [Component overriding](https://material-table.com/#/docs/features/component-overriding)
- [Custom column rendering](https://material-table.com/#/docs/features/custom-column-rendering)
- [Detail Panel](https://material-table.com/#/docs/features/detail-panel)
- [Editable](https://material-table.com/#/docs/features/editable)
- [Export](https://material-table.com/#/docs/features/export)
- [Filtering](https://material-table.com/#/docs/features/filtering)
- [Grouping](https://material-table.com/#/docs/features/grouping)
- [Localization](https://material-table.com/#/docs/features/localization)
- [Remote Data](https://material-table.com/#/docs/features/remote-data)
- [Search](https://material-table.com/#/docs/features/search)
- [Selection](https://material-table.com/#/docs/features/selection)
- [Sorting](https://material-table.com/#/docs/features/sorting)
- [Styling](https://material-table.com/#/docs/features/styling)
- [Tree Data](https://material-table.com/#/docs/features/tree-data)
- and more

## Demo and documentation

You can access all code examples and documentation on our site [**material-table.com**](https://material-table.com/).

## Support material-table

To support material-table visit [SUPPORT](https://www.patreon.com/mbrn) page.

## Issue Prioritizing

Issues would be prioritized according reactions count. `is:issue is:open sort:reactions-+1-desc` filter would be use.

[List issues according to reaction score](https://github.com/mbrn/material-table/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc)

## Prerequisites

The minimum `React` version material-table supports is `^16.8.5` since material-table `v1.36.1`. This is due to utilising [`react-beautiful-dnd`](https://github.com/atlassian/react-beautiful-dnd) for drag & drop functionality which uses hooks.

If you use an older version of react we suggest to upgrade your dependencies or use material-table `1.36.0`.

## Installation

#### 1.Install package

To install material-table with `npm`:

    npm install material-table @material-ui/core --save

To install material-table with `yarn`:

    yarn add material-table @material-ui/core

#### 2.Add material icons

There are two ways to use icons in material-table either import the material icons font via html OR import material icons and use the material-table `icons` prop.

##### HTML

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>
```

OR

##### Import Material icons

Icons can be imported to be used in material-table offering more flexibility for customising the look and feel of material table over using a font library.

To install @material-ui/icons with `npm`:

    npm install @material-ui/icons --save

To install @material-ui/icons with `yarn`:

    yarn add @material-ui/icons

If your environment doesn't support tree-shaking, the **recommended** way to import the icons is the following:

```jsx
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
```

If your environment support tree-shaking you can also import the icons this way:

```jsx
import { AddBox, ArrowDownward } from "@material-ui/icons";
```

Note: Importing named exports in this way will result in the code for _every icon_ being included in your project, so is not recommended unless you configure [tree-shaking](https://webpack.js.org/guides/tree-shaking/). It may also impact Hot Module Reload performance. Source: [@material-ui/icons](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-icons/README.md#imports)

Example

```jsx
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

<MaterialTable
  icons={tableIcons}
  ...
/>
```

## Usage

Here is a basic example of using material-table within a react application.

```jsx
import React, { Component } from "react";
import ReactDOM from "react-dom";
import MaterialTable from "material-table";

class App extends Component {
  render() {
    return (
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          columns={[
            { title: "Adı", field: "name" },
            { title: "Soyadı", field: "surname" },
            { title: "Doğum Yılı", field: "birthYear", type: "numeric" },
            {
              title: "Doğum Yeri",
              field: "birthCity",
              lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
            },
          ]}
          data={[
            {
              name: "Mehmet",
              surname: "Baran",
              birthYear: 1987,
              birthCity: 63,
            },
          ]}
          title="Demo Title"
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("react-div"));
```

## Contributing

We'd love to have your helping hand on `material-table`! See [CONTRIBUTING.md](https://github.com/mbrn/material-table/blob/master/.github/CONTRIBUTING.md) for more information on what we're looking for and how to get started.

If you have any sort of doubt, idea or just want to talk about the project, feel free to join [our chat on Gitter](https://gitter.im/material-table/Lobby) :)

## Contributors

### Code Contributors

This project exists thanks to all the people who contribute. [[Contribute](CONTRIBUTING.md)].
<a href="https://github.com/mbrn/material-table/graphs/contributors"><img src="https://opencollective.com/material-table/contributors.svg?width=890&button=false" /></a>

### Financial Contributors

Become a financial contributor and help us sustain our community. [[Contribute](https://opencollective.com/material-table/contribute)]

#### Individuals

<a href="https://opencollective.com/material-table"><img src="https://opencollective.com/material-table/individuals.svg?width=890"></a>

#### Organizations

Support this project with your organization. Your logo will show up here with a link to your website. [[Contribute](https://opencollective.com/material-table/contribute)]

<a href="https://opencollective.com/material-table/organization/0/website"><img src="https://opencollective.com/material-table/organization/0/avatar.svg"></a>
<a href="https://opencollective.com/material-table/organization/1/website"><img src="https://opencollective.com/material-table/organization/1/avatar.svg"></a>
<a href="https://opencollective.com/material-table/organization/2/website"><img src="https://opencollective.com/material-table/organization/2/avatar.svg"></a>
<a href="https://opencollective.com/material-table/organization/3/website"><img src="https://opencollective.com/material-table/organization/3/avatar.svg"></a>
<a href="https://opencollective.com/material-table/organization/4/website"><img src="https://opencollective.com/material-table/organization/4/avatar.svg"></a>
<a href="https://opencollective.com/material-table/organization/5/website"><img src="https://opencollective.com/material-table/organization/5/avatar.svg"></a>
<a href="https://opencollective.com/material-table/organization/6/website"><img src="https://opencollective.com/material-table/organization/6/avatar.svg"></a>
<a href="https://opencollective.com/material-table/organization/7/website"><img src="https://opencollective.com/material-table/organization/7/avatar.svg"></a>
<a href="https://opencollective.com/material-table/organization/8/website"><img src="https://opencollective.com/material-table/organization/8/avatar.svg"></a>
<a href="https://opencollective.com/material-table/organization/9/website"><img src="https://opencollective.com/material-table/organization/9/avatar.svg"></a>

## License

This project is licensed under the terms of the [MIT license](/LICENSE).
