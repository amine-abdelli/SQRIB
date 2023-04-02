export const emailPolicy = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // john-doe@domain.com
export const passwordPolicy = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // At least one uppercase, one lowercase, one special character and 8 characters
export const nicknamePolicy = /^[a-zA-Z0-9_-]{4,30}$/; // 6 to 30 characters. Letters, numbers, dashes and underscores allowed
