export default function checkUnlockAt(iso: string | Date): boolean {
  const d = new Date(iso);
  if (isNaN(d.getTime())) throw new Error('Invalid date');

  const now = new Date();

  const dUTC = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  const todayUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());

  return dUTC > todayUTC;
}
