const isEmptyString = (data: string): boolean =>
  typeof data === "string" && data.trim().length == 0;