import { useSearchParams } from "react-router-dom";

const Pagination = ({ total }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 12;
    const pages = Math.ceil(total / limit);

    if (pages <= 1) return null;

    return (
        <div className="flex justify-center gap-2 mt-6">
            {page > 1 && (
                <button
                    onClick={() => {
                        searchParams.set("page", page - 1);
                        setSearchParams(searchParams);
                    }}
                    className="px-3 py-1 border rounded hover:bg-gray-100"
                >
                    Previous
                </button>
            )}
            
            {[...Array(pages)].map((_, i) => (
                <button
                    key={i}
                    className={`px-3 py-1 border rounded ${
                        page === i + 1 ? "bg-blue-600 text-white" : "hover:bg-gray-100"
                    }`}
                    onClick={() => {
                        searchParams.set("page", i + 1);
                        setSearchParams(searchParams);
                    }}
                >
                    {i + 1}
                </button>
            ))}
            
            {page < pages && (
                <button
                    onClick={() => {
                        searchParams.set("page", page + 1);
                        setSearchParams(searchParams);
                    }}
                    className="px-3 py-1 border rounded hover:bg-gray-100"
                >
                    Next
                </button>
            )}
        </div>
    );
};

export default Pagination;
