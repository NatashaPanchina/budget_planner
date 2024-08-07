import { styled } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

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
  color: props.theme.colors.text.ordinary,
}));

const DeleteButton = styled(Button)((props) => ({
  color: props.theme.colors.expense,
  border: `1px solid ${props.theme.colors.expense}`,
  marginLeft: props.theme.spacing(3),
}));

function ArchiveAlert({ setOpen, archiveCallback, type }) {
  const { t } = useTranslation();
  const newLocale = type ? type : 'ACCOUNT';

  return (
    <AlertContainer>
      <TextContainer>{t(`ALERTS.CONFIRM_ARCHIVE.${newLocale}`)}</TextContainer>
      <ButtonsContainer>
        <Button onClick={() => setOpen(false)}>{t('ALERTS.CANCEL')}</Button>
        <DeleteButton
          onClick={() => {
            setOpen(false);
            archiveCallback();
          }}
        >
          {t('ALERTS.ARCHIVE')}
        </DeleteButton>
      </ButtonsContainer>
    </AlertContainer>
  );
}

ArchiveAlert.propTypes = {
  setOpen: PropTypes.func,
  archiveCallback: PropTypes.func,
  type: PropTypes.string,
};

export default ArchiveAlert;
