export default function getValidationResult(validate, data) {
  let error = { isValid: true, helperText: "" };
  if (validate) {
    const validateResponse = validate(data);
    switch (typeof validateResponse) {
      case "object":
        error = { ...validateResponse };
        break;
      case "boolean":
        error = { isValid: validateResponse, helperText: "" };
        break;
      case "string":
        error = { isValid: false, helperText: validateResponse };
        break;
    }
  }
  return error;
}
