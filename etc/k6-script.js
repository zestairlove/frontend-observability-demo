import http from 'k6/http';
import { sleep } from 'k6';

const endpointList = [
  { url: '/test_io_task', weight: 0.5 },
  { url: '/test_cpu_task', weight: 0.2 },
  { url: '/test_random_sleep', weight: 0.1 },
  { url: '/test_random_status', weight: 0.1 },
  { url: '/test_error', weight: 0.1 }
];

function getRandomEndpoint() {
  const randomNum = Math.random();
  let sum = 0;

  for (const endpoint of endpointList) {
    sum += endpoint.weight;
    if (randomNum <= sum) {
      return endpoint.url;
    }
  }

  return '/test_io_task';
}

export default function () {
  const serverList = ['localhost:3001'];

  serverList.forEach(function (server) {
    const endpoint = getRandomEndpoint();
    http.get('http://' + server + endpoint);
  });

  sleep(0.5);
}
