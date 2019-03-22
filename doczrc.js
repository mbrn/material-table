export default {
  title: 'material-table',
  description: 'Datatable for React based on https://material-ui.com/api/table/ with additional features',
  dest: './docs',
  htmlContext: {
    head: {
      links: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
      ]
    },
    favicon: 'https://raw.githubusercontent.com/mbrn/mbrn.github.io/master/favicon.ico',
  },
  themeConfig: {
    mode: 'dark'
  },
  menu: [
    'Get Started',
    'Props',
    'Contributing',
    {
      name: 'Examples', 
      menu: [
        "Actions Examples",
        "Basic Example",
        "Cell Styling Example",
        "Column Types Example",
        "Component Overriding Example",
        "Custom Render Example",
        "Detail Panel Examples",
        "Editable Examples",
        "Filtering Example",
        "Grouping Examples",
        "Localization Example",
        "Remote Data Examples",
        "Selection Example",
        "Sorting Example",
        "Tree Data Examples",
        "Other Examples",
      ]
    }
  ],
  hashRouter: true,
  base: '/material-table'
}