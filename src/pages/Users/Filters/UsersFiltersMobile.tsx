import ModalFilters from "components/ModalFilters";
import React from "react";

const UsersFiltersMobile = ({
  filters,
  showModal,
  setShowModal,
  setAppliedFilters,
  appliedFilters,
  searchError,
}: any) => {
  return (
    <div>
      <ModalFilters
        title="Filters - Users"
        modalId="users-filter-modal"
        filters={filters}
        setAppliedFilters={setAppliedFilters}
        setShowModal={setShowModal}
        showModal={showModal}
        appliedFilters={appliedFilters}
      />
    </div>
  );
};

export default UsersFiltersMobile;
