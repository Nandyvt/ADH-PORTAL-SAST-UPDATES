import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type UseClearFiltersOnNavigationProps = {
  basePath: string;
  handleClearAllFilters: () => void;
  clearFilterForUrlsPaths: string | string[];
};

const useClearFiltersOnNavigation = ({
  basePath,
  handleClearAllFilters,
  clearFilterForUrlsPaths,
}: UseClearFiltersOnNavigationProps) => {
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const clearPaths = Array.isArray(clearFilterForUrlsPaths)
      ? clearFilterForUrlsPaths
      : [clearFilterForUrlsPaths];

    // Only clear filters if the current path is one of the designated clear paths
    if (clearPaths.includes(currentPath)) {
      handleClearAllFilters();
    }
  }, [location.pathname, clearFilterForUrlsPaths, handleClearAllFilters]);
};

export default useClearFiltersOnNavigation;
