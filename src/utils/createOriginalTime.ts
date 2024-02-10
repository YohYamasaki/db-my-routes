export const createOriginalTime = (str: string | number, delay: string | number): string => {
    const datetime = new Date(str);
    if (typeof delay === "string") delay = Number.parseInt(delay);
    // subtract delay seconds from the updated time
    datetime.setSeconds(datetime.getSeconds() - delay);
    // adjust format and return string
    const time = datetime.toLocaleTimeString("en-GB");
    return time.substring(0, time.length - 3);
};