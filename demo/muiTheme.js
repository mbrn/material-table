import { createMuiTheme } from '@material-ui/core/styles';

let direction = 'ltr';
// direction = 'rtl';
const theme = createMuiTheme({
  direction: direction,
  palette: {
    type: 'light',
  },
});

export default theme;
