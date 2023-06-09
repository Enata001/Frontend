let console = (function(oldConsole) {
  return {
    formatArgumentOutput: function(arg) {
      let outputArgMessage;
      switch (this.getType(arg)) {
        case "string":
          outputArgMessage = `"${arg}"`;
          break;
        case "object":
          outputArgMessage = `Object ${JSON.stringify(arg)}`;
          break;
        case "array":
          outputArgMessage = `Array ${JSON.stringify(arg)}`;
          break;
        default:
          outputArgMessage = arg;
          break;
      }
      return outputArgMessage;
    },
    getType: function(arg) {
      if (typeof arg === "string") return "string";
      if (typeof arg === "boolean") return "boolean";
      if (typeof arg === "function") return "function";
      if (typeof arg === "number") return "number";
      if (typeof arg === "undefined") return "undefined";
      if (typeof arg === "object" && !Array.isArray(arg)) return "object";
      if (typeof arg === "object" && Array.isArray(arg)) return "array";
    },
    logMultipleArguments: function(arguments) {
      let currentLog = "";
      arguments.forEach((arg) => {
        currentLog += this.formatArgumentOutput(arg) + " ";
      });
      oldConsole.log.apply(oldConsole, arguments);
      consoleMessages.push({
        message: currentLog,
      });

      oldConsole.log(consoleMessages);
    },
    logSingleArgument: function(logItem) {
      oldConsole.log(logItem);
      consoleMessages.push({ message: this.formatArgumentOutput(logItem) });
    },
    log: function(text) {
      let argsArray = Array.from(arguments);
      return argsArray !== 1
        ? this.logMultipleArguments(argsArray)
        : this.logSingleArgument(text);
    },
    info: function(text) {
      oldConsole.info(text);
    },
    warn: function(text) {
      oldConsole.warn(text);
    },
    error: function(err) {
      oldConsole.error(err);
      consoleMessages.push({ message: `${err.name}: ${err.message}` });
    },
  };
})(window.console);
