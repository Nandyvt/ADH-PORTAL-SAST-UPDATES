interface ICredentialsFiltersProps {
  setSelectedClients: (value: string[]) => void;
  setChannelName: (value: string) => void;
  setStatus: (value: string) => void;
  status: string;
  clients: any;
  clearAllFilters: boolean;
  clientName: string;
  channelName?: string; // Optional if it can be undefined
}

const statusFilterOptions = [
  {
    label: "Active",
    value: "ACTIVE",
  },
  {
    label: "Inactive",
    value: "INACTIVE",
  },
];

const channelFilterOptions = [
  {
    label: "API",
    value: "API",
  },
  {
    label: "NATS",
    value: "NATS",
  },
];

export { statusFilterOptions, channelFilterOptions };

export type { ICredentialsFiltersProps };
