import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import { publicRoutes } from "./routes";
import { DefaultLayout } from "./layouts/DefaultLayout";

const App = () => {
  return (
    <Router>
      <DefaultLayout>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;

            return <Route key={index} path={route.path} element={<Page />} />;
          })}
        </Routes>
      </DefaultLayout>
    </Router>
  );
};

export default App;
