export const subString = (string, byteLen: number = 14, suffix = '...') => {
  let count = 0;
  let index = 0;
  for (let i = 0, l = string?.length; i < l; i++) {
    count += string.charCodeAt(i) < 128 ? 1 : 2;
    if (count < byteLen + 2) {
      index = i;
    }
  }
  return !count || count <= byteLen ? string : string?.slice?.(0, index) + suffix;
};

export const parsePie = pie => (pie === null || isNaN(pie) ? '--' : pie + '%');

export const parsePercent = percent =>
  percent === null ? '--' : Number((+percent * 100.0).toFixed(2)) + '%';

const numberFormat = Intl.NumberFormat().format;

export const parseNumberView = v => {
  if (v === null || v === undefined) return '--';
  if (Number(v) > 100000) {
    return `${numberFormat(Number((+v / 10000.0).toFixed(2)))} 万`;
  }
  return numberFormat(Number((+v).toFixed(2)));
};
