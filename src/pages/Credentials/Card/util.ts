interface ICardProps {
  isActive: any;
  id: number;
  name: string;
  code: string;
  secret: string;
  clientName: string;
  channel: string;
}
interface ICredentialsCards {
  credentials: ICardProps[];
  loading: boolean;
  error: boolean;
  hasMore: boolean;
  setPageNumber: (callback: (prevPageNumber: number) => number) => void;
  setToggleStatus: (value: boolean) => void;
  toggleStatus: boolean;
  toggleModal: boolean;
  setToggleModal: (value: boolean) => void;
  fetchEditPermissionCred: (credentialId: any) => void;
  setCredentialName: (value: string) => void;
  setToggleRolePermissionModal: (value: boolean) => void;
}

// export interfaces
export type { ICardProps, ICredentialsCards };
