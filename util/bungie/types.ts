export interface BungieError {
  ErrorStatus: string;
  Message: string;
  MessageData?: any;
  ErrorCode: number;
}

export interface BungieResponse<T> extends BungieError {
  Response: T | undefined;
  ThrottleSeconds: number;
}

export interface BungieAPIResponse<T> {
  Response?: T;
  Errors?: BungieError;
}

export interface UserInfo {
  crossSaveOverride: number;
  applicableMembershipTypes: number[];
  isPublic: boolean;
  membershipId: string;
  membershipType: number;
  displayName: string;
  bungieGlobalDisplayName: string;
  bungieGlobalDisplayNameCode: number;
  iconPath: string;
  emblemPath: string;
}

export interface ActivityDetails {
  referenceId: number;
  directorActivityHash: number;
  instanceId: string;
  mode: 84;
  modes: [1, 84];
  isPrivate: boolean;
  membershipType: number;
}

export interface Player {
  destinyUserInfo: UserInfo;
  characterClass: "Titan" | "Hunter" | "Warlock";
  classHash: number;
  raceHash: number;
  genderHash: number;
  characterLevel: number;
  lightLevel: number;
  emblemHash: number;
}

export const CLASS_HASH: {
  [key: number]: { imgSrc: string; className: "Titan" | "Hunter" | "Warlock" };
} = {
  671679327: {
    imgSrc:
      "/common/destiny2_content/icons/e7324e8c29c5314b8bce166ff167859d.png",
    className: "Hunter",
  },
  3655393761: {
    imgSrc:
      "/common/destiny2_content/icons/8956751663b4394cd41076f93d2dd0d6.png",
    className: "Titan",
  },
  2271682572: {
    imgSrc:
      "/common/destiny2_content/icons/bf7b2848d2f5fbebbf350d418b8ec148.png",
    className: "Warlock",
  },
};
