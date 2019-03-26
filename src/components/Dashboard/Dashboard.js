import React, { Component } from 'react';
import apiUrl from '../../Config';
import './Dashboard.scss';
import { loadAllData, loadCpuStats } from "../ChartComponent/DataHandling";
import LineChart from "../LineChart/LineChart";

export default class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      data: null,
      body_width: document.body.clientWidth
    };

    window.addEventListener("resize", this.resize().bind(this));
  }

  componentWillMount() {
    this.load();
  }

  resize() {
    let t;

    return event => {
      if (t !== false) {
        clearTimeout(t);
      }
      t = setTimeout(() => {
        const state = Object.assign(this.state, {
          body_width: document.body.clientWidth
        });
        this.setState(state);
      }, 100);
    };
  }

  load() {
    loadCpuStats(this.loaded.bind(this));
    setTimeout(() => {
      this.load();
    }, 1000);
  }

  loaded(data) {
    this.setState({ data: data });
  }

  render() {
    console.log(this.state.data);
    return (
      <div>
        {this.state.data ? (
          <LineChart
            className="LineChartComponet"
            data={this.state.data}
            width={this.state.body_width}
            height={500}
            xFn={d => d.date}
            yFn={d => d.value}
            yDomain={[0, 100]}
            margin={{ top: 20, left: 40, bottom: 20, right: 20 }}
          />
        ) : (
          <p>Not found Data.</p>
        )}
      </div>
    );
  }
}