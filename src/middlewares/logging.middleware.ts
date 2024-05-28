import { NextFunction, Request, Response } from "express";

const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { hostname, method, path } = req;

  const timestamp = new Date(Date.now()).toISOString();
  console.log(
    "\x1b[37m",
    `[Express] [${timestamp}] <-- ${hostname} ${method} ${path}`,
  );

  res.on("finish", () => {
    const timestamp = new Date(Date.now()).toISOString();
    const { statusCode } = res;
    let color: string = "";

    if (statusCode >= 100 && statusCode < 200) {
      // info
      color = "\x1b[34m";
    } else if (statusCode < 300) {
      // success
      color += "\x1b[32m";
    } else if (statusCode < 400) {
      // redirect
      color += "\x1b[36m";
    } else if (statusCode < 500) {
      // client error
      color += "\x1b[33m";
    } else if (statusCode < 600) {
      // server error
      color += "\x1b[31m";
    } else {
      color += "\x1b[37m";
    }

    console.log(
      color,
      `[Express] [${timestamp}] --> ${hostname} ${method} ${path} ${statusCode}`,
    );
  });

  next();
};

export default loggingMiddleware;
