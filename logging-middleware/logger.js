class CustomLogger {
  constructor() {
    this.logs = [];
  }

  log(type, message) {
    const timestamp = new Date().toISOString();
    this.logs.push({ type, message, timestamp });
  }

  getLogs() {
    return this.logs;
  }
}

const logger = new CustomLogger();
window.__CUSTOM_LOGGER__ = logger;
