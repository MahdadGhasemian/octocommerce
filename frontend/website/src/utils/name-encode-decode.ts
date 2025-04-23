// Product Name
export const encodeProductName = (name: string) => {
  return `${name.replace(/\s+/g, '-')}`;
};

export const decodeProductName = (encodedName: string) => {
  return encodedName.replace(/-/g, ' ').trim();
};

// Category Name
export const encodeCategoryName = (name: string) => {
  return `${name.replace(/\s+/g, '-')}`;
};

export const decodeCategoryName = (encodedName: string) => {
  return encodedName.replace(/-/g, ' ').trim();
};

// Category Id
export const encodeCategoryId = (id: string) => {
  return `category-${id}`;
};

export const decodeCategoryId = (encodedId: string) => {
  return encodedId.replace('category-', '');
};
