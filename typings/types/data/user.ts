export type User = {
  id: string | undefined,
  phone: string | undefined,
  password: string | undefined,
  avatar: string | undefined,
  name: string | undefined,
  nickName: string | undefined,
  introduce: string | undefined,
  favorite: string | undefined,
  birthday: string | undefined,
  idCard: string | undefined,
  school: School | undefined,
  major: string | undefined,
  nation: string | undefined,
  location: string | undefined,
  hometown: string | undefined,
  roles: ["platform" | "school"]
}

export type School = {
  id: string | undefined,
  name: string | undefined,
  desc: string | undefined,
  badge: string | undefined,
  ban: boolean | undefined
}