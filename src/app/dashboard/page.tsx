"use client";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import Pagination from "@/components/Pagination";
import PurchaseModal from "@/components/PurchaseModal";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getPurchaseMaterials } from "@/lib/store/API/meterialsApi";
import DataTable from "@/components/TableComponent";

const Dashboard = () => {
  // Extracting material data, loading state, and error state from the Redux store
  const { materialList, loading, error } = useAppSelector(
    (state) => state.material
  );
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useAppDispatch();

  // Fetch materials data on component mount
  useEffect(() => {
    dispatch(getPurchaseMaterials({ page: 1 }));
  }, [dispatch]);

  // Handle page click for pagination
  const handlePageClick = (data: any) => {
    setCurrentPage(data.selected);
    dispatch(getPurchaseMaterials({ page: data.selected + 1 }));
    window.scrollTo({
      top: 180,
      behavior: "smooth",
    });
  };

  const columns = [
    { header: "Items", accessor: "line_item_name" },
    { header: "Store", accessor: "store" },
    { header: "Runner's Name", accessor: "runners_name" },
    { header: "Amount", accessor: "amount", isCurrency: true },
    { header: "Card No.", accessor: "card_number" },
    {
      header: "Transaction Date",
      accessor: "transaction_date",
      dateFormat: true,
    },
  ];

  return (
    <aside className="">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="m-3">
          <PurchaseModal />

          {/* Table Section */}
          {materialList?.material_purchase_list?.data && (
            <DataTable
              columns={columns}
              data={materialList?.material_purchase_list?.data}
            />
          )}
          {/* Pagination Section */}
          <div className="mt-8 flex justify-end">
            <Pagination
              pageCount={
                materialList?.material_purchase_list?.last_page &&
                materialList?.material_purchase_list?.last_page
              }
              handlePageClick={handlePageClick}
              pageRange={2}
              currentPage={currentPage}
            />
          </div>
          {/* Display error message from API */}
          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
              <p>{error}</p>
            </div>
          )}
        </div>
      )}
    </aside>
  );
};

export default Dashboard;
