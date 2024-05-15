export function formatToWon(price: number) {
  return price.toLocaleString("ko-KR");
}

export function formatToTimeAgo(date: string): string {
  const dayInMs = 24 * 60 * 60 * 1000;
  const time = new Date(date).getTime();
  const now = new Date().getTime();
  const diff = Math.round((now - time) / dayInMs);

  const formatter = new Intl.RelativeTimeFormat("ko");

  return formatter.format(diff, "days");
}
