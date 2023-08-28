/* eslint-disable no-unused-vars */
import { merge } from "lodash";
import Chart from "react-apexcharts";
// material
import { Card, CardHeader, Box } from "@mui/material";
//
import { BaseOptionChart } from "../../components/charts/";
import { useState, useEffect } from "react";
// import { collection, query, getDocs, orderBy, limit } from "firebase/firestore";
// import { db } from "../../utils/firebase.js";
// ----------------------------------------------------------------------

const TotalEmployedHistory = () => {
  const [EmployedHistory, setEmployedHistory] = useState();

  useEffect(() => {
    const getTotal = async () => {
      fetchDetails();
    };
    getTotal();
  }, []);

  const fetchDetails = async () => {
    // const q = query(
    //   collection(db, "TotalAssociatesChart"),
    //   orderBy("Date", "desc"),
    //   limit(40)
    // );
    // await getDocs(q).then((data) => {
    //   setEmployedHistory(
    //     data.docs.map((user) => ({
    //       x: user.data().Date.toDate(),
    //       y: user.data().Total,
    //     }))
    //   );
    // });
  };
  const employees = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  };
  // const GetPercentageChange = () => {
  //   const Min = Math.min(...employees.map((o) => o.y));
  //   const Max = Math.max(...employees.map((o) => o.y));
  //   const percentage = Math.round(Math.abs((Min - Max) / Min) * 100);
  //   return percentage;
  // };
  // if (EmployedHistory) {
  //   GetPercentageChange();
  // }
 

  return (
    <div>
      {/* {EmployedHistory && ( */}
        <Card>
          <CardHeader
            title="Employed over time"
            // subheader={`(+${GetPercentageChange().toString()}%) than last year`}
          />
          <Box sx={{ p: 2, pb: 1 }} dir="ltr">
            {/* <ReactApexChart
              type="area"
              series={[
                {
                  name: "Employed",
                  type: "area",
                  noData: {
                    text: "Loading...",
                  },
                  data: EmployedHistory.sort(function (a, b) {
                    return a.x - b.x;
                  }),
                },
              ]}
              options={merge(BaseOptionChart(), {
                stroke: { curve: "smooth" },
                xaxis: {
                  type: "datetime",
                  datetimeFormatter: {
                    year: "yyyy",
                    month: "MMM 'yy",
                  },
                },
                tooltip: {
                  shared: true,
                  intersect: false,
                  y: {
                    formatter: (y) => {
                      if (typeof y !== "undefined") {
                        return `${y.toFixed(0)} persons`;
                      }
                      return y;
                    },
                  },
                },
              })}
              height={150}
            /> */}
            <Chart
              options={employees.options}
              series={employees.series}
              type="bar"
              width="500"
            />
          </Box>
        </Card>
      {/* )} */}
    </div>
  );
};
export default TotalEmployedHistory;
