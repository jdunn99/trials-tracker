import { IoLogoPlaystation, IoLogoSteam, IoLogoXbox } from "react-icons/io";
import { Match } from "./types";

export const mapIcon = (n: number): JSX.Element | null => {
  switch (n) {
    case 1:
      return <IoLogoXbox />;
    case 2:
      return <IoLogoPlaystation />;
    case 3:
      return <IoLogoSteam />;
    default:
      return null;
  }
};

export const calculateKd = (kills: number, deaths: number) => {
  return deaths === 0 ? "0.00" : (kills / deaths).toFixed(2).toString();
};

export const calculateWinLoss = (wins: number, matches: number) => {
  return matches === 0
    ? "0.00%"
    : ((wins / matches) * 100).toFixed(2).toString();
};

export const calculateTimePlayed = (seconds: number) => {
  return "" + seconds / 3600 + "h";
};

export const color = (value: number, base: number) =>
  value > base ? "green.500" : value === base ? "white" : "red.500";

export const sortMatchesCallback = (value: string, matches: Match[]) => {
  switch (value) {
    case "All":
      return matches.sort(
        (a, b) => new Date(b.period).getTime() - new Date(a.period).getTime()
      );
    case "Kills":
      return matches.sort((a, b) => b.kills - a.kills);
    case "Deaths":
      return matches.sort((a, b) => b.deaths - a.deaths);
    case "K/D":
      return matches.sort((a, b) => b.killsDeathsRatio - a.killsDeathsRatio);
    case "Wins":
      return matches.sort((a, b) => a.standing - b.standing);
    case "Losses":
      return matches.sort((a, b) => b.standing - a.standing);
    case "Map":
      return matches.sort((a, b) =>
        a.displayProperties.name.localeCompare(b.displayProperties.name)
      );
    default:
      return matches;
  }
};
