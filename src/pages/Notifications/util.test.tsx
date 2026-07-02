import {
  updateModalContent,
  getStatusAction,
  getMessage,
  notificationTypebasedOnId,
} from "./utils";

// Mock the CONSTANTS object
jest.mock("common/constants", () => ({
  NOTIFICATION_TYPE_ID: {
    EMAIL: "email",
    SMS: "sms",
    HTTP: "http",
  },
}));

describe("updateModalContent", () => {
  it("should return the correct update modal content", () => {
    const action = "Edit";
    const notification = "Notification";
    const result = updateModalContent(action, notification);
    expect(result).toBe(
      `Are you sure you want to edit the configured Notification?`
    );
  });
});

describe("getStatusAction", () => {
  it("should return the correct status action for Edit", () => {
    const status = "Edit";
    const result = getStatusAction(status);
    expect(result).toEqual("Edit");
  });

  it("should return Delete for any other status", () => {
    const status = "OtherStatus";
    const result = getStatusAction(status);
    expect(result).toBe("Delete");
  });
});

describe("getMessage", () => {
  it("should return the correct message for delete action", () => {
    const action = "Delete";
    const result = getMessage(action);
    expect(result).toBe(`You won’t be able to revert this`);
  });

  it("should return an empty string for other actions", () => {
    const action = "OtherAction";
    const result = getMessage(action);
    expect(result).toBe(``);
  });
});

describe("notificationTypebasedOnId", () => {
  it("should return the correct notification type for a given type ID", () => {
    const emailType = notificationTypebasedOnId("email");
    const smsType = notificationTypebasedOnId("sms");
    const httpType = notificationTypebasedOnId("http");
    const unknownType = notificationTypebasedOnId("unknown");

    expect(emailType).toBe("Email");
    expect(smsType).toBe("SMS");
    expect(httpType).toBe("HTTP");
    expect(unknownType).toBe("");
  });
});
