import clsx, { type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

type AdditionalClassGroupIds = 'icon';

export const twMerge = extendTailwindMerge<AdditionalClassGroupIds>({
  extend: {
    classGroups: {
      icon: [{ icon: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] }],
    },
  },
});

export function mergeClasses(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const STOPWORDS = 'a an and at but by for in nor of on or out so the to up with yet'.split(' ');

type Options = {
  keepSpaces?: boolean | undefined;
  stopwords?: string[] | undefined;
};

export function titleCase(value: string, options: Options = {}) {
  if (!value) return '';

  const stop = options.stopwords ?? STOPWORDS;
  const keep = options.keepSpaces;
  const splitter = /(\s+|[-‑–—,:;!?()])/;

  return value
    .split(splitter)
    .map((word, index, all) => {
      if (index % 2) {
        if (/\s+/.test(word)) return keep ? word : ' ';
        return word;
      }

      const lower = word.toLocaleLowerCase();

      if (index !== 0 && index !== all.length - 1 && stop.includes(lower)) {
        return lower;
      }

      return capitalize(word);
    })
    .join('');
}

export function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
