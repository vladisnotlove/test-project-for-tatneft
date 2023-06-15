import { createTheme } from '@mui/material/styles'

let theme = createTheme({
	palette: {
		primary: {
			main: '#48bb0e'
		}
	},
	typography: {
		fontFamily: 'Roboto'
	}
})

theme = createTheme({
	...theme,
	components: {
		MuiAppBar: {
			defaultProps: {
				elevation: 0,
				color: 'default'
			},
			styleOverrides: {
				root: {
					borderBottom: `1px solid ${theme.palette.divider}`
				}
			}
		}
	}
})

export default theme
