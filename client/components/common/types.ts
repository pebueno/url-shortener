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

export interface UrlItem {
  id: string;
  target: string;
  slug: string;
  visits: number;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
}