import * as yup from "yup";
import CONSTANTS from "common/constants";

/**
 * Creates validation schema for the invite user form based on user context and role selection
 *
 * @param {Object} loggedInUserObjectContext - Current user context with role information
 * @param {string} roleSelected - Currently selected role in the form
 * @returns {Object} - Yup validation schema object
 */
export const getValidationSchema = (
  loggedInUserObjectContext: any,
  roleSelected: any
) => {
  let validationSchema = yup.object().shape({});

  if (loggedInUserObjectContext !== null) {
    validationSchema = yup.object().shape({
      firstName: yup
        .string()
        .required("User First Name is Required")
        .matches(
          CONSTANTS.REGEX.ATLEAST_ONE_ALPHANUMERIC,
          "User First Name should contain atleast one alpha numeric character"
        )
        .max(255, "Maximum 255 characters allowed"),
      lastName: yup
        .string()
        .required("User Last Name is Required")
        .matches(
          CONSTANTS.REGEX.ATLEAST_ONE_ALPHANUMERIC,
          "User Last Name should contain atleast one alpha numeric character"
        )
        .max(255, "Maximum 255 characters allowed"),
      email: yup
        .string()
        .matches(CONSTANTS.REGEX.EMAIL, "Please enter a valid email address"),
      role: yup.string().required("Role is Required"),
      clientId:
        loggedInUserObjectContext?.roleCode ===
          CONSTANTS.USER_ROLES.SUPER_ADMIN &&
        ["CLIENT_USER", "CLIENT_ADMIN"].includes(roleSelected)
          ? yup.number().required("Client is Required")
          : yup.number().notRequired(),
    });
  }

  return validationSchema;
};

export default getValidationSchema;
