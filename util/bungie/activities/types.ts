import { ActivityDetails, BungieError, Player } from "../types";

// interface DisplayProperties {
//   description: string;
//   name: string;
//   icon: string;
//   hasIcon: boolean;
// }

// interface DetailedWeapon {
//   information: {
//     displayProperties: DisplayProperties;
//     kills: number;
//   };
// }

// interface Character {
// 	characterId: string;
// 	kills: number;
// 	deaths: number;
// 	imageUrl: string;
// 	displayName: string;
// 	membershipId: string;
// 	membershipType: number;
// 	weapon: DetailedWeapon;
// }

interface Activity {
  period: string;
  startingPhaseIndex?: number;
  activityDetails: ActivityDetails;
  values?: any;
}

interface DisplayValue {
  [key: string]: {
    basic: {
      value: number;
      displayValue: string;
    };
  };
}

interface PostGameEntries {
  standing: 0 | 1;
  score: {
    [key: string]: DisplayValue;
  };
  player: Player;
  characterId: string;
  values: any;
  extended: any;
}

export interface ActivityReport extends Activity {
  entries: PostGameEntries[];
}

export interface PostGameCarnageReport extends ActivityReport, BungieError {}
