const UtTime = {
  convertUTCToLocal(utcDateString: string): string {
    const utcDate = new Date(utcDateString);
    const localDateString = utcDate.toLocaleString();
    //console.log(`convertUTCToLocal ${utcDateString} -> ${localDateString}`);
    return localDateString;
  }, 
};
export default UtTime;