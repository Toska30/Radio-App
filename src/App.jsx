import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import ChannelContextProvider from "./contexts/ChannelContext";
import ProgramContextProvider from "./contexts/ProgramContext";
import CategoryContextProvider from "./contexts/CategoryContext";
import FavoriteContextProvider from "./contexts/FavoriteContext";
import Home from "./pages/Home";
import ProgramPage from "./pages/ProgramPage";
import ProgramList from "./pages/ProgramList";
import CategorisedPrograms from "./pages/CategorisedPrograms";
import UserContextProvider from "./contexts/UserContext";
import LoginPage from "./pages/LoginPage";
import FavPage from "./pages/FavPage";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <UserContextProvider>
          <ChannelContextProvider>
            <CategoryContextProvider>
              <ProgramContextProvider>
                <FavoriteContextProvider>
                  <Navbar />
                  <Route exact path="/" component={Home} />
                  <Route
                    exact
                    path="/programs/:channelId"
                    component={ProgramList}
                  />
                  <Route
                    exact
                    path="/programs/allprogram/:programId"
                    component={ProgramPage}
                  />
                  <Route
                    exact
                    path="/programs/categories/:categoryId"
                    component={CategorisedPrograms}
                  />
                  <Route exact path="/users/login" component={LoginPage} />
                  <Route exact path="/favorite" component={FavPage} />
                </FavoriteContextProvider>
              </ProgramContextProvider>
            </CategoryContextProvider>
          </ChannelContextProvider>
        </UserContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
