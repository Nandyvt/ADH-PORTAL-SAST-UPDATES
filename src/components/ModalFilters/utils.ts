export interface IModalFiltersProps {
  title: string;
  modalId: string;
  filters: IFilter[];
  onChangeHandler?: any;
  setAppliedFilters: (value: any) => void;
  clearAll?: boolean;
  setClearAll?: any;
  clearFilter?: any;
  selectedFiltersData?: any;
  setShowModal: any;
  showModal: boolean;
  appliedFilters: any;
  modalSize?: string;
  submitButtonTitle?: string;
  mandatoryFieldText?: string;
}

export interface IFilter {
  type: string;
  filterParams: any;
}

export const generateOptions = (options: any) => {
  return options.map((option: any) => {
    return {
      label: `${option}`,
      value: `${option}`,
    };
  });
};
