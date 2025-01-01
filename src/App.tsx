import { AppRouter } from "components/elements/AppRouter";
import VerifyEmailModal from "components/layouts/modal/VerifyEmailModal";
import { UserProvider } from "context/UserContext";
import { routes } from "routes";

const App: React.FC = () => {
  return (
    <UserProvider>
      <VerifyEmailModal />
      <AppRouter routes={routes} defaultRedirect="/test-page" />
    </UserProvider>
  );
};

export default App;
