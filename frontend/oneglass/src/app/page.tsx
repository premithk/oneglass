"use client";
import { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";

interface SalesData {
  date: string;
  location: string;
  forecasted_sales_quantity: number;
  id: number;
}

interface IncomingOrderData {
  date: string;
  location: string;
  incoming_quantity: number;
  id: number;
}

interface Location {
  location: string;
}

interface WeatherData {
  datetime: string;
  tempMax: number;
  tempMin: number;
  temp: number;
}

export default function Home() {
  const [salesData, setSalesData] = useState<Array<SalesData>>([]);
  const [incomingOrderData, setIncomingOrderData] = useState<
    Array<IncomingOrderData>
  >([]);
  const [weatherData, setWeatherData] = useState<Array<WeatherData>>([]);

  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("hamburg");

  useEffect(() => {
    fetch("http://localhost:3000/locations")
      .then((response) => response.json())
      .then((data) => setLocations(data))
      .catch((error) => console.error("Error fetching locations:", error));
  }, []);

  useEffect(() => {
    if (selectedLocation) {
      fetch(`http://localhost:3000/${selectedLocation}/next-two-weeks/forecast`)
        .then((response) => response.json())
        .then((data) => setSalesData(data))
        .catch((error) => console.error("Error fetching sales data:", error));

      fetch(`http://localhost:3000/${selectedLocation}/next-two-weeks/incoming`)
        .then((response) => response.json())
        .then((data) => setIncomingOrderData(data))
        .catch((error) => console.error("Error fetching sales data:", error));

      fetch(`http://localhost:3000/weather/${selectedLocation}`)
        .then((response) => response.json())
        .then((data) => setWeatherData(data.days))
        .catch((error) => console.error("Error fetching weather data:", error));
    }
  }, [selectedLocation]);

  const data = useMemo(
    () =>
      salesData.map((x) => ({
        ...x,
        ...weatherData.find(
          (w) => new Date(x.date).toISOString().split("T")[0] === w.datetime
        ),
        ...incomingOrderData.find((i) => x.date === i.date),
      })),
    [salesData, weatherData, incomingOrderData]
  );

  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date" as keyof SalesData,
        style: { textAlign: "left" },
      },
      {
        Header: "Location",
        accessor: "location" as keyof SalesData,
        style: { textAlign: "left" },
      },
      {
        Header: "Forecasted Sales Quantity",
        accessor: "forecasted_sales_quantity" as keyof SalesData,
        style: { textAlign: "left" },
      },
      {
        Header: "Incoming Order Quantity",
        accessor: "incoming_quantity" as keyof IncomingOrderData,
        style: { textAlign: "left" },
      },
      {
        Header: "Forecasted Temperature",
        accessor: "temp" as keyof WeatherData,
        style: { textAlign: "left" },
      },
    ],
    []
  );
  const table = useTable({
    columns,
    data,
  });

  return (
    <div>
      <h1>Sales Data</h1>
      <div>
        <label htmlFor="locationSelect">Select Location:</label>
        <select
          id="locationSelect"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          {locations.map((location) => (
            <option key={location.location} value={location.location}>
              {location.location}
            </option>
          ))}
        </select>
      </div>

      <table {...table.getTableProps()} style={{ width: "100%" }}>
        <thead>
          {table.headerGroups.map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th key={headerGroup.id}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...table.getTableBodyProps()}>
          {table.rows.map((row) => {
            table.prepareRow(row);
            return (
              <tr
                key={row.getRowProps().key}
                style={{
                  backgroundColor:
                    row.values["forecasted_sales_quantity"] -
                      row.values["incoming_quantity"] <
                    100
                      ? "red"
                      : "white",
                }}
              >
                {row.cells.map((cell) => {
                  return (
                    <td key={cell.getCellProps().key}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
