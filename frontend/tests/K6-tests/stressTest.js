import http from 'k6/http'
import {sleep} from 'k6'

export const options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse:false,
  stages: [
    { duration: '2s', target: 10}, // below normal load
    { duration: '5s', target: 10},
    { duration: '2s', target: 20}, // normal load
    { duration: '5s', target: 20},
    { duration: '2s', target: 30}, // around the breaking point
    { duration: '5s', target: 30},
    { duration: '2s', target: 40}, // beyond the breaking point
    { duration: '5s', target: 40},
    { duration: '10s', target: 0} // scale down. Recovery stage.
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
  },
};

export default () => {
  let response = http.get("http://127.0.0.1:5001/library-companion-1049c/us-central1/api/books");
  sleep(1);
};
