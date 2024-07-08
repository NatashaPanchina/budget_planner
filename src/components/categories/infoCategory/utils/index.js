import { editCategory } from '../../../../actions/Actions';
import { idbAddItem } from '../../../../indexedDB/IndexedDB';
import { toStringDate } from '../../../../utils/format/date';

export const doneEventHandler = (
  selectedCategory,
  id,
  categoryType,
  description,
  selectedColor,
  icon,
  dateObj,
  notes,
  tags,
  dispatch,
) => {
  const date = toStringDate(new Date(dateObj.format()));
  const newCategory = {
    id,
    archived: false,
    type: categoryType,
    description: description,
    color: selectedColor,
    icon,
    date,
    notes,
    tags,
    visible: true,
    creationDate: Date.now(),
  };
  dispatch(editCategory(selectedCategory, newCategory));
  idbAddItem(newCategory, 'categories');
};
