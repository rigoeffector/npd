import React, { useEffect, useRef } from "react";
import Chart from "chart.js";
import { Box, CircularProgress, Paper, Typography } from "@mui/material";

const DoughnutChart = ({ completed, running }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const myChartRef = chartRef.current.getContext("2d");

    new Chart(myChartRef, {
      type: "doughnut",
      data: {
        labels: ["Complete", "Running"],
        datasets: [
          {
            data: [completed, running],
            backgroundColor: ["#c4cc36", "#D9D9D9"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }, [completed, running]);

  return (
    <Box
      sx={{
        background: "white",
        padding: "10px",
        borderRadius: "15px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "14px !important",
            fontWeight: "700",
            color: "#4d5e80",
            marginLeft: "27px",
          }}
        >
          Completed VS Running Projects
        </Typography>
      </Box>
      <Paper
        className="py-4 px-2"
        sx={{
          height: "325px",
          padding: "10px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <canvas ref={chartRef} />
      </Paper>
    </Box>
  );
};

export default DoughnutChart;
