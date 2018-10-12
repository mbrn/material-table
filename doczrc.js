export default {
  title: 'material-table',
  description: 'Datatable for React based on https://material-ui.com/api/table/ with additional features',
  dest: './docs',
  htmlContext: {
    head: {
      links: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
      ]
    }
  },
  themeConfig: {
    mode: 'dark'
  },
  hashRouter: true,
  base: '/material-table/'
}