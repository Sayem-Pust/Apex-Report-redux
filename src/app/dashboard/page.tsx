"use client";
import { useEffect } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import Pagination from "@/components/Pagination";
import PurchaseModal from "@/components/PurchaseModal";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getPurchaseMaterials } from "@/lib/store/API/meterialsApi";

const Dashboard = () => {
  // Extracting material data, loading state, and error state from the Redux store
  const { materialList, loading, error } = useAppSelector(
    (state) => state.material
  );
  const dispatch = useAppDispatch();

  // Fetch materials data on component mount
  useEffect(() => {
    dispatch(getPurchaseMaterials({ page: 1 }));
  }, [dispatch]);

  // Handle page click for pagination
  const handlePageClick = (data: any) => {
    dispatch(getPurchaseMaterials({ page: data.selected + 1 }));
    window.scrollTo({
      top: 180,
      behavior: "smooth",
    });
  };

  return (
    <aside className="">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="m-3">
          <PurchaseModal />

          {/* Table Section */}
          <div className="overflow-x-scroll">
            <table className="table-auto  w-full border-separate border-spacing-1 border  custom-table-data my-2">
              <thead className="text-center">
                <tr className="bg-[#2563EB99] bg-opacity-[60%] text-white ">
                  <th className="font-[600] text-[12px] px-2 py-3 uppercase">
                    Items
                  </th>
                  <th className="font-[600] text-[12px] px-2 py-3 uppercase">
                    Store
                  </th>
                  <th className="font-[600] text-[12px] px-2 py-3 ">
                    Runner&apos;s Name
                  </th>
                  <th className="font-[600] text-[12px] px-2 py-3 uppercase">
                    Amount
                  </th>
                  <th className="font-[600] text-[12px] px-2 py-3 uppercase">
                    Card No.
                  </th>
                  <th className="font-[600] text-[12px] px-2 py-3 uppercase">
                    {" "}
                    Transaction Date
                  </th>
                </tr>
              </thead>
              <tbody className="text-center">
                {materialList?.material_purchase_list?.data?.map(
                  (item, index) => (
                    <tr
                      key={item?.id}
                      className={
                        index % 2 === 0 ? "bg-white" : "bg-[#2563EB1A]"
                      }
                    >
                      <td className="custom-table-data px-2 py-3">
                        {item?.line_item_name}
                      </td>
                      <td className="custom-table-data px-2 py-3 ">
                        {item?.store}
                      </td>
                      <td className="custom-table-data px-2 py-3">
                        {item?.runners_name}
                      </td>
                      <td className="custom-table-data px-2 py-3">
                        ${item?.amount}
                      </td>
                      <td className="custom-table-data px-2 py-3">
                        {item?.card_number}
                      </td>
                      <td className="custom-table-data px-2 py-3">
                        {item?.transaction_date &&
                          (() => {
                            const date = new Date(item?.transaction_date);
                            const day = date
                              .getDate()
                              .toString()
                              .padStart(2, "0");
                            const month = date.toLocaleString("en-US", {
                              month: "short",
                            });
                            const year = date.getFullYear();
                            return `${day} ${month}, ${year}`;
                          })()}
                      </td>
                      {/* <td className="custom-table-data px-2 py-3">01 Aug, 2024</td> */}
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination Section */}
          <div className="mt-8 flex justify-end">
            <Pagination
              pageCount={
                materialList?.material_purchase_list?.last_page &&
                materialList?.material_purchase_list?.last_page
              }
              handlePageClick={handlePageClick}
              pageRange={2}
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
