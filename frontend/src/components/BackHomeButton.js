import { Link } from "react-router-dom";

export default function BackHomeButton() {
  return (
    <Link to="/" className="btn btn-secondary mt-3">
      ⬅ Voltar para Home
    </Link>
  );
}