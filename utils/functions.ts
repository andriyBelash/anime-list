export const generateLink = (name: string, id: number): string => {
  const url = name.split(' ').map(i => i.toLowerCase()).join('-')+'-'+id
  return url
}