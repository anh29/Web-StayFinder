import { AppRouter } from "components/elements/AppRouter";

import { routes } from "routes";

function App() {
  return <AppRouter routes={routes} defaultRedirect="/test-page" />;
}

export default App;
