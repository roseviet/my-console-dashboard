import * as logger from "@lib/logger";
const { exec: shellExec, spawn: shellSpawn } = require("child_process");

export const exec = (cmd) => {
  return new Promise((resolve, reject) => {
    shellExec(cmd, (error, stdout, stderr) => {
      if (error) {
        logger.debug(`error: ${error.message}`);
        reject(error);
      } else if (stderr) {
        logger.error(`stderr: ${stderr}`);
        reject(stderr);
      } else {
        logger.debug(`stdout: ${stdout}`);
        resolve(stdout);
      }
    });
  });
};

export const spawn = ({cmd, args, onData, onStdErr, onError, onClose }) => {
    const execCmd = shellSpawn(cmd, args);

    execCmd.stdout.on("data", (data) => {
      logger.debug(`stdout: ${data}`);
      onData(data);
    });

    execCmd.stderr.on("data", (data) => {
      logger.debug(`stderr: ${data}`);
      onStdErr(data);
    });

    execCmd.on("error", (error) => {
      logger.debug(`error: ${error.message}`);
      onError(error);
    });

    execCmd.on("close", (code) => {
      logger.debug(`child process exited with code ${code}`);
      onClose(code);
    });
};
