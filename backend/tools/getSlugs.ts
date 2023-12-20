import slugify from 'slugify';

export const getSlugs = (title: string): { slugEn: string; slugRu: string } => {
  const slugEn = slugify(title.replace(/[^a-zA-Zа-яА-Я0-9 ]+/g, ''), {
    lower: true,
  });
  const slugRu = title
    .replace(/[^a-zA-Zа-яА-Я0-9 ]+/g, '')
    .trim()
    .replace(/\s/g, '-')
    .replaceAll('--', '-')
    .toLowerCase();
  return { slugEn, slugRu };
};
