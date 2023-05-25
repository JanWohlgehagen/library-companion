import http from 'k6/http'
import {sleep} from 'k6'

export const options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse:false,
  stages: [
    { duration: '10m', target: 250}, // Ramp up to 250 - "high load"
    { duration: '30m', target: 250}, // Stay at high load for 30 min
    { duration: '5m', target: 0} // scale down. Recovery stage.
  ],
  /*
  thresholds: {
    http_req_failed: ['rate<0.01'],
  },

   */
};

export default () => {
  let response = http.get("http://localhost:5001/library-companion-1049c/us-central1/api/books");
  sleep(1);
};
