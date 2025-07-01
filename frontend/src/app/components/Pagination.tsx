export default function Pagination({ currentPage }: { currentPage: number }) {
    return (
        <div className="flex justify-center mt-6 items-center gap-2">
            <button className="border px-3 py-1 rounded text-sm" disabled={currentPage === 1}>
                &lt; Prev
            </button>
            <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded">{currentPage}</span>
            <button className="border px-3 py-1 rounded text-sm">Next &gt;</button>
        </div>
    )
}
