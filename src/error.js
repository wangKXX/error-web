import Vue from "vue";
import ErrorStackParser from "error-stack-parser";

const ERROR_TYPE = {
  resourceError: "RESOURCE_ERROR",
  scriptError: "SCRIPT_ERROR",
  vueError: "VUE_ERROR",
};

Vue.config.errorHandler = (error) => {
  const stack = ErrorStackParser.parse(error);
  sendToErrorService({
    type: ERROR_TYPE.vueError,
    stack,
    message: error.message,
  });
  console.log(stack);
};

window.addEventListener(
  "error",
  (args) => {
    if (isLoadResourceError(args)) {
      const errorUrl = formatErrorMessage(args);
      sendToErrorService({
        type: ERROR_TYPE.resourceError,
        url: errorUrl,
        message: "resource load error",
      });
      return true;
    }
    const { stack, message } = formatError(args);
    const error = new Error(message);
    error.stack = stack;
    const parseStack = ErrorStackParser.parse(error);
    sendToErrorService({
      type: ERROR_TYPE.scriptError,
      stack: parseStack,
      message,
    });
    return true;
  },
  true
);

window.addEventListener("unhandledrejection", (e) => {
  throw e.reason;
});

function formatError({ error: { stack }, message }) {
  return { stack, message };
}

function isLoadResourceError(errorObject) {
  if (errorObject.target || errorObject.srcElement) return true;
  return false;
}

function formatErrorMessage({ target }) {
  return target.src || target.href;
}

function sendToErrorService(errorJson) {
  const image = new Image();
  image.src = `http://localhost:3000/error?${jsonObjectTOBase64(errorJson)}`;
}

function jsonObjectTOBase64(errorJson) {
  return `error=${window.btoa(JSON.stringify(errorJson))}`;
}
