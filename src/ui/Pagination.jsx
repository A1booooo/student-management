export default function Pagination({ pageCount, currentPage, setCurrentPage }) {
  return (
    <div className="join flex justify-center items-center mt-10">
      {new Array(pageCount).fill(1).map((_, i) => (
        <button
          className={`join-item btn btn-md ${i + 1 === currentPage ? 'btn-active' : ''}`}
          key={i + 1}
          onClick={() => setCurrentPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
