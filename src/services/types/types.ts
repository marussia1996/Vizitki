//

//TUserRaw - пишем постфикс Raw у данных пришедших от сервера

//

export type TLocation = {
  hash: string;
  pathname: string;
  search: string;
  state: object;
  from?: string;
  background: {
    pathname: string;
    search: string;
    hash: string;
    state: null;
    key: string;
  }
};

export enum TThemeProfile {
  DEFAULT = 'default',
  ROMANTIC = 'romantic',
  DARING = 'daring'
}

export type TStudent = {
  id: string;
  number: number;
  email: string;
  name: string;
}

export type TUserInfoRaw = {
  _id: string;
  name: string;
  email: string;
}

export type TCommentRaw = {
  _id: string;
  from: TUserInfoRaw;
  target?: string | null;
  text: string;
  to: TUserInfoRaw;
}
// типы данных пришедших с сервера
export type BaseFiedsRaw = {
  _id: string,
  createdAt: number,
  updatedAt: number,
}
export type UserAccountRaw = {
  email: string,
  cohort: string,
}
export type GeocodeRaw = Array<number>
export type ShortProfileRaw = {
  name: string,
  photo: string,
  city: {
    name: string,
    geocode: GeocodeRaw,
  }
}
export type ProfileRaw = {
  name: string,
  photo: string,
  city: {
    name: string,
    geocode: GeocodeRaw,
  }
  birthday: string,
  quote: string,
  telegram: string,
  github: string,
  template: string,
}
export type InfoBlocksRaw = {
  hobby: {
    text: string,
    image: string,
    reactions: number
  }
  status: {
    text: string,
    image: string,
    reactions: number
  }
  job: {
    text: string,
    image: string,
    reactions: number
  }
  edu: {
    text: string,
    image: string,
    reactions: number
  }
}
export type InfoItemsRaw = {
  hobby: {
    text: string,
    image: string,
  }
  status: {
    text: string,
    image: string,
  }
  job: {
    text: string,
    image: string,
  }
  edu: {
    text: string,
    image: string,
  }
}
export type UserWithProfileRaw = {
  email: string,
  cohort: string,
  profile: {
    name: string,
    photo: string,
    city: {
      name: string,
      geocode: GeocodeRaw,
    }
    birthday: string,
    quote: string,
    telegram: string,
    github: string,
    template: string,
  }
  info: {
    hobby: {
      text: string,
      image: string,
      reactions: number
    }
    status: {
      text: string,
      image: string,
      reactions: number
    }
    job: {
      text: string,
      image: string,
      reactions: number
    }
    edu: {
      text: string,
      image: string,
      reactions: number
    }
  }
}
export type Reactions = Array<CommentRaw | LikeRaw>
export type UserRaw = {
  email: string,
  cohort: string,
  profile: {
    name: string,
    photo: string,
    city: {
      name: string,
      geocode: GeocodeRaw,
    }
    birthday: string,
    quote: string,
    telegram: string,
    github: string,
    template: string,
  }
  info: {
    hobby: {
      text: string,
      image: string,
      reactions: number
    }
    status: {
      text: string,
      image: string,
      reactions: number
    }
    job: {
      text: string,
      image: string,
      reactions: number
    }
    edu: {
      text: string,
      image: string,
      reactions: number
    }
  }
  reactions: Reactions
}
export type UserRefRaw = {
  _id: string,
  name: string,
  email: string
}
export type TargetRaw = 'hobby' | 'status' | 'job' | 'edu';
export type ReactionRaw = {
  _id: string,
  from: {
    _id: string,
    name: string,
    email: string
  },
  target: TargetRaw,
}
export type CommentRaw = {
  _id: string,
  from: {
    _id: string,
    name: string,
    email: string
  },
  target: TargetRaw,
  text: string,
}
export type LikeRaw = {
  _id: string,
  from: {
    _id: string,
    name: string,
    email: string
  },
  target: TargetRaw,
  emotion: string
}
export type InfoItemRaw = {
  text: string,
  image: string,
}
export type InfoBlockRaw = {
  text: string,
  image: string,
  reactions: number
}
///
export type TGetUsersRaw = {
  total: number,
  items: Array<BaseFiedsRaw & UserAccountRaw & { name: string }>
}
export type TGetCommentsRaw = {
  total: number,
  items: Array<CommentRaw & { to: UserRefRaw }>,
}

export type TUserReactionsRaw = {
  total: number,
  items: Array<CommentRaw & LikeRaw>
}
export type TGetProfilesRaw = {
  total: number,
  items: Array<BaseFiedsRaw & UserAccountRaw & { profile: ShortProfileRaw }>
}

