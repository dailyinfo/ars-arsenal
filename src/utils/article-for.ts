/*
 * A simplified take on which article to use before a noun.
 * "A" goes before words that begin with consonants.
 * "An" goes before words that begin with vowels.
 */
export default function articleFor(noun: string): string {
  let article = 'a'
  const vowels = ['a', 'e', 'i', 'o', 'u']

  if (vowels.indexOf(noun[0].toLowerCase()) !== -1) {
    article = 'an'
  }

  return article
}
