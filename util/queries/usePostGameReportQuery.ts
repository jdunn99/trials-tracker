import { useQuery } from "react-query";
import { SERVER_URL } from "../constants";

const fetchPostGameReport = async (activityId: string) => {
  const response = await fetch(`${SERVER_URL}/match/${activityId}`);

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
