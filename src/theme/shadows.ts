declare module '@mui/material/styles' {
  interface Theme {
    customShadows: string[];
  }
  interface ThemeOptions {
    customShadows?: string[];
  }
}

const customShadows = ['0px 18px 40px 0pxrgba(108, 176, 110, 0.12)', '2px 2px 10px 0px rgba(160, 162, 114, 0.2)'];

export default customShadows;
