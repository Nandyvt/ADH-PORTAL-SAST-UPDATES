export interface IStream {
  ID: number;
  Name: string;
  created_at: string;
  updated_at: string;
  ConsumerId: number;
  consumer_name?: string;
  consumer_code?: string;
  Description: string;
  Subject: string;
  stream_config: {
    name: string;
    description: string;
    subjects: string[];
    retention: string;
    max_consumers: number;
    max_msgs: number;
    max_bytes: number;
    discard: string;
    max_age: number;
    max_msgs_per_subject: number;
    storage: string;
    num_replicas: number;
    duplicate_window: number;
    allow_direct: boolean;
    mirror_direct: boolean;
  };
}

export interface IStreamCreateRequest {
  clientCode: string;
  description?: string;
  name: string;
}

export interface IStreamCreateRequestAPI {
  clientCode: string;
  description?: string;
  name?: string;
  streamConfig?: {
    discard: string;
    retention: string;
    maxAge?: string;
  };
}

export interface ICredentialCreateAPI {
  username: string;
  password: string;
  clientCode: string;
  publishStreams: {
    list: string[];
  };
  subscribeStreams: {
    list: string[];
  };
}

export interface IPagination {
  isFirst?: number;
  isLast?: number;
  pageNumber?: number;
  pageOffset?: number;
  pageSize?: number;
  totalCount?: number;
  totalPages?: number;
}

export interface IStreamListRequest {
  isFirst?: number;
  isLast?: number;
  pageNumber?: number;
  pageOffset?: number;
  pageSize?: number;
  totalCount?: number;
  totalPages?: number;
  clientCode?: string;
  search?: string;
  streamName?: string;
}

export interface IStreamListResponse {
  _pagination: IPagination | null;

  streams: IStream[] | null;
}

export interface IEntitiesListResponse {
  _pagination: IPagination | null;
  data: {
    entities: IEntity[] | null;
  };
  requestId: string;
  status: number;
}

export interface IEntitiesListRequest {
  _pagination: IPagination | null;
}

export interface IEntity {
  id: string;
  name: string;
  code: string;
  type: string;
  json_schema: any;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface IConsumerCreateRequestAPI {
  clientCode: string;
  streamId: number;
  type: string;
  subscriptions: {
    entity: string;
    source: string;
  }[];
  description: string;
  consumerConfig: {
    maxAckPending: number;
    name: string;
  };
}

export interface IBasicDetailsState {
  clientCode?: { label: string; value: string };
  streamId?: { label: string; value: string };
  type?: { label: string; value: string };
  subscriptions?: {
    entity?: string;
    source?: string;
  }[];
  description?: string;
  consumerConfig?: {
    maxAckPending?: number;
    name?: string;
  };
  selectedSubscriptionCount?: number;
  errorObj: any;
}

export interface CheckedItems {
  [key: string]: boolean;
}

export interface DropdownItemProps {
  label: string;
  children?: React.ReactNode;
  isChecked: boolean;
  onToggle: (key: string, checked: boolean) => void;
  value: string;
  hasChildren: boolean;
  checkedItems: CheckedItems;
  isOpen: boolean;
  onOpen: (key: string) => void;
}

/* Interface for consumer details - start */
// Interface for the NATS Consumer Configuration
interface NatsConsumerConfiguration {
  id: number;
  nats_stream_id: number;
  nats_consumer_id: number;
  type: string;
  consumer_config: ConsumerConfig;
  subscriptions: Subscription[];
}

// Interface for the Consumer Config
interface ConsumerConfig {
  durable_name: string;
  name: string;
  description: string;
  deliver_policy: string;
  ack_policy: string;
  ack_wait: number;
  max_deliver: number;
  filter_subjects: string[];
  replay_policy: string;
  max_waiting: number;
  max_ack_pending: number;
  num_replicas: number;
}

// Interface for Subscriptions
interface Subscription {
  source: string;
  entity: string;
}

// Interface for the main NatsConsumer response
export interface NatsConsumerDetails {
  id: number;
  name: string;
  description: string;
  clientCode: string;
  clientName: string;
  streamClientCode: string;
  natsConsumerConfiguration: NatsConsumerConfiguration;
  stream: string;
  createdAt: string;
  updatedAt: string;
}

/* Interface for consumer details - end */

/* Interface for entity creation */
interface JsonSchema {
  type?: string;
  title?: string;
  $schema?: string;
  required?: string[];
  properties?: {
    [key: string]: {
      type: string;
    };
  };
}

export interface IEntityCreateRequestAPI {
  json_schema: JsonSchema;
  name: string;
  sources: string[];
}
