import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material';
import { ReactComponent as NotesIcon } from '../../assets/icons/shared/notes.svg';

const Container = styled('div')((props) => ({
  marginTop: props.theme.spacing(2),
  fontSize: '0.875rem',
  color: props.theme.colors.text.darker,
  display: 'flex',
  alignItems: 'center',
  gridArea: 'notes',
}));

export const Svg = styled('svg')((props) => ({
  height: 15,
  width: 15,
  marginRight: props.theme.spacing(1),
  marginLeft: props.theme.spacing(2),
}));

function Notes({ notes }) {
  return notes ? (
    <Container>
      <Svg as={NotesIcon} />
      {notes}
    </Container>
  ) : (
    <></>
  );
}

Notes.propTypes = {
  notes: PropTypes.string,
};

export default Notes;
