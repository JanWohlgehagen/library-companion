import http from 'k6/http';
import {sleep} from 'k6';

export const options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse:false,
  stages: [
    { duration: '1m', target: 10},
    { duration: '2m', target: 10},
    { duration: '1m', target: 0}
  ],
  thresholds: {
    http_req_duration: ['p(95)<200'],
  },
};

export default () => {
  let response = http.get("localhost:8100/library-companion-1049c/us-central1/api/books");
  sleep(1);
};
