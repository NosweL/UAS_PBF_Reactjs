import { createContext, useContext, useState } from "react";
import api from "../api/contacts";
import { v4 as uuid } from "uuid";

const contactsCrudContext = createContext();

export function ContactsCrudContextProvider({ children }) {
  const [contactList, setContactList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Retrieve contacts
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    if (response.data) {
      setContactList(response.data);
    }
  };

  // Add contact
  const addContactHandler = async (contact) => {
    const request = {
      id: uuid(),
      ...contact,
    };
    const response = await api.post("/contacts", request);

    setContactList([...contactList, response.data]);
  };

  // Edit contact
  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id } = response.data;
    setContactList(
      contactList.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  // Delete contact
  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contactList.filter((contact) => {
      return contact.id !== id;
    });

    setContactList(newContactList);
  };

  // Search function
  const searchHandler = (keyword) => {
    setSearchTerm(keyword);
    if (keyword !== "") {
      const filteredContactList = contactList.filter(({ id, ...contact }) => {
        return Object.values({ ...contact })
          .join(" ")
          .toLowerCase()
          .includes(keyword.toLowerCase());
      });
      setSearchResults(filteredContactList);
    } else {
      setSearchResults(contactList);
    }
  };

  const value = {
    contactList,
    retrieveContacts,
    addContactHandler,
    updateContactHandler,
    removeContactHandler,
    searchHandler,
    searchTerm,
    searchResults,
  };

  return (
    <contactsCrudContext.Provider value={value}>
      {children}
    </contactsCrudContext.Provider>
  );
}

export function useContactsCrud() {
  return useContext(contactsCrudContext);
}
