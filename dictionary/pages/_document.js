import { Html, Head, Main, NextScript } from "next/document";

function Document() {
  function setInitialColorMode() {
    // Checking the initial color preference
    function getInitialColorMode() {
      const persistedPreferenceMode = window.localStorage.getItem("theme");
      const hasPersistedPreference =
        typeof persistedPreferenceMode === "string";

      if (hasPersistedPreference) {
        return persistedPreferenceMode;
      }

      // Check the current preference
      const preference = window.matchMedia("(prefers-color-scheme: dark)");
      const hasMediaQueryPreference = typeof preference.matches === "boolean";

      if (hasMediaQueryPreference) {
        return preference.matches ? "dark" : "light";
      }

      return "light";
    }

    const currentColorMode = getInitialColorMode();
    const element = document.documentElement;
    element.style.setProperty("--initial-color-mode", currentColorMode);

    // If darkmode apply darkmode
    if (currentColorMode === "dark")
      document.documentElement.setAttribute("data-theme", "dark");
  }

  //creating the theme initializer function
  const themeInitializerScript = `(function() {
	${setInitialColorMode.toString()}
	setInitialColorMode();
})()
`;
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&family=PT+Serif:ital@1&family=Roboto+Mono:wght@100&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <script
          dangerouslySetInnerHTML={{ __html: themeInitializerScript }}
        ></script>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document;
