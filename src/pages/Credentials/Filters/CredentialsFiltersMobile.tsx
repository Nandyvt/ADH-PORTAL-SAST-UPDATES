import ModalFilters from "components/ModalFilters";
import React from "react";

const CredentialsFiltersMobile = ({
  showModal,
  setShowModal,
  setAppliedFilters,
  appliedFilters,
  filters = [],
}: any) => {
  return (
    <ModalFilters
      modalId="credentials-filter-modal"
      title="Filters - Credentials"
      filters={filters}
      onChangeHandler={undefined}
      clearAll={false}
      setClearAll={undefined}
      clearFilter={undefined}
      selectedFiltersData={undefined}
      showModal={showModal}
      setShowModal={setShowModal}
      setAppliedFilters={setAppliedFilters}
      appliedFilters={appliedFilters}
    />
  );
};

export default CredentialsFiltersMobile;
