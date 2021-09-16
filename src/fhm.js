import _ from "lodash";

export default function fhm(columns, rows, cells) {
  const regionNames = _.keys(population);
  const values7 = divideValuesByPopulation(
    sum(cells, 7),
    columns,
    population,
    1e6 / 7
  );
  const width = 800;
  const height = 600;
  const max = 1400;
  const cells7 = addColor(values7, "7").reverse();
  const cellsDiff = addColor(diff(cells, 7), "diff")
    .reverse()
    .filter((cell, i) => i % 7 === 0);

  const cells14 = addColor(
    divideValuesByPopulation(sum(cells, 14), columns, population, 1e5),
    "14"
  ).reverse();

  const latest7 = _.first(cells7);
  const latestDiff = _.first(cellsDiff);
  const latest14 = _.first(cells14);

  return {
    timestamp: cases.heading,
    cases: {
      columns,
      rows: rows.reverse(),
      cells7,
      cells14,
      cellsDiff,
      charts: columns.map((column, columnIndex) => ({
        region: column.toLowerCase(),
        width,
        height,
        max,
        yValues: _.range(100, max, 100),
        points: _.join(
          _.map(_.slice(values7, 132), (a, rowIndex) => [
            (rowIndex * width) / (values7.length - 132),
            height - (a[columnIndex] * height) / max,
          ])
        ),
      })),
      latest: {
        rows: _.sortBy(
          _.map(latest7, (entry, i) => ({
            ...entry,
            entry14: latest14[i],
            entryDiff: latestDiff[i],
            regionName: regionNames[i],
          })),
          ({ value }) => -value
        ),
      },
      latest14,
    },
  };
}

function divideValuesByPopulation(arrays, columns, divisors, factor = 1) {
  return _.map(arrays, (array) =>
    _.map(array, (value, i) => (factor * value) / divisors[columns[i]])
  );
}

function sum(rows, n) {
  return _.map(rows, (row, i) =>
    _.reduce(rows.slice(i >= n ? i + 1 - n : 0, i + 1), (row1, row2) =>
      _.map(_.range(0, _.size(row1)), (i) => row1[i] + row2[i])
    )
  );
}

const population = {
  Totalt_antal_fall: 10350000,
  Blekinge: 159748,
  Dalarna: 287795,
  Gotland: 59636,
  Gävleborg: 287333,
  Halland: 333202,
  Jämtland_Härjedalen: 130697,
  Jönköping: 363351,
  Kalmar: 245415,
  Kronoberg: 201290,
  Norrbotten: 250230,
  Skåne: 1376659,
  Stockholm: 2374550,
  Sörmland: 297169,
  Uppsala: 383044,
  Värmland: 282342,
  Västerbotten: 271621,
  Västernorrland: 245380,
  Västmanland: 275634,
  Västra_Götaland: 1724529,
  Örebro: 304634,
  Östergötland: 465214,
};

function addColor(arrays, table = "14") {
  const colors = {
    14: [
      "#66bfc6",
      0.1,
      "#f5d664",
      20,
      "#f1b73c",
      50,
      "#e79402",
      75,
      "#da6500",
      120,
      "#d23f00",
      200,
      "#b61c00",
      500,
      "#870202",
    ],
    7: [
      "#66bfc6",
      0.1 / 1.4,
      "#f5d664",
      20 / 1.4,
      "#f1b73c",
      50 / 1.4,
      "#e79402",
      75 / 1.4,
      "#da6500",
      120 / 1.4,
      "#d23f00",
      200 / 1.4,
      "#b61c00",
      500 / 1.4,
      "#870202",
    ],
    diff: [
      "#2167ac",
      -50,
      "#428dbb",
      -25,
      "#92c6de",
      -10,
      "#d2e4f0",
      0,
      "#ffefe3",
      10,
      "#fcdbc7",
      25,
      "#f4a482",
      50,
      "#d6614c",
      100,
      "#b2172c",
    ],
  };

  return _.map(arrays, (array) =>
    _.map(array, (value) => ({
      value,
      bgcolor: bgcolor(value, colors[table]),
    }))
  );

  function bgcolor(value, table) {
    for (let i = 0; i < table.length; i += 2)
      if (value < table[i + 1]) return table[i];
    if (_.isFinite(value)) return _.last(table);
  }
}

function diff(rows, n) {
  return _.map(rows, (row, i) => {
    const prevAndCurr = rows.slice(i >= n * 2 ? i + 1 - n * 2 : 0, i + 1);
    const [prev, curr] = _.chunk(prevAndCurr, prevAndCurr.length / 2);
    const range = _.range(0, _.size(prev?.[0]));

    return _.map(range, percentChange);

    function percentChange(i) {
      return (
        (_.reduce(curr, sumAllColumns)[i] / _.reduce(prev, sumAllColumns)[i] -
          1) *
        100
      );
    }

    function sumAllColumns(row1, row2) {
      return _.map(range, (i) => row1[i] + row2[i]);
    }
  });
}

function cases({ Sheets }) {
  const sheet = Sheets?.["Antal per dag region"];
  if (!sheet) return {};

  const entries = Object.entries(sheet);

  const rows = _.groupBy(
    _.reject(entries, ([k]) => _.startsWith(k, "!")),
    ([k]) => k.substr(1)
  );

  return {
    columns: _.map(
      _.filter(entries, ([cell]) => /^[^A]1$/.test(cell)),
      ([, value]) => value.v
    ),
    rows: _.map(
      _.filter(
        _.filter(entries, ([cell]) => /^A\d+$/.test(cell)),
        ([cell]) => cell !== "A1"
      ),
      ([, value]) => iso(value.w)
    ),
    cells: _.tail(
      _.map(rows, (row) => _.map(_.tail(row), ([, value]) => value.v))
    ),
  };
}
