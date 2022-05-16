import morgan from "morgan";
import * as fs from 'fs';
import path from "path";

export function morganConfig(app) {
  let logStream = fs.createWriteStream(path.join(__dirname, '../logs/logs.log'), {
    flags: 'a'
  })
  app.use(morgan('combined', { stream: logStream }));
}