import { Types } from 'mongoose';

export type IField = {
  userId: Types.ObjectId;
  arena_name: string;
  arena_description: string;
  cuntry: string;
  city: string;
  full_address: string;
  image: string[];
  min_player_team: number;
  max_player_team: number;
  min_player_sessions: number;
  max_player_sessions: number;
  default_session_duration: string;
  base_price_player: number;
  allow_socal_matches?: boolean;
  allow_ranked_matches?: boolean;

  //packages
  packages: {
    package_name: string;
    price: number;
    pak_des: number;
    item: string;
  }[];

  business_name: string;
  business_type: string;
  contact_number: string;
  holder_name: string;
  bank_name: string;
  account_number: string;
  routing_number: string;
  swift_code: string;
};

export type UpdateFiledPayload = Partial<IField> & {
  imagesToDelete?: string[];
};
