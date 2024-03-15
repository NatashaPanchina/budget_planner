import React, { useState } from 'react';
import {
  Container,
  FlexContainer,
  Logo,
  LogoContainer,
  LogoTitle,
  NextLinkContainer,
  SelectContainer,
  TextInfo,
} from '../Auth.styled';
import { ReactComponent as LogoCatIcon } from '../../../assets/icons/navigation/logoCat.svg';
import { ReactComponent as LogoTitleIcon } from '../../../assets/icons/navigation/logoTitle.svg';
import { TextInputField } from '../../../theme/global';
import { styled } from '@mui/material';
import { idbUpdateItem } from '../../../indexedDB/IndexedDB';
import { pages } from '../../../utils/constants/pages';
import { getAuth, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { updateDisplayName } from '../../../actions/Actions';
import { useDispatch } from 'react-redux';

const NameField = styled(TextInputField)(() => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      boxShadow: 'none',
    },
  },
}));

const updateName = async (displayName, auth, navigate, dispatch) => {
  if (!displayName) return 'This field should not be empty';
  const data = {
    displayName,
  };
  try {
    await updateProfile(auth.currentUser, data);
    await idbUpdateItem(auth.currentUser.uid, data, 'profile');
    dispatch(updateDisplayName(data.displayName));
    navigate(pages.selectMainCurrency);
  } catch (error) {
    console.log(error.message);
  }
};

export default function EnterName() {
  const auth = getAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [displayName, setDisplayName] = useState('');
  const dispatch = useDispatch();

  return (
    <Container>
      <LogoContainer>
        <FlexContainer>
          <Logo as={LogoCatIcon} />
          <LogoTitle as={LogoTitleIcon} />
        </FlexContainer>
      </LogoContainer>
      <SelectContainer>
        <TextInfo>{t('ENTER_NAME.WELCOME')}</TextInfo>
        <NameField
          margin="normal"
          required
          autoComplete="off"
          placeholder={t('ENTER_NAME.YOUR_NAME')}
          value={displayName}
          onChange={(event) => setDisplayName(event.target.value)}
        />
        <NextLinkContainer
          onClick={() => updateName(displayName, auth, navigate, dispatch)}
        >
          {t('ENTER_NAME.NEXT')}
        </NextLinkContainer>
      </SelectContainer>
    </Container>
  );
}
