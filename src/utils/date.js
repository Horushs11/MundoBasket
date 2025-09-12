// src/utils/date.js
export function normalizeBirthdate(s) {
  if (!s) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s; // ISO
  const m = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/); // d/m/yyyy
  if (m) {
    const dd = m[1].padStart(2, "0");
    const mm = m[2].padStart(2, "0");
    const yyyy = m[3];
    return `${yyyy}-${mm}-${dd}`;
  }
  const m2 = s.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/); // yyyy/m/d
  if (m2) {
    const yyyy = m2[1];
    const mm = m2[2].padStart(2, "0");
    const dd = m2[3].padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }
  return null;
}

export function ageFrom(birthdate) {
  const iso = normalizeBirthdate(birthdate);
  if (!iso) return null;
  const [y, m, d] = iso.split("-").map(Number);
  const b = new Date(Date.UTC(y, m - 1, d));
  const now = new Date();
  const today = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  let age = today.getUTCFullYear() - b.getUTCFullYear();
  const mDiff = today.getUTCMonth() - b.getUTCMonth();
  if (mDiff < 0 || (mDiff === 0 && today.getUTCDate() < b.getUTCDate())) age--;
  return age;
}