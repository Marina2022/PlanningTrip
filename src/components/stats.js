import {AbstractSmartComponent } from "./abstractSmartComponent";

import Chart from "chart.js/auto";

import ChartDataLabels from "chartjs-plugin-datalabels";



const createStats = () => {
  return `
  <section class="statistics">
  <h2>Trip statistics</h2>

  <div class="statistics__item statistics__item--money">
    <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
  </div>

  <div class="statistics__item statistics__item--transport">
    <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
  </div>

  <div class="statistics__item statistics__item--time-spend">
    <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
  </div>
</section>
  `
}

export class Stats extends AbstractSmartComponent {
  constructor(pointsModel) {
    super();
    this._pointsModel = pointsModel;
  }
  getTemplate() {
    return createStats();
  }

  getMoneyPerTypeObject() {
    const resultObj = {};
    const points = this._pointsModel.getAllPoints();
    points.forEach((point) => {
      if (resultObj[point.type]) {
        resultObj[point.type] += point.base_price;
      } else {
        resultObj[point.type] = point.base_price;
      }
    });
    return resultObj;
  }

  render() {
    const moneyCtx = document.querySelector(`.statistics__chart--money`);
    const transportCtx = document.querySelector(
      `.statistics__chart--transport`
    );
    const timeSpendCtx = document.querySelector(`.statistics__chart--time`);

    // Рассчитаем высоту канваса в зависимости от того, сколько данных в него будет передаваться
const BAR_HEIGHT = 55;
moneyCtx.height = BAR_HEIGHT * 4;
transportCtx.height = BAR_HEIGHT * 4;
timeSpendCtx.height = BAR_HEIGHT * 4;
    const moneyChart = new Chart(moneyCtx, {
      plugins: [ChartDataLabels],
      type: `bar`,
      data: {
       labels: Object.keys(this.getMoneyPerTypeObject()),

        datasets: [
          {
            data: Object.values(this.getMoneyPerTypeObject()), 
            backgroundColor: `#ffffff`,
            hoverBackgroundColor: `#ffffff`,
            anchor: `start`,
          },
        ],
      },
      options: {
        indexAxis: "y",
        plugins: {
          datalabels: {
            font: {
              size: 13,
            },
            color: `#000000`,
            anchor: "end",
            align: "start",
            formatter: (val) => `€ ${val}`,
          },
        },
        title: {
          display: true,
          text: `MONEY`,
          fontColor: `#000000`,
          fontSize: 23,
          position: `left`,
        },
        // scales: {
        //   yAxes: [{
        //     ticks: {
        //       fontColor: `#000000`,
        //       padding: 5,
        //       fontSize: 13,
        //     },
        //     gridLines: {
        //       display: false,
        //       drawBorder: false
        //     },
        //     barThickness: 44,
        //   }],
        //   xAxes: [{
        //   ticks: {
        //     display: false,
        //     beginAtZero: true,
        //   },
        //   gridLines: {
        //     display: false,
        //     drawBorder: false
        //   },
        //   minBarLength: 50
        //   }],
        // },
        yAxes: [
          {
            stacked: false,
            scaleLabel: {
              display: true,
              fontColor: "white",
              fontSize: 25,
              labelString: "Faction Points",
            },
            ticks: {
              fontColor: "white",
              fontSize: 20,
              min: 0,
            },
            gridLines: {
              color: "white",
            },
          },
        ],
        xAxes: [
          {
            stacked: false,
            scaleLabel: {
              display: true,
              fontColor: "white",
              fontSize: 25,
              labelString: "Day",
            },
            ticks: {
              fontColor: "white",
              fontSize: 20,
              min: 0,
            },
          },
        ],
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
      },
    });

    const transportChart = new Chart(transportCtx, {
      plugins: [ChartDataLabels],
      type: `bar`,
      data: {
        labels: [`FLY`, `DRIVE`, `RIDE`],
        datasets: [
          {
            data: [4, 2, 1],
            backgroundColor: `#ffffff`,
            hoverBackgroundColor: `#ffffff`,
            anchor: `start`,
          },
        ],
      },
      options: {
        indexAxis: "y",
        plugins: {
          datalabels: {
            font: {
              size: 13,
            },
            color: `#000000`,
            anchor: "end",
            align: "start",
            formatter: (val) => `${val}x`,
          },
        },
        title: {
          display: true,
          text: `TRANSPORT`,
          fontColor: `#000000`,
          fontSize: 23,
          position: `left`,
        },
        scales: {
          // yAxes: [
          //   {
          //     ticks: {
          //       fontColor: `#000000`,
          //       padding: 5,
          //       fontSize: 13,
          //     },
          //     gridLines: {
          //       display: false,
          //       drawBorder: false,
          //     },
          //     barThickness: 44,
          //   },
          // ],
          // xAxes: [
          //   {
          //     ticks: {
          //       display: false,
          //       beginAtZero: true,
          //     },
          //     gridLines: {
          //       display: false,
          //       drawBorder: false,
          //     },
          //     minBarLength: 50,
          //   },
          // ],
        },
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
      },
    });
  }
}



