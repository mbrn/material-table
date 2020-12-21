<div align="center">

  <h1><a target="_blank" rel="noopener noreferrer" href="https://material-table-core.com">@material-table/core</a></h1>

  <p align="center">
    <a href="https://travis-ci.org/oze4/material-table-core">
      <img 
        title="build_status" 
        src="https://travis-ci.org/oze4/material-table-core.svg?branch=master"
      >
    </a>
    <a href="https://www.npmjs.com/package/@material-table/core">
      <img 
        title="npm_package" 
        src="https://badge.fury.io/js/%40material-table%2Fcore.svg"
      ></a>
  </p>

</div>

🚧 Documentation, including this `README`, is a work in progress 🚧 ✅ The code here is _at least_ as stable as `material-table` `v1.69.0` ✅

### See original [readme here](/.github/README_ORIGINAL.md)

- [Please check out `material-table` here](https://github.com/mbrn/material-table)
- [Why does this repo exist?...and more here](/.github/MoreInfo.md)

---

# Table of Contents

[https://material-table-core.com](https://material-table-core.com)

- [Compatibility with `material-table`](#compatibility)
- [Installation](#installation)
- [Examples](https://oze4.github.io/material-table-core/)
- [Documentation](#documentation)
  - [`npm` Commands](#npm-commands)
- [`material-table` Issue Tracker](https://oze4.github.io/material-table-core/#/issue-tracker)
- [To-Do List](https://oze4.github.io/material-table-core/#/to-do)
- [Contributing](#contributing)
  - [Demo Documentation](/.github/DemoDocumentation.md)

---

## Compatibility

Our main goal is to resolve current open issues over at `material-table`. Therefore, we are not backwards compatible. [See here for more info on our goals, etc..](/.github/MoreInfo.md)

With that being said, we will not be modifying component names or making drastic changes to the API/structure - imports will remain the same, etc..

## Installation

- `npm install @material-table/core`
- `yarn add @material-table/core`

```javascript
// If you can import it from `material-table` you
// can import it from `@material-table/core`
import MaterialTable from "@material-table/core";
```

## Documentation

For now, the existing material-table docs are valid.

- [material-table README](https://github.com/mbrn/material-table/blob/master/README.md)
- [material-table API Documentation](https://material-table.com)
- [Demo Documentation](/.github/DemoDocumentation.md)

## npm Commands

<small>\*make sure you are at the root of the project</small>

| Command                        | Purpose                                         | Notes                                                                                                                                                                                       |
| ------------------------------ | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm start`                    | Runs demo                                       | Listens on port `:8080`                                                                                                                                                                     |
| `npm run build:demo`           | Bundles the demo                                | Outputs to `/docs`. After making changes to the demo, you'll need to run this                                                                                                               |
| `npm run update:issue:tracker` | Update Issue Tracker with newly resolved issues | Searches `material-table` pull requests and issues for any comment that contains `/mtc::resolved`. [More info can be found here](/.github/DemoDocumentation.md#issue-tracker-documentation) |

## Contributing

Gladly accepting "applications" :) ..but seriously, my main goal is to be responsive... I have no issue giving access/permission to those that wish to help improve this excellent product! [Demo documentation can be found here](/.github/DemoDocumentation.md)
