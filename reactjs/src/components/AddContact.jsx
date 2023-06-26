import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContactsCrud } from "../context/ContactsCrudContext";
import Swal from 'sweetalert2';

function AddContact() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nim: "",
    name: "",
    phoneNumber: "",
    email: "",
  });
  const { addContactHandler } = useContactsCrud();

  const addContact = (event) => {
    event.preventDefault();
    const formData = Object.values(form);
    if (formData.some((value) => value === "")) {
      Swal.fire(
        'Ga Boleh Yaa!',
        'Semua Requirement harus diisi!',
        'error'
      );
    } else {
      addContactHandler(form);
      setForm({ nim: "", name: "", phoneNumber: "", email: "" });
      Swal.fire(
        'Berhasil!',
        'Kontak Sudah Ditambahkan!',
        'success'
      );
      navigate("/");
    }
  };

  const handleFormChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="ui main">
      <h3 className="ui medium header">Add New Contact</h3>
      <form className="ui form" onSubmit={addContact}>
        <div className="field">
          <label>NIM</label>
          <input
            type="text"
            name="nim"
            placeholder="Masukkan Nim"
            title="Masukkan Minimal 9-11 Digit"
            pattern="[0-9]{9,11}"
            value={form.nim}
            onChange={handleFormChange}
            required
          />
        </div>
        <div className="field">
          <label>Nama</label>
          <input
            type="text"
            name="name"
            placeholder="Masukkan Nama"
            value={form.name}
            onChange={handleFormChange}
          />
        </div>
        <div className="field">
          <label>Nomor Telp</label>
          <input
            type="tel"
            name="phoneNumber"
            pattern="^\+?[0-10]?\d{10,11}$"
            title="Masukkan Minimal 9-11 Digit"
            placeholder="Masukkan Nomor Telfon"
            value={form.phoneNumber}
            onChange={handleFormChange}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Masukkan Email"
            value={form.email}
            onChange={handleFormChange}
          />
        </div>
        <Link to="/">
          <button
            className="ui animated grey button left floated"
            type="button"
          >
            <div className="visible content">Kembali</div>
            <div className="hidden content">
              <i className="caret left icon"></i>
            </div>
          </button>
        </Link>
        <button
          className="ui vertical animated blue button right floated"
          type="submit"
        >
          <div className="visible content">Tambah</div>
          <div className="hidden content">
            <i className="user plus icon"></i>
          </div>
        </button>
      </form>
    </div>
  );
};

export default AddContact;
