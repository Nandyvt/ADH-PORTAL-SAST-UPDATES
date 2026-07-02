import React from "react";
import ModalFilters from "components/ModalFilters";

const TransactionalLogsFilterModal: React.FunctionComponent<any> = ({
  filters,
  showModal,
  setShowModal,
  setAppliedFilters,
  appliedFilters,
}) => {
  return (
    <ModalFilters
      title="Filter - Transactional Logs"
      modalId="transactionlogs-filter-modal"
      filters={filters}
      setAppliedFilters={setAppliedFilters}
      setShowModal={setShowModal}
      showModal={showModal}
      appliedFilters={appliedFilters}
    />
  );
};

export default TransactionalLogsFilterModal;
