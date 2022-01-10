export const OVERVIEW = "http://localhost:4000/destiny/gear/";
export const CLASSES = ["All", "Hunter", "Titan", "Warlock"];
export const TRIALS_MAPS = [
  "All",
  "Altar of Flame",
  "The Anomaly",
  "Bannerfall",
  "The Burnout",
  "Convergence",
  "Cauldron",
  "The Dead Cliffs",
  "Distant Shore",
  "Endless Value",
  "Exodus Blue",
  "The Foundry",
  "The Forge",
  "The Fortress",
  "Fragment",
  "Javelin-4",
  "Midtown",
  "Pacifica",
  "Radiant Cliffs",
  "Rusted Lands",
  "Twilight Gap",
  "Widow's Court",
  "Wormhaven",
];
export const STATUS = ["All", "Win", "Loss"];
export const SORT_BY = [
  "All",
  "Kills",
  "Deaths",
  "K/D",
  "Wins",
  "Losses",
  "Map",
];
export const CLASS_IMAGES = {
  Hunter:
    "https://www.bungie.net/common/destiny2_content/icons/e7324e8c29c5314b8bce166ff167859d.png",
  Titan:
    "https://www.bungie.net/common/destiny2_content/icons/8956751663b4394cd41076f93d2dd0d6.png",
  Warlock:
    "https://www.bungie.net/common/destiny2_content/icons/bf7b2848d2f5fbebbf350d418b8ec148.png",
};

const dev = process.env.NODE_ENV !== "production";
export const SERVER_URL = dev
  ? "http://localhost:3000/api"
  : "https://trialstracker.jackdunn.info/api";
export const STATS_HASH: {
  [key: number]: { imgSrc: string; name: string };
} = {
  144602215: {
    name: "Intellect",
    imgSrc:
      "/common/destiny2_content/icons/59732534ce7060dba681d1ba84c055a6.png",
  },
  4244567218: {
    name: "Strength",
    imgSrc:
      "/common/destiny2_content/icons/c7eefc8abbaa586eeab79e962a79d6ad.png",
  },
  1735777505: {
    imgSrc:
      "/common/destiny2_content/icons/ca62128071dc254fe75891211b98b237.png",
    name: "Discipline",
  },
  1935470627: {
    name: "Power",
    imgSrc:
      "/common/destiny2_content/icons/7c30e0e489e51a3920b4446684fbcdb1.png",
  },
  1943323491: {
    name: "Recovery",
    imgSrc:
      "/common/destiny2_content/icons/128eee4ee7fc127851ab32eac6ca91cf.png",
  },
  2996146975: {
    name: "Mobility",
    imgSrc:
      "/common/destiny2_content/icons/e26e0e93a9daf4fdd21bf64eb9246340.png",
  },
  392767087: {
    name: "Resilience",
    imgSrc:
      "/common/destiny2_content/icons/202ecc1c6febeb6b97dafc856e863140.png",
  },
};
