import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import FilterSidebar from "../components/filters/FilterSidebar";
import ProductGrid from "../components/products/ProductGrid";

function ProductsPage() {
    const [searchParams] = useSearchParams();
    const [sidebar, setSidebar] = useState("left");
    
    const toggleSidebar = () => {
        setSidebar(prev => prev === "left" ? "right" : "left");
    };
    
    return (
        <div className="container mx-auto px-10 py-6 ">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Products</h1>
                <button 
                    onClick={toggleSidebar}
                    className="px-3 py-1 border rounded hover:bg-gray-100"
                >
                    Filter: {sidebar}
                </button>
            </div>
            <div className="flex gap-6">
                {sidebar === "left" && <FilterSidebar />}
                <ProductGrid searchParams={searchParams} />
                {sidebar === "right" && <FilterSidebar />}
            </div>
        </div>
    )
}

export default ProductsPage
