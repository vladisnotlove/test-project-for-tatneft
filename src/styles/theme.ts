// need to add types of theme for date-pickers
import type {} from '@mui/x-date-pickers/themeAugmentation';
import { createTheme } from "@mui/material/styles";

// init variables
let theme = createTheme({
	palette: {
		text: {
			primary: "rgba(0,0,0,0.92)",
			secondary: "rgba(0,0,0,0.64)",
			moreSecondary: "rgba(0,0,0,0.32)",
		},
		primary: {
			light: "#D6E2CB",
			main: "#afc7af",
		},
		background: {
			default: "#F5F5F5",
			paper: "#fff",
		}
	},
	typography: {
		fontFamily: "Roboto",
		body1: {
			fontSize: "16px",
			lineHeight: "150%",
		},
		body2: {
			fontSize: "14px",
			lineHeight: "150%",
		},
		h5: {
			fontSize: "22px",
			fontWeight: "500",
			lineHeight: "125%",
		},
		h4: {
			fontSize: "26px",
			fontWeight: "500",
			lineHeight: "125%",
		}
	}
});

// override component styles & props
theme = createTheme({
	...theme,
	components: {
		MuiButton: {
			defaultProps: {
				disableElevation: true,
			}
		}
	}
});

export default theme;
