import {  DateParsableStr } from "@/types";

export function convertToDateTime(str: DateParsableStr ) {
    const d = new Date(str);
    const date = d.toLocaleDateString('en-GB');
    const time = getHours(str);
    
    return  { date: `${date}`, time: `${time}`}
  }

 export function getHours(dateStr: DateParsableStr) {
    const _d = new Date(dateStr);
    const _min = _d.getUTCMinutes();
    return _d.getUTCHours() + ":" + (_min < 10 ? `0${_min}` : _min);
  }

export function calculateEndTime(dateStr: DateParsableStr, minutes: number) {
    const _d = new Date(dateStr);
    _d.setMinutes(_d.getUTCMinutes()+minutes);
    const _min = _d.getUTCMinutes();

    return _d.getUTCHours() + ":" + (_min < 10 ? `0${_min}` : _min);
}