import { useQuery } from "react-query";

const fetchPostGameReport = async (activityId: string) => {
  const response = await fetch(
    `http://localhost:4000/destiny/match/${activityId}`
  );

  const json = await response.json();
  return json;
};

export const usePostGameReportQuery = (activityId: string) => {
  return useQuery(
    ["postGameReportQuery", activityId],
    () => fetchPostGameReport(activityId),
    {
      enabled: activityId.length > 0,
    }
  );
};
