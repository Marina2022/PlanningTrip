const createTripMain = () => {
  return `  <section class="trip-main__trip-info  trip-info">            
          </section>`;
};

const createTripMainCost = () => {
  return ` <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
           </p>`;
};

const createTripMainInfo = () => {
  return `<div class="trip-info__main">
              <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

              <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
            </div>`;
};
export {createTripMain, createTripMainCost, createTripMainInfo};
