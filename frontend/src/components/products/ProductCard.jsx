import { imageAPI, productAPI } from "../../utils/api";
import { Link } from 'react-router-dom';
import ProductActions from './ProductActions.jsx';
import useProductActions from '../../hooks/useProductActions.js';
import CompareModal from './CompareModel.jsx';
import OpenModel from './OpenModel.jsx';

const ProductCard = ({ product }) => {
  const {
    compareList,
    isCompareOpen,
    setIsCompareOpen,
    showAddProducts,
    setShowAddProducts,
    wishlist,
    isOpenModelOpen,
    setIsOpenModelOpen,
    selectedProduct,
    toggleWishlist,
    handleAddToCompare,
    handleRemoveFromCompare,
    handleAddMoreProducts,
    handleOpenModel
  } = useProductActions();

  const isWishlisted = wishlist.includes(product.id);

  return (
    <>
      <div className="border rounded p-4 hover:shadow-md relative group">
        <div className="relative">
          <img
            src={imageAPI.getImageUrl(product.primaryImage?.image_url) || 'null'}
            alt="Failed To Load Image"
            className="w-full h-48 object-cover rounded mb-3"
          />
          <ProductActions
            product={product}
            isWishlisted={isWishlisted}
            onToggleWishlist={toggleWishlist}
            onAddToCompare={handleAddToCompare}
            onOpenQuickView={handleOpenModel}
          />
        </div>
        <Link to={`/products/${product.id}`}>
          <h3 className="font-semibold mb-2 hover:text-blue-600 cursor-pointer">{product.name}</h3>
        </Link>
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
      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        productsToCompare={compareList}
        onRemove={handleRemoveFromCompare}
        onAddMore={handleAddMoreProducts}
        showAddProducts={showAddProducts}
        onCloseAddProducts={() => setShowAddProducts(false)}
        allProducts={[product]}
        onAddToCompare={handleAddToCompare}
      />
      <OpenModel
        isOpen={isOpenModelOpen}
        onClose={() => setIsOpenModelOpen(false)}
        product={selectedProduct}
      />
    </>
  );
};

export default ProductCard;