import { imageAPI, productAPI } from "../../utils/api";

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded p-4 hover:shadow-md">
      <img
        src={imageAPI.getImageUrl(product.primaryImage?.image_url) || 'null'}
        alt="Failed To Load Image"
        className="w-full h-48 object-cover rounded mb-3"
      />
      <h3 className="font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
      <div className="flex justify-between items-center">
        <div>
          <span className="text-lg font-bold">${product.price}</span>
          {product.sale_price && (
            <span className="text-sm text-gray-500 line-through ml-2">
              ${product.sale_price}
            </span>
          )}
        </div>
        <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;