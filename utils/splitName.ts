export function splitName(name: string) {
  const [firstName, ...lastName] = name.split(' ');
  return {
    firstName,
    lastName: lastName.join(' '),
  };
}
