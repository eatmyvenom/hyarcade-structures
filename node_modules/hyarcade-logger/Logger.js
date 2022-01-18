/* eslint-disable no-undef */
const { writeFile } = require("fs-extra");
const path = require("path");
const {
  argv
} = require("process");
const verbose = argv.includes("--verbose") || argv.includes("-v");

/**
 * @returns {string} Formatted time
 */
function daytime () {
  const d = new Date();
  return `${(`0${d.getMonth() + 1}`).slice(-2)}/${(`0${d.getDate()}`).slice(-2)}-${(`0${d.getHours()}`).slice(-2)}:${(`0${d.getMinutes()}`).slice(-2)}:${(`0${d.getSeconds()}`).slice(-2)}:${(`00${d.getMilliseconds()}`).slice(-3)}`;
}

/**
 * @param {string} type
 * @param {*} string
 * @param {string} name
 * @param {string} color
 */
function print (type, string, name, color = "\x1b[0m") {
  for(const s of string?.toString()?.split("\n") ?? "") {
    println(type, s, name, color);
  }

}

/**
 * @param {string} type
 * @param {string} string
 * @param {string} name
 * @param {string} color
 */
function println (type, string, name, color = "\x1b[0m") {
  const str = `[\x1b[36m${daytime().trim()}\x1b[0m] [\x1b[36m${name.trim()}\x1b[0m] [${color}${type}\x1b[0m]${color} ${string}\x1b[0m`;
  console.log(str);

  writeFile(path.join(process.cwd(), "logs", `${name.trim()}-out.log`), `${daytime().trim()} - ${string}\n`, { flag: "a" })
    .then(() => {})
    .catch(console.error);
}

/**
 * @param {string} string
 * @param {string} name
 */
function error (string, name) {
  for(const s of string?.toString()?.split("\n") ?? "") {
    errorln(s, name);
  }
}

/**
 * @param {string} string
 * @param {string} name
 */
function errorln (string, name) {
  const str = `[\x1b[36m${daytime().trim()}\x1b[0m] [\x1b[36m${name.trim()}\x1b[0m] [\x1b[31mERROR\x1b[0m]\x1b[31m ${string}\x1b[0m`;
  console.log(str);

  writeFile(path.join(process.cwd(), "logs", `${name.trim()}-err.log`), `${daytime().trim()} - ${string}\n`, { flag: "a" })
    .then(() => {})
    .catch(console.error);
}

module.exports = class Logger {

  static name;

  /**
   * Log content to stdout or a file
   *
   * @param {string[]} content
   */
  static log (...content) {
    if(Logger.name == undefined) {
      Logger.name = argv[2];
      Logger.name = Logger.name == "bot" ? argv[argv.length - 1] : Logger.name;
      Logger.name = Logger.name == undefined ? "hyarcade" : Logger.name;
    }

    print("LOG", content.join(" "), Logger.name);
  }

    static out = this.log;

    /**
     * Log content to stdout or a file
     *
     * @param {string} content
     */
    static info (...content) {
      if(Logger.name == undefined) {
        Logger.name = argv[2];
        Logger.name = Logger.name == "bot" ? argv[argv.length - 1] : Logger.name;
        Logger.name = Logger.name == undefined ? "hyarcade" : Logger.name;
      }

      print("INFO", content.join(" "), Logger.name, "\x1b[32m");
    }

    /**
     * Log content to stdout or a file
     *
     * @param {string} content
     */
    static warn (...content) {
      if(Logger.name == undefined) {
        Logger.name = argv[2];
        Logger.name = Logger.name == "bot" ? argv[argv.length - 1] : Logger.name;
        Logger.name = Logger.name == undefined ? "hyarcade" : Logger.name;
      }

      print("WARN", content.join(" "), Logger.name, "\x1b[33m");
    }

    /**
     * Log content to stdout or a file
     *
     * @param {string} content
     */
    static debug (...content) {
      if(Logger.name == undefined) {
        Logger.name = argv[2];
        Logger.name = Logger.name == "bot" ? argv[argv.length - 1] : Logger.name;
        Logger.name = Logger.name == undefined ? "hyarcade" : Logger.name;
      }

      print("DEBUG", content.join(" "), Logger.name, "\x1b[95m");
    }

    static dbg = this.debug;

    /**
     * Log content to stdout or a file
     *
     * @param {string} content
     */
    static verbose (...content) {
      if(Logger.name == undefined) {
        Logger.name = argv[2];
        Logger.name = Logger.name == "bot" ? argv[argv.length - 1] : Logger.name;
        Logger.name = Logger.name == undefined ? "hyarcade" : Logger.name;
      }

      if(verbose) {
        print("VERBOSE", content.join(" "), Logger.name, "\x1b[90m");
      }
    }

    /**
     * Log content to stderr or a file
     *
     * @param {string} content
     */
    static error (...content) {
      if(Logger.name == undefined) {
        Logger.name = argv[2];
        Logger.name = Logger.name == "bot" ? argv[argv.length - 1] : Logger.name;
        Logger.name = Logger.name == undefined ? "hyarcade" : Logger.name;
      }

      error(content.join(" "), Logger.name);
    }

    static err = this.error;
};
