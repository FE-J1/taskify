export interface InputFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  error?: boolean;
  errorMessage?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export interface PasswordProps {
  current: string;
  new: string;
  confirm: string;
}

// 프로필 이미지 생성 파라미터 타입
export interface ProfileImageParams {
  image: File | null;
}
// 프로필 이미지 생성 응답 타입
export interface ProfileImageResponse {
  profileImageUrl: string;
}

// 프로필 타입
export interface ProfileProps {
  email: string;
  nickname: string;
  profileImageUrl: string | null;
}
