import { useNavigate } from "react-router-dom";

const SingleProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      className="border p-3 cursor-pointer"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <img src={product.image} className="h-40" />
      <h2 className="font-bold">{product.title}</h2>
      <p>₹{product.price}</p>
    </div>
  );
};

export default SingleProductCard;
