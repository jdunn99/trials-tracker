export enum DestinyRace {
  Human,
  Awoken,
  Exo,
  Unknown,
}

export enum ClassType {
  Titan,
  Hunter,
  Warlock,
  Unknown,
}

export interface BungieError {
  field: string;
  message: string;
  code: number;
}

export interface BungieResponse<T> {
  Response?: T;
  Errors?: BungieError[];
}

export interface Character {
  id: string;
  backgroundImage: string;
  lightLevel: number;
  race: string;
  class: string;
}

export interface Perk {
  name: string;
  description: string;
  imageUrl: string;
}

export interface Subclass {
  name: string;
  super: Perk;
  perks: Perk[];
  imageUrl: string;
}

export interface Ratio {
  kills: number;
  deaths: number;
  assists: number;
}

export interface Report extends Ratio {
  matches: number;
  losses: number;
  wins: number;
  flawless: number;
}

export interface Weapon {
  name: string;
  subTitle: string;
  imageUrl: string;
  perks: Perk[];
  hash: number;
}

export interface Activity extends Ratio {
  instanceId: string;
  period: Date;
  standing: number;
}

export interface OverviewResponse extends Report {
  weapons: Weapon[];
  timePlayed: number;
  currentStats: Report;
  activities: Activity[];
  subclass: Subclass;
  efficiency: number;
  weaponsStats: {
    data: Array<{
      hash: string;
      name: string;
      iconUrl: string;
      kills: number;
      precisionKills: number;
      accuracy: number;
    }>;
  };
  season: {
    kills: number;
    deaths: number;
    wins: number;
    losses: number;
    assists: number;
  };
  characters: Array<{
    class: string;
    characterId: string;
    matches: number;
    kills: number;
    deaths: number;
    assists: number;
    losses: number;
  }>;
  bestGame: {
    referenceId: number;
    instanceId: string;
    displayProperties: {
      description: string;
      name: string;
      icon: string;
    };
    characters: Array<{
      characterId: string;
      kills: number;
      deaths: number;
      imageUrl: string;
      displayName: string;
      membershipType: number;
      membershipId: string;
      weapon: {
        information: {
          displayProperties: {
            description: string;
            name: string;
            icon: string;
          };
        };
        kils: number;
      } | null;
    }>;
  };
}

export interface Profile {
  membershipId: string;
  membershipType: number;
  bungieName: string;
  avatarUrl: string;
  status: string;
  platforms: number[];
  character: Character;
}
