import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from 'highcharts/modules/map';
import { cloneDeep } from 'lodash';

// Load Highcharts modules
highchartsMap(Highcharts);

const initOptions = {
  chart: {
    height: '500',
  },
  title: {
    text: null,
  },
  mapNavigation: {
    enabled: true,
  },
  colorAxis: {
    min: 0,
    stops: [
      [0.2, '#FFC4AA'],
      [0.4, '#FF8A66'],
      [0.6, '#FF392B'],
      [0.8, '#B71525'],
      [1, '	#7A0826'],
    ],
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'bottom',
  },
  series: [
    {
      name: 'Dân số',
      joinBy: ['hc-key', 'key'],
    },
  ],
};

function HighMap({mapData}) {
    const [options, setOptions] = useState({});
    const [mapLoaded, setMapLoaded] = useState(false);

    const chartRef = useRef(null);

    useEffect(() => {
        if (mapData && Object.keys(mapData).length) {
          console.log({ mapData });
          const fakeData = mapData.features.map((feature, index) => ({
            key: feature.properties['hc-key'],
            value: index,
          }));
    
          setOptions(() => ({
            ...initOptions,
            title: {
              text: mapData.title,
            },
            series: [
              { ...initOptions.series[0], mapData: mapData, data: fakeData },
            ],
          }));
    
          if (!mapLoaded) setMapLoaded(true);
        }
      }, [mapData, mapLoaded]);


      useEffect(() => {
        if (chartRef && chartRef.current) {
          chartRef.current.chart.series[0].update({
            mapData,
          });
        }
      }, [options, mapData]);

      if (!mapLoaded) return null;

    return (
        <HighchartsReact
            highcharts={Highcharts}
            // khi dùng highchart option là 1 object lên sẽ bị thay đổi và dùng hàm clonedeep để coppy chính object đó xong truyền vào
            options={cloneDeep(options)}
            constructorType={'mapChart'}
            ref={chartRef}
        />
    );
}

export default HighMap;