import http from 'k6/http';
import {sleep} from 'k6';

export const options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse:false,
  stages: [
    { duration: '1m', target: 5},
    { duration: '3m', target: 5}, //5min
    { duration: '1m', target: 0}
  ],
  thresholds: {
    http_req_duration: ['p(95)<200'],
  },
};

export default () => {
  let response = http.get("http://localhost:5001/library-companion-1049c/us-central1/api/books");
  sleep(1);
};
