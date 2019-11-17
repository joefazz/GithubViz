import React, { useEffect, useState } from 'react';
import { VictoryChart, VictoryBar, VictoryTheme, VictoryAxis } from 'victory';
import { baseUrl } from '../../consts';
import { fromUnixTime, format } from 'date-fns';

function Visualisation({ query }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(baseUrl + query)
      .then((res) => res.json())
      .then((json) => {
        const data = json.map((data) => ({
          x: format(fromUnixTime(data.week), 'ww'),
          y: data.total
        }));
        const sortedData = data.sort((a, b) => {
          var x = a['x'];
          var y = b['x'];
          return x < y ? -1 : x > y ? 1 : 0;
        });
        setData(sortedData);
      })
      .catch((err) => console.log(err));
  }, [query]);

  console.log(data);

  return (
    <VictoryChart theme={VictoryTheme.material}>
      <VictoryAxis
        label="Week"
        style={{
          axis: { stroke: '#756f6a' },
          axisLabel: { fontSize: 10, padding: 30 },
          ticks: { stroke: 'grey', size: 5 },
          tickLabels: { fontSize: 12, padding: 5 }
        }}
        tickCount={12}
      />
      <VictoryAxis dependentAxis
        label="Commits"
        style={{
          axis: { stroke: '#756f6a' },
          axisLabel: { fontSize: 10, padding: 30 },
          ticks: { stroke: 'grey', size: 5 },
          tickLabels: { fontSize: 12, padding: 5 }
        }}
        tickCount={2}
      />
      <VictoryBar style={{ data: { fill: '#c43a31' } }} data={data} />
    </VictoryChart>
  );
}

export default Visualisation;
