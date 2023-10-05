import React from 'react';
import { Notes, NotesSvg } from '../GlobalSearch.styled';
import { ReactComponent as NotesIcon } from '../../../../assets/icons/shared/notes.svg';

export function renderNotes(notes) {
  if (notes) {
    return (
      <Notes>
        <NotesSvg as={NotesIcon} />
        {notes}
      </Notes>
    );
  }
}

export const sliceData = (data) => {
  if (!data) return data;
  if (data.length < 5) return data;
  return data.slice(0, 5);
};
