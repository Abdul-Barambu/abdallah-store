import React from 'react'
import { Bar } from 'react-chartjs-2';

const Weekly = ({chartRef, data, options}) => {
  return (
    <div className='h-[200px] sm:h-[300px] lg:h-[350px] xl:h-[450px]'>
      <Bar ref={chartRef} data={data} options={options} />
    </div>
  )
}

export default Weekly
