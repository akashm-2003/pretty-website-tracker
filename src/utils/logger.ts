function print(logFn: typeof console.log, style: string, ...args: any[]) {
  if (typeof args[0] === 'string') {
    const newArgs = [...args];
    logFn(
      `%cPretty Website Tracker%c${new Date().toLocaleTimeString()}%c ${newArgs.shift()}`,
      style,
      'background-color: #eaf1fb; padding: 2px 4px; border-radius: 3px',
      '',
      ...newArgs,
    );
  } else {
    logFn('%cPretty Website Tracker', style, ...args);
  }
}

export function log(...args: any[]) {
  if (__DEV__)
    print(
      console.log,
      'color: #fbf9ef; background-color: #1e8e3e; padding: 2px 4px; border-radius: 3px; font-weight: bold',
      ...args,
    );
}

export const logger = {
  log,
};
