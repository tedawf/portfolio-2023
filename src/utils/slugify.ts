export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")     // spaces
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")     // multiple "-"s
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}