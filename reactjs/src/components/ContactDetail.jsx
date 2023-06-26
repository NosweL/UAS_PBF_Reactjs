import image from "../images/bio.png";
import { Link, useLocation } from "react-router-dom";


function ContactDetail() {
  const location = useLocation();
  const { id, nim, name, phoneNumber, email } = location.state.contact;

  return (
    <div className="main">
      <div className="ui card centered">
        <div className="image">
          <img src={image} alt="user" />
        </div>
        <div className="content">
          <div className="header">NIM - {nim}</div>
          <div className="description border-bio">
            Nama  : {name}
            <br />
            Nomor : {phoneNumber}
            <br />
            Email : {email}
          </div>
        </div>
        <div className="extra content">
          <Link to="/">
            <span
              className="left floated caret left icon"
              style={{ marginRight: "10px" }}
            >
              <i className="caret left icon"></i>
              Kembali
            </span>
          </Link>
          <Link
            to={`/edit-contact/${id}`}
            state={{ contact: location.state.contact }}
          >
            <span className="edit icon onHoverGreen">
              <i className="edit icon"></i>
              Edit
            </span>
          </Link>
          <Link
            to={`/delete-contact/${id}`}
            state={{ contact: location.state.contact }}
          >
            <span className="right floated trash icon onHoverRed">
              <i className="trash alternate outline icon"></i>
              Hapus
            </span>
          </Link>
          <Link
          >
          <span className="right floated print icon onHoverBlue" onClick={() => window.print()} style={{ marginRight: "10px" }}>
            <i className="print icon"></i>
            Print
          </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ContactDetail;
