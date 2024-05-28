const log = (tag: string, ...args: any[]) => {
  console.log(tag, args);

}

const warn = (tag: string, ...args: any[]) => {
  console.warn(tag, args);
}

const error = (tag: string, ...args: any[]) => {
  console.error(tag, args);
}


export const Logger = {
  log, warn, error
}
