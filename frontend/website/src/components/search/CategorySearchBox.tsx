'use client';

import { Check, ChevronDown, ChevronLeft } from 'lucide-react';
import * as React from 'react';

import basicService, { CategoryTree } from '@/services/basic.service';

interface CategorySearchBoxProps {
  onChange: (value: Partial<CategoryTree>) => void;
  selectedCategoryId?: number; // ID of the selected category
}

export default function CategorySearchBox(props: CategorySearchBoxProps) {
  const { onChange, selectedCategoryId } = props;

  const [categoryTree, setCategoryTree] = React.useState<CategoryTree>();
  const [currentCategory, setCurrentCategory] = React.useState<
    Partial<CategoryTree> | undefined
  >(undefined);
  const [openCategories, setOpenCategories] = React.useState<Set<number>>(
    new Set()
  );

  const categoryChangeHandler = (category: Partial<CategoryTree>) => {
    setCurrentCategory(category); // Update the local state for the selected category
    onChange(category); // Pass the selected category to the parent component
  };

  const toggleCategory = (categoryId: number) => {
    setOpenCategories((prev) => {
      const newOpenCategories = new Set(prev);
      if (newOpenCategories.has(categoryId)) {
        newOpenCategories.delete(categoryId); // Close the category
      } else {
        newOpenCategories.add(categoryId); // Open the category
      }
      return newOpenCategories;
    });
  };

  const findCategoryAndParents = (
    category: Partial<CategoryTree>,
    id: number
  ): Partial<CategoryTree> | null => {
    if (category.id === id) {
      return category;
    }
    if (category.children) {
      for (const child of category.children) {
        const found = findCategoryAndParents(child, id);
        if (found) {
          // Add the current category to the openCategories set
          setOpenCategories((prev) => new Set(prev.add(category.id!)));
          return found;
        }
      }
    }
    return null;
  };

  React.useEffect(() => {
    const fetchCategories = async () => {
      const response = await basicService.getAllTree();
      setCategoryTree(response[0]);
    };

    fetchCategories();
  }, []);

  React.useEffect(() => {
    if (categoryTree && selectedCategoryId) {
      const selectedCategory = findCategoryAndParents(
        categoryTree,
        selectedCategoryId
      );
      if (selectedCategory) {
        setCurrentCategory(selectedCategory); // Set the selected category
      }
    }
  }, [selectedCategoryId, categoryTree]);

  // Recursive function to render categories with indentation based on the depth
  const renderCategories = (
    category: Partial<CategoryTree>,
    level = 0 // Add a level parameter to track the depth
  ): React.ReactNode => {
    const isSelected = currentCategory?.id === category.id;
    const hasChildren = category.children && category.children.length > 0;
    const isOpen = openCategories.has(category.id!);

    return (
      <li
        key={category.id}
        className='space-y-1 border-s-2 border-base-200 ps-4'
      >
        <div className=''>
          <button
            onClick={() => {
              if (category.id) {
                categoryChangeHandler(category); // Call categoryChangeHandler on category selection
              }
            }}
            className='w-full text-right px-0 py-1 hover:bg-gray-200 rounded flex items-center justify-start'
          >
            {hasChildren && (
              <span
                className='cursor-pointer'
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering category selection
                  toggleCategory(category.id!); // Toggle category open/close
                }}
              >
                {isOpen ? <ChevronDown /> : <ChevronLeft />}{' '}
              </span>
            )}
            <span className={!hasChildren ? 'ms-2' : 'ms-0'}>
              {category.name}
            </span>
            {isSelected && <Check size={24} className='text-primary/50 mx-2' />}
          </button>
          {hasChildren && (
            <ul className={` ${isOpen ? 'block' : 'hidden'}`}>
              {category.children?.map(
                (child) => renderCategories(child, level + 1) // Pass the incremented level
              )}
            </ul>
          )}
        </div>
      </li>
    );
  };

  return (
    <div className='w-full bg-white rounded-lg shadow-md border'>
      <div className='mb-4 ps-4 text-lg font-semibold text-right'>
        دسته بندی ها
      </div>

      <div className='overflow-y-auto max-h-screen text-sm'>
        {/* Allow scrolling with max-height */}
        <ul className='space-y-2'>
          {renderCategories({ id: 1, name: 'همه کالاها' })}
          {categoryTree?.children?.map((category) =>
            renderCategories(category, 1)
          )}
        </ul>
      </div>
    </div>
  );
}
