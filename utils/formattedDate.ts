export function formattedDate(): string {
  const dateNow = new Date();
  const formattedDate = dateNow.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  const finalDate = formattedDate.replace(' de ', '/').replace(' de', ' de');

  return finalDate;
}

export function formatDate(date: string) {
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
}
