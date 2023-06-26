import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContactsCrud } from "../context/ContactsCrudContext";
import Swal from 'sweetalert2';

const EditContact = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, nim, name, phoneNumber, email } = location.state.contact;
  const [editForm, setEditForm] = useState({
    nim: nim,
    name: name,
    phoneNumber: phoneNumber,
    email: email,
  });
  const { updateContactHandler } = useContactsCrud();

  const updateContact = (event) => {
    event.preventDefault();
    const newFormData = Object.values(editForm);
    if (newFormData.some((value) => value === "")) {
      Swal.fire(
        'Ga Boleh gitu!',
        'Semua Requirement harus diisi!',
        'error'
      );
    } else {
      updateContactHandler({ id, ...editForm });
      setEditForm({ nim: "", name: "", phoneNumber: "", email: "" });
      Swal.fire(
        'Berhasil!',
        'Kontak Sudah Diubah!',
        'success'
      );
      navigate("/");
    }
  };

  const handleFormChange = (event) => {
    setEditForm({
      ...editForm,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="ui main">
      <h3 className="ui medium header">Edit Kontak</h3>
      <form className="ui form" onSubmit={updateContact}>
        <div className="field">
          <label>NIM</label>
          <input
            type="tel"
            name="nim"
            placeholder="NIM"
            pattern="[0-9]{9,11}"
            value={editForm.nim}
            onChange={handleFormChange}
            required
          />
        </div>
        <div className="field">
          <label>Nama</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={editForm.name}
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
            value={editForm.phoneNumber}
            onChange={handleFormChange}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={editForm.email}
            onChange={handleFormChange}
          />
        </div>
        <Link to="/">
          <button
            className="ui vertical animated grey button left floated"
            type="button"
          >
            <div className="visible content">Batal</div>
            <div className="hidden content">
              <i className="close icon"></i>
            </div>
          </button>
        </Link>
        <button
          className="ui animated green button right floated"
          type="submit"
        >
          <div className="visible content">Ubah</div>
          <div className="hidden content">
            <i className="caret right icon"></i>
          </div>
        </button>
      </form>
    </div>
  );
};

export default EditContact;
