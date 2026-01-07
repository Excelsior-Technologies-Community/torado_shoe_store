import { useEffect, useState } from "react";
import { fetchProducts } from "../../services/productService";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";

const ProductGrid = ({ searchParams }) => {
    const [data, setData] = useState({ products: [], total: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            const params = Object.fromEntries([...searchParams]);
            const result = await fetchProducts(params);
            setData(result);
            setLoading(false);
        };
        loadProducts();
    }, [searchParams]);

    if (loading) return <div className="text-center py-8">Loading...</div>;

    return (
        <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
                <p>Showing {data.products.length} of {data.total} products</p>
                <select
                    className="border rounded px-2 py-1"
                    onChange={(e) => {
                        searchParams.set("sort", e.target.value);
                        searchParams.set("page", 1);
                    }}
                >
                    <option value="new">Newest</option>
                    <option value="low_price">Price: Low to High</option>
                    <option value="high_price">Price: High to Low</option>
                    <option value="name">Name A-Z</option>
                </select>
            </div>

            {data.products.length === 0 ? (
                <div className="text-center py-8">No products found</div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {data.products.map(p => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                    <Pagination total={data.total} />
                </>
            )}
        </div>
    );
};

export default ProductGrid;
