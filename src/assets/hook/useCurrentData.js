import { useMemo } from "react";

const useCurrentData = (data,currentPage,pageSize) => {

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return data.slice(firstPageIndex, lastPageIndex);
      }, [currentPage,data,pageSize]);

      return [currentTableData]
}

export default useCurrentData

