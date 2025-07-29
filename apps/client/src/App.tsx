import { BrowserRouter as Router, Routes, Route } from "react-router"
import { HomePage } from "./pages/HomePage"
import { Provider } from 'react-redux';
import { store } from "./services/store";
import { FormBuilder } from "./pages/FormBuilder";
import { FormFiller } from "./pages/FormFiller";
import { FormResponses } from "./pages/FormResponses";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/forms/new" element={<FormBuilder />} />
            <Route path="/forms/:id/fill" element={<FormFiller />} />
            <Route path="/forms/:id/responses" element={<FormResponses />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  )
}