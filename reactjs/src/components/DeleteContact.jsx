import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContactsCrud } from "../context/ContactsCrudContext";
import Swal from 'sweetalert2';

function DeleteContact() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, nim, name, phoneNumber, email } = location.state.contact;
  const { removeContactHandler } = useContactsCrud();

  const removeContact = () => {
    removeContactHandler(id);
    Swal.fire(
      'Berhasil!',
      'Kontak Sudah Dihapus!',
      'success'
    );
    navigate("/");
  };

  return (
    <>
      <div className="ui warning message">
        <div className="header">
          Apakah Kamu Yakin Untuk {" "}
          <span style={{ color: "red" }}>
            <em>menghapus</em>
          </span>{" "}
          kontak ini?
        </div>
        <hr />
        Nim: {nim}
        <br />
        Name: {name}
        <br />
        Phone Number: {phoneNumber}
        <br />
        Email: {email}
      </div>
      <Link to="/">
        <button className="ui animated button grey left floated" type="button">
          <div className="visible content">Kembali</div>
          <div className="hidden content">
            <i className="caret left icon"></i>
          </div>
        </button>
      </Link>
      <button
        className="ui vertical animated button red right floated"
        onClick={removeContact}
        type="button"
      >
        <div className="visible content">Hapus</div>
        <div className="hidden content">
          <i className="trash alternate outline icon"></i>
        </div>
      </button>
    </>
  );
}

export default DeleteContact;
