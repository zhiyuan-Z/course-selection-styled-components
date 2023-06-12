"use client";

import { ThemeProvider } from "styled-components";
import colors from "./colors";
import sizes from "./sizes";

const theme = {
  colors,
  sizes,
};

const Theme = ({ children }: { children: React.ReactNode }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;

export default Theme;
