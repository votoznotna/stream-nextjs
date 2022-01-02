import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
import { AuthProvider } from "lib/useAuth";

import { useApollo } from "../lib/apollo";
import { themeDark, themeLight } from "../lib/theme";
import Header from "components/Header";
import { CssBaseline } from "@mui/material";

export default function MyApp({ Component, pageProps }) {
  const [darkState, setDarkState] = useState(false);
  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  const apolloClient = useApollo(pageProps.initialApolloState);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={darkState ? themeDark : themeLight}>
        <CssBaseline />
        <AuthProvider>
          <Header darkState={darkState} handleThemeChange={handleThemeChange} />
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}
