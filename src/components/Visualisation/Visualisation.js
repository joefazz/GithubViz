import React, { useEffect, useState } from 'react';
import { VictoryChart, VictoryBar, VictoryTheme, VictoryAxis } from 'victory';
import { baseUrl } from '../../consts';

function Visualisation({ query, transformationFunction, axes }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(baseUrl + query)
      .then((res) => res.json())
      .then((json) => setData(transformationFunction(json)))
      .catch((err) => console.log(err));
  }, [query, transformationFunction]);

  return (
    <VictoryChart theme={VictoryTheme.material}>
      <VictoryAxis
        label={axes.x}
        style={{
          axis: { stroke: '#756f6a' },
          axisLabel: { fontSize: 10, padding: 30 },
          ticks: { stroke: 'grey', size: 5 },
          tickLabels: { fontSize: 12, padding: 5 }
        }}
        tickCount={12}
      />
      <VictoryAxis
        dependentAxis
        label={axes.y}
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
