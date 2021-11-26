import "./App.css";
import { Suspense, lazy } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./theme/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SimpleBackdrop from "./components/loader";
const Login = lazy(() => import("./components/login"));
const Signup = lazy(() => import("./components/signup"));
const Forgotpass = lazy(() => import("./components/forgotpass"));
const NewPass = lazy(() => import("./components/newpass"));
function App() {
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <Router>
        <Suspense fallback={<SimpleBackdrop open={true} />}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgotpass" element={<Forgotpass />} />
            <Route path="/newpass" element={<NewPass />} />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;
