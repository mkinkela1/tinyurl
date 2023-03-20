enum Language {
  EN = "EN",
  HR = "HR"
}

export const EmailAlreadyExists: Record<Language, string> = {
  [Language.EN]: "Email already exists.",
  [Language.HR]: "E-mail već postoji."
};

export const WrongEmailOrPassword: Record<Language, string> = {
  [Language.EN]: "Wrong email or password!",
  [Language.HR]: "Pogrešan e-mail ili lozinka!"
};

export const UserNotFound: Record<Language, string> = {
  [Language.EN]: "User not found.",
  [Language.HR]: "Korisnik nije pronađen."
};

export const InvalidEmailVerificationToken: Record<Language, string> = {
  [Language.EN]: "Invalid email verification token.",
  [Language.HR]: "Nevažeći token za verifikaciju e-maila."
};
