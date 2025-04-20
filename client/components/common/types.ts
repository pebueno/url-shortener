export type AuthCredentials = (email: string, pw: string) => Promise<void>;

export interface AuthContextType {
  user: string | null;
  login: AuthCredentials;
  signup: AuthCredentials;
  logout: () => void;
}

export interface SlugPageProps {
  params: {
    slug: string;
  };
}
