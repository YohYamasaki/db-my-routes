export const parseDatetime = (str: string | number): string => {
    const datetime = new Date(str);
    const time = datetime.toLocaleTimeString("en-GB");
    return time.substring(0, time.length - 3);
}