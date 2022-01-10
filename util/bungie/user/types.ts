import { BungieError, UserInfo } from "../types";

export interface UserProfile {
  userInfo: UserInfo;
  dateLastPlayed: string;
  versionsOwned: number;
  characterIds: string[];
  seasonHashes: number[];
  currentSeasonHash: number;
  currentSeasonRewardPowerCap: number;
}

interface Stat {
  rank: number;
  percentile: number | null;
  displayName: string;
  displayCategory: string;
  category: string;
  metadata: {};
  value: number;
  displayValue: string;
  displayType: "Number" | "String" | "NumberPrecision2";
}

export interface Stats {
  siteScore: Stat;
  abilityKills: Stat;
  ActivitiesEntered: Stat;
  Wl: Stat;
  assists: Stat;
  assistsPga: Stat;
  totalKillDistance: Stat;
  kills: Stat;
  deaths: Stat;
  wins: Stat;
  losses: Stat;
  killsPga: Stat;
  avgKillDistance: Stat;
  secondsPlayed: Stat;
  score: Stat;
  scorePga: Stat;
  avgScorePerKill: Stat;
  avgScorePerLife: Stat;
  bestSingleGameKills: Stat;
  bestSingleGameScore: Stat;
  dominationKills: Stat;
  kd: Stat;
  kad: Stat;
  objectivesCompleted: Stat;
  suicides: Stat;
  wl: Stat;
  longestKillSpree: Stat;
  longestSingleLife: Stat;
  mostPrecisionKills: Stat;
  activitiesLost: Stat;
  combatRating: Stat;
  precisionKills: Stat;
  activitiesEntered: Stat;
  activitiesWon: Stat;
  zonesCaptured: Stat;
  zonesNeutralized: Stat;
  resurrectionsPerformed: Stat;
  ressurectionsReceived: Stat;
  defensiveKills: Stat;
  offensiveKills: Stat;
  orbsDropped: Stat;
  orbsGathered: Stat;
  relicsCaptured: Stat;
  orbsDroppedPerGame: Stat;
  orbsGatheredPerGame: Stat;
  relicesCapturedPerGame: Stat;
  minutesPlayedTotal: Stat;
  superKills: Stat;
  efficiency: Stat;
  flawless: Stat;
}

interface MetaData<T> {
  type: "playlistGroup" | "playlistWeekly" | undefined;
  attributes: any;
  metadata: T;
  expiryDate: string | undefined;
}

interface RecentMatch {
  id: string;
  victory: boolean;
  kdRatio: number;
  kills: number;
  deaths: number;
}

interface PlaylistMetadata {
  name: string;
  imageUrl: string | undefined;
}

interface ActiveCharacterMetadata {
  backgroundImage: string;
  emblemImage: string;
  lightLevel: string;
  level: string;
  class: string;
  race: string;
}

interface GearMetadata {
  hash: number;
  slug: string;
  imageUrl: string;
  screenshotUrl: string;
  name: string;
  subTitle: string;
  damageType: string;
  primaryStat: number;
  rating: null | number;
}

interface GearPerks {
  name: string;
  imageUrl: string;
  description: string | null;
}

interface Gear {
  isSubclass: boolean;
  metadata: GearMetadata;
  perks: GearPerks[];
}

interface Playlist extends MetaData<PlaylistMetadata> {
  stats: Stats;
}

export interface ActiveCharacter extends MetaData<ActiveCharacterMetadata> {
  gear: Gear[];
}

interface TrialsData {
  overall: Playlist;
  thisWeek: Playlist;
  activeCharacter: ActiveCharacter;
  season: Stats;
  matches: RecentMatch[];
  flawlessThisWeek: number;
  currentStreak: number;
  isPrivate: boolean;
}

interface TrialsError {
  code: string;
  message: string;
  data: any;
}

export interface TrialsResponse {
  data?: TrialsData;
  errors?: TrialsError[];
}

export interface Profile extends BungieError {
  profile: UserProfile;
}

export interface LinkedProfile extends BungieError {
  profiles: {
    [key: number]: UserProfile & {
      membershipType: number;
    };
  };
}

interface Weapon {
  name: string;
  image: string;
  kills: number;
  headshots: number;
}

export interface TrialsProfile {
  membershipId: string;
  membershipType: number;
  bungieName: string;
  weapons: Weapon[];
  mostKills: {
    instanceId: string;
    kills: number;
  }[];
  characters: {
    [key: string]: {
      class: "Hunter" | "Titan" | "Warlock";
      matches: number;
      losses: number;
      kills: number;
      deaths: number;
      assists: number;
    };
  };
}

export interface TrialsProfileResponse {
  results: TrialsProfile[];
}

export interface WeaponStatsResponse {
  data: Weapon[];
}
