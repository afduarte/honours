import axios from 'axios';

export const api = axios.create({
  baseURL: '/api', // api base_url
  timeout: 60000, // request timeout
});

export const ls = {
  getItem: (key) => {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (_) {
      return null;
    }
  },
  getItemOrElse: (key, defaultVal) => {
    try {
      const stored = localStorage.getItem(key);
      if (stored === null) {
        throw new Error();
      }
      return JSON.parse(stored);
    } catch (_) {
      return defaultVal;
    }
  },
  setItem: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  removeItem: key => localStorage.removeItem(key),
};

// request interceptor
api.interceptors.request.use(
  (config) => {
    // Get token from local storage
    const token = ls.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // eslint-disable-line no-param-reassign
    }

    return config;
  },
  (error) => {
    // Do something with request error
    console.log('REQUEST ERROR:', error); // for debug
    Promise.reject(error);
  },
);

export const timer = (time, ...args) => new Promise((resolve) => {
  setTimeout(inner => resolve(inner), time, args);
});

/**
* Read up to and including |maxlines| lines from |file|.
*
* @param {Blob} file - The file to be read.
* @param {integer} maxlines - The maximum number of lines to read.
* @param {function(string)} forEachLine - Called for each line.
* @param {function(error)} onComplete - Called when the end of the file
*     is reached or when |maxlines| lines have been read.
*/
export function readSomeLines(file, maxlines, forEachLine, onComplete) {
  const CHUNK_SIZE = 50000; // 50kb, arbitrarily chosen.
  const decoder = new TextDecoder();
  let offset = 0;
  let linecount = 0;
  let results = '';
  const fr = new FileReader();
  function seek() {
    if (linecount === maxlines) {
      // We found enough lines.
      onComplete(); // Done.
      return;
    }
    if (offset !== 0 && offset >= file.size) {
      // We did not find all lines, but there are no more lines.
      forEachLine(results); // This is from lines.pop(), before.
      onComplete(); // Done
      return;
    }
    const slice = file.slice(offset, offset + CHUNK_SIZE);
    fr.readAsArrayBuffer(slice);
  }
  fr.onload = function () { // eslint-disable-line func-names
    // Use stream:true in case we cut the file
    // in the middle of a multi-byte character
    results += decoder.decode(fr.result, { stream: true });
    const lines = results.split('\n');
    results = lines.pop(); // In case the line did not end yet.
    linecount += lines.length;

    if (linecount > maxlines) {
      // Read too many lines? Truncate the results.
      lines.length -= linecount - maxlines;
      linecount = maxlines;
    }

    for (let i = 0; i < lines.length; i += 1) {
      forEachLine(`${lines[i]}\n`);
    }
    offset += CHUNK_SIZE;
    seek();
  };
  fr.onerror = function () { // eslint-disable-line func-names
    onComplete(fr.error);
  };
  seek();
}

export const transformers = {
  csv: lines => lines.map(l => l.split(',').map(f => f.replace(/"/g, ''))),
  tsv: lines => lines.map(l => l.split('\t').map(f => f.replace(/"/g, ''))),
  json: lines => lines.map(l => Object.values(JSON.parse(l))),
};

export default {
  api, ls, readSomeLines, transformers,
};
