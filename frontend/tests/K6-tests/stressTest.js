import http from 'k6/http'
import {sleep} from 'k6'

export const options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse:false,
  stages: [
    { duration: '1m', target: 40}, // Ramp up to 40 - "high load"
    { duration: '10m', target: 40}, // Stay at high load for 30 min
    { duration: '1m', target: 0} // scale down. Recovery stage.
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
  },
};

export default () => {
  let response = http.get("http://localhost:5001/library-companion-1049c/us-central1/api/books");
  console.log(response)
  sleep(1);
};
