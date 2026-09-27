export type CompanyType = "savdo" | "xizmat" | "zavod" | "qurilish" | "boshqa";

export interface User {
  name: string;
  company: string;
  phone: string;
  email: string;
  companyType?: CompanyType;
  createdAt: string;
}

const KEY = "balans.user";
const SESSION = "balans.session";

export function getUser(): User | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function saveUser(user: User) {
  localStorage.setItem(KEY, JSON.stringify(user));
}

export function isAuthed(): boolean {
  return localStorage.getItem(SESSION) === "1" && !!getUser();
}

export function login(email: string, _password: string): User {
  let user = getUser();
  if (!user || user.email.toLowerCase() !== email.toLowerCase()) {
    user = {
      name: email.split("@")[0] || "Foydalanuvchi",
      company: "Demo Biznes MChJ",
      phone: "+998 90 000 00 00",
      email,
      companyType: "savdo",
      createdAt: new Date().toISOString(),
    };
    saveUser(user);
  }
  localStorage.setItem(SESSION, "1");
  return user;
}

export function register(data: Omit<User, "createdAt">): User {
  const user: User = { ...data, createdAt: new Date().toISOString() };
  saveUser(user);
  localStorage.setItem(SESSION, "1");
  return user;
}

export function setCompanyType(type: CompanyType) {
  const u = getUser();
  if (u) saveUser({ ...u, companyType: type });
}

export function logout() {
  localStorage.removeItem(SESSION);
}
