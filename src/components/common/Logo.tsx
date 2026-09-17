import { Link } from 'react-router-dom';
import { img } from '../../data';

export default function Logo() {
  return (
    <Link className="brand" to="/" aria-label="SGGSIE&T Training and Placement Cell home">
      <span className="brand-mark brand-mark-dual">
        <img src={img('branding/sggs-logo.jpeg')} alt="SGGSIE&T Institute logo" />
        <span className="brand-divider" aria-hidden="true" />
        <img className="brand-tnp-mark" src={img('branding/tnp-logo.jpeg')} alt="Training & Placement Cell logo" />
      </span>
      <span className="brand-copy">
        <strong>SGGSIE&amp;T</strong>
        <small>TRAINING &amp; PLACEMENT CELL</small>
      </span>
    </Link>
  );
}
