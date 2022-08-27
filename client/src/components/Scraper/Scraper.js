import React from "react";
import Error from "../Error/Error";
import Loader from "../Loader/Loader";
import useFetch from "../../hooks/useFetch";
import getStats from "./getStats";

const urls = {
  departures: "https://schiphol.dutchplanespotters.nl/departures.php",
};

function Scraper() {
  //   const [flightData, setFlightData] = useState(null);
  const [{ data, loading, error }, fetcher] = useFetch();

  function handleGetFlightData() {
    fetcher({
      url: "/flights",
      method: "POST",
      body: { url: "https://schiphol.dutchplanespotters.nl/departures.php" },
    });
  }

  const stats = getStats(data);

  return (
    <div>
      <button onClick={handleGetFlightData}>Get Flight Data</button>
      <Loader loading={loading} message={"Loading..."}>
        <Error>{error}</Error>

        {data ? (
          <div>
            <div>List length: {data.data.t}</div>
            <div>{data.data.headers}</div>
          </div>
        ) : null}
        {stats && stats.uniqueAircraft ? (
          <>
            <div>Total: {stats.totalCount}</div>

            <div className="flex-row justify-center">
              {/* <div>{JSON.stringify(stats)}</div> */}
              <table style={{ width: "auto" }}>
                <tbody>
                  {stats.uniqueAircraft.map((row) => {
                    return (
                      <tr key={row.title}>
                        <td style={{ textAlign: "start" }}>{row.title}</td>
                        <td style={{ textAlign: "end" }}>{row.count}</td>
                        <td style={{ textAlign: "end" }}>{row.proportion}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        ) : null}
      </Loader>
    </div>
  );
}

export default Scraper;
