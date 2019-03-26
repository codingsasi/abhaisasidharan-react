import * as d3 from "d3";
import apiUrl from '../../Config';
import $ from 'jquery';

/*
export const loadAllData = (callback = () => {} ) => {
    const q = d3.queue()
    
    q.defer(d3.tsv, './data.tsv', cast)
     
     q.await((error, data)  =>{
        callback(data);
    })   
}
*/

//デモ用ランダムデータ生成function
const ServerStats = () => {
  var request = new XMLHttpRequest();
  request.open('GET', apiUrl + '/api/server-stats?sort=created&direction=DESC', false);  // `false` makes the request synchronous
  request.send(null);

  if (request.status === 200) {
    var stats = JSON.parse(request.responseText);
  }
  console.log(stats);
  let data = d3
    .range(stats.length)
    .map(i => {
      return { date: ( stats[i].created * 1000 ), value: stats[i].cpu };
    })
    .reverse();

  return () => {
    var request = new XMLHttpRequest();
    request.open('GET', apiUrl + '/api/server-stats?sort=created&direction=DESC&start=0&end=1', false);  // `false` makes the request synchronous
    request.send(null);
    if (request.status === 200) {
      var stats = JSON.parse(request.responseText);
    }
    var temp = new Date().getTime();
    data.push({ date: ( stats[0].created * 1000 ), value: stats[0].cpu });
    data.shift();
    return data;
  };
}

const ss = ServerStats();
console.log(ss);
export const loadCpuStats = (callback = () => {}) => {
  callback(ss());
};