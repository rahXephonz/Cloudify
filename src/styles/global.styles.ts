import { createGlobalStyle } from "styled-components";
import { colors } from "./colors.styles";

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: "AuroraaBold";
    src: url("/font/Croxify-bold.otf") format("opentype");
  }

  @font-face {
    font-family: "AuroraaReg";
    src: url("/font/Croxify-reg.otf") format("opentype");
  }

  @font-face {
    font-family: "Guillon-blvd";
    src: url("/font/Guillon-blvd.otf") format("opentype");
  }

  * {
    padding: 0px;
    margin: 0px;
    box-sizing: border-box;
    color: ${colors.gray};
    font-family: "Guillon-blvd";
  }
`;

export default GlobalStyles;
