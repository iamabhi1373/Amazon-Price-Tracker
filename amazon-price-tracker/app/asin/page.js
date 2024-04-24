"use client"
import Image from "next/image";
import React from "react";

import {Chart} from "react-charts";

export default function Page({ params }) {



  const data = [
    {
      label: 'React Charts',
      data: [
        {
          date: 22,
          stars: 1,
        },
        {
          date : 29,
          stars:  5,
        },
        {
          date : 39,
          stars : 77,
        }
        // ...
      ]
    },
    {
      label: 'React Query',
      data: [
        {
          date: 20,
          stars: 23,
        }

       
        // ...
      ]
    }
  ];

  const primaryAxis = React.useMemo(
    () => ({
      getValue: datum => datum.date,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    () => [
      {
        getValue: datum => datum.stars,
      },
    ],
    []
  );
    return 
    
    <div>
     My Post: {params.asin}
      <div  className = "size-64">

<Chart
  options={{
    data,
    primaryAxis,
    secondaryAxes,
  }}
/>
</div>

      </div>
  }