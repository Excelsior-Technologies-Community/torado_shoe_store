import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import FilterSidebar from "../components/filters/FilterSidebar";
import ProductGrid from "../components/products/ProductGrid";

function ProductsPage() {
    const [searchParams] = useSearchParams();
    const [sidebar, setSidebar] = useState("left");

    useEffect(() => {
        const layoutParam = searchParams.get('layout') || searchParams.get('sidebar');
        if (['left', 'right', 'grid', 'none'].includes(layoutParam)) {
            setSidebar(layoutParam);
        }
    }, [searchParams]);

    const toggleSidebar = () => {
        setSidebar(prev => {
            const layouts = ['left', 'right', 'grid', 'none'];
            const currentIndex = layouts.indexOf(prev);
            return layouts[(currentIndex + 1) % layouts.length];
        });
    };

    return (
        <div className="container mx-auto px-10 py-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Products</h1>
                <button
                    onClick={toggleSidebar}
                    className="px-3 py-1 border rounded hover:bg-gray-100"
                >
                    Layout: {sidebar}
                </button>
            </div>
            <div className={`flex gap-6 ${sidebar === 'grid' ? 'flex-col' :
                    sidebar === 'none' ? 'justify-center' : ''
                }`}>
                {sidebar === "left" && <FilterSidebar />}
                <ProductGrid searchParams={searchParams} />
                {sidebar === "right" && <FilterSidebar />}
            </div>
        </div>
    )
}

export default ProductsPage
