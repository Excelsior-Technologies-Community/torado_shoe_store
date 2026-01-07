import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { productAPI } from "../../utils/api";

const FilterSidebar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filters, setFilters] = useState({
        categories: [],
        brands: [],
        sizes: [],
        colors: [],
        tags: []
    });

    useEffect(() => {
        const loadFilters = async () => {
            try {
                const response = await productAPI.getFilterOptions();
                setFilters(response.data);
            } catch (error) {
                console.error('Error loading filters:', error);
            }
        };
        loadFilters();
    }, []);

    const updateParam = (key, value) => {
        if (value) {
            searchParams.set(key, value);
        } else {
            searchParams.delete(key);
        }
        searchParams.set("page", 1);
        setSearchParams(searchParams);
    };

    const clearFilters = () => {
        setSearchParams({});
    };

    return (
        <aside className="w-64 bg-white p-4 rounded border">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Filters</h3>
                <button 
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:underline"
                >
                    Clear All
                </button>
            </div>

            {/* Search */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full p-2 border rounded"
                    value={searchParams.get('search') || ''}
                    onChange={(e) => updateParam('search', e.target.value || null)}
                />
            </div>

            {/* Category */}
            <div className="mb-4">
                <h4 className="font-medium mb-2">Category</h4>
                {filters.categories.map(cat => (
                    <button
                        key={cat.slug}
                        className={`block w-full text-left p-1 hover:bg-gray-100 ${
                            searchParams.get('category') === cat.slug ? 'text-blue-600' : ''
                        }`}
                        onClick={() => updateParam('category', searchParams.get('category') === cat.slug ? null : cat.slug)}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* Brand */}
            <div className="mb-4">
                <h4 className="font-medium mb-2">Brand</h4>
                {filters.brands.map(brand => (
                    <button
                        key={brand.slug}
                        className={`block w-full text-left p-1 hover:bg-gray-100 ${
                            searchParams.get('brand') === brand.slug ? 'text-blue-600' : ''
                        }`}
                        onClick={() => updateParam('brand', searchParams.get('brand') === brand.slug ? null : brand.slug)}
                    >
                        {brand.name}
                    </button>
                ))}
            </div>

            {/* Size */}
            <div className="mb-4">
                <h4 className="font-medium mb-2">Size</h4>
                <div className="flex flex-wrap gap-1">
                    {filters.sizes.map(size => (
                        <button
                            key={size}
                            className={`px-2 py-1 border rounded text-sm ${
                                searchParams.get('size') === size ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
                            }`}
                            onClick={() => updateParam('size', searchParams.get('size') === size ? null : size)}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Color */}
            <div className="mb-4">
                <h4 className="font-medium mb-2">Color</h4>
                <div className="flex flex-wrap gap-1">
                    {filters.colors.map(color => (
                        <button
                            key={color}
                            className={`px-2 py-1 border rounded text-sm ${
                                searchParams.get('color') === color ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
                            }`}
                            onClick={() => updateParam('color', searchParams.get('color') === color ? null : color)}
                        >
                            {color}
                        </button>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div className="mb-4">
                <h4 className="font-medium mb-2">Price</h4>
                <div className="flex gap-2">
                    <input
                        type="number"
                        placeholder="Min"
                        className="w-full p-1 border rounded text-sm"
                        value={searchParams.get('minPrice') || ''}
                        onChange={(e) => updateParam('minPrice', e.target.value || null)}
                    />
                    <input
                        type="number"
                        placeholder="Max"
                        className="w-full p-1 border rounded text-sm"
                        value={searchParams.get('maxPrice') || ''}
                        onChange={(e) => updateParam('maxPrice', e.target.value || null)}
                    />
                </div>
            </div>

            {/* In Stock */}
            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={searchParams.get('inStock') === 'true'}
                    onChange={(e) => updateParam('inStock', e.target.checked ? 'true' : null)}
                />
                In Stock Only
            </label>
        </aside>
    );
};

export default FilterSidebar;