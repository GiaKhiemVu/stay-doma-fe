// app/theme/types.d.ts
import "@mui/material/styles";
declare module "@mui/material/styles" {
    interface Theme {
        gradients: {
            hero: string;
            primarySoft: (alphaAmt?: number) => string;
        };
    }
    interface ThemeOptions {
        gradients?: Theme["gradients"];
    }
}