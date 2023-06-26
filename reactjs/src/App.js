import Header from "./components/Header";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactDetail from "./components/ContactDetail";
import DeleteContact from "./components/DeleteContact";
import EditContact from "./components/EditContact";
import { ContactsCrudContextProvider } from "./context/ContactsCrudContext";
import './style.css';

function App() {
  return (
    
    <div className="ui container">
      <Router>
        <Header />
        <ContactsCrudContextProvider>
          <Routes>
            <Route exact path="/" element={<ContactList />} />
            <Route path="/add" element={<AddContact />} />
            <Route path="/view-contact/:id" element={<ContactDetail />} />
            <Route path="/edit-contact/:id" element={<EditContact />} />
            <Route path="/delete-contact/:id" element={<DeleteContact />} />
          </Routes>
        </ContactsCrudContextProvider>
      </Router>
    </div>
  );
}

export default App;
