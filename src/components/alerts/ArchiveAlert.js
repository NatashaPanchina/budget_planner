import { styled } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

const AlertContainer = styled('div')((props) => ({
  backgroundColor: props.theme.colors.background.primary,
  padding: `${props.theme.spacing(6)} ${props.theme.spacing(8)}`,
  width: `calc(100% - ${props.theme.spacing(8 * 2)})`,
  color: props.theme.colors.text.primary,
  position: 'relative',
}));

const TextContainer = styled('div')((props) => ({
  marginBottom: props.theme.spacing(5),
}));

const ButtonsContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Button = styled('div')((props) => ({
  display: 'flex',
  borderRadius: props.theme.borderRadius,
  border: `1px solid ${props.theme.colors.main.violet}`,
  alignItems: 'center',
  justifyContent: 'center',
  padding: props.theme.spacing(2),
  marginRight: props.theme.spacing(3),
  cursor: 'pointer',
}));

const DeleteButton = styled(Button)((props) => ({
  color: props.theme.colors.expense,
  border: `1px solid ${props.theme.colors.expense}`,
  marginLeft: props.theme.spacing(3),
}));

function ArchiveAlert({ setOpen, archiveCallback }) {
  return (
    <AlertContainer>
      <TextContainer>Are you sure?</TextContainer>
      <ButtonsContainer>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <DeleteButton
          onClick={() => {
            setOpen(false);
            archiveCallback();
          }}
        >
          Archive
        </DeleteButton>
      </ButtonsContainer>
    </AlertContainer>
  );
}

ArchiveAlert.propTypes = {
  setOpen: PropTypes.func,
  archiveCallback: PropTypes.func,
};

export default ArchiveAlert;
