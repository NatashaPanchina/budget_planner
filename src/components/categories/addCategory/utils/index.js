import { addNewCategory } from '../../../../actions/Actions';
import { idbAddItem } from '../../../../indexedDB/IndexedDB';
import { toStringDate } from '../../../../utils/format/date';
import { v4 as uuidv4 } from 'uuid';

export const doneEventHandler = (
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
    id: uuidv4(),
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
  dispatch(addNewCategory(newCategory));
  idbAddItem(newCategory, 'categories');
};
