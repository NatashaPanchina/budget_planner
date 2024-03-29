import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../loading/Loading';
import { ReactComponent as CameraSvg } from '../../../../assets/icons/shared/photo.svg';
import { ReactComponent as AvatarSvg } from '../../../../assets/icons/shared/avatar.svg';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import {
  DeleteButton,
  EditButton,
  FirstTitle,
  FlexContainer,
  ItemContainer,
  ItemTitle,
  SingleContainer,
  Title,
  Button,
  MultilineContainer,
  MobContainer,
} from '../../Settings.styled';
import { dateFormatter } from '../../../../utils/format/date';
import { useNavigate } from 'react-router-dom';
import { pages } from '../../../../utils/constants/pages';
import { logOut } from '../../../auth/utils';
import { alpha } from '@mui/material';

const Svg = styled('svg')((props) => ({
  paddingRight: props.theme.spacing(2),
}));

const UploadPhoto = styled('span')(() => ({
  display: 'none',
  '@media (min-width: 768px)': {
    display: 'flex',
  },
}));

const SignOutButton = styled(DeleteButton)((props) => ({
  marginTop: props.theme.spacing(3),
  marginLeft: props.theme.spacing(3),
  '@media (min-width: 768px)': {
    marginLeft: props.theme.spacing(8),
  },
  '&:hover': {
    boxShadow: `0px 4px 10px ${alpha(props.theme.colors.expense, 0.2)}`,
    transition: 'box-shadow 0.3s ease-out',
  },
}));

function Account() {
  const { t } = useTranslation();
  const header = useSelector((state) => state.header);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState('Anonymous');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return header.status === 'loading' ? (
    <Loading />
  ) : (
    <MobContainer>
      <FirstTitle>{t('SETTINGS.ACCOUNT_INFO.MY_ACCOUNT')}</FirstTitle>
      <SingleContainer>
        <FlexContainer>
          <AvatarSvg />
          {header.profile ? header.profile.displayName : 'Anonymous'}
        </FlexContainer>
        <Button>
          <Svg as={CameraSvg} />
          <UploadPhoto>{t('SETTINGS.ACCOUNT_INFO.UPLOAD_PHOTO')}</UploadPhoto>
        </Button>
      </SingleContainer>
      <SignOutButton
        onClick={() => {
          logOut(dispatch, navigate);
        }}
      >
        Sign out from account
      </SignOutButton>
      <Title>{t('SETTINGS.ACCOUNT_INFO.ACCOUNT_INFORMATION')}</Title>
      <MultilineContainer>
        <ItemContainer>
          <div>
            <ItemTitle>{t('SETTINGS.ACCOUNT_INFO.AUTH')}</ItemTitle>
            <div>{header.profile ? header.profile.providerId : ''}</div>
          </div>
        </ItemContainer>
        <ItemContainer>
          <div>
            <ItemTitle>{t('SETTINGS.ACCOUNT_INFO.USER_NAME')}</ItemTitle>
            <div>
              {header.profile ? header.profile.displayName : 'Anonymous'}
            </div>
          </div>
          <EditButton>{t('SETTINGS.ACCOUNT_INFO.EDIT')}</EditButton>
        </ItemContainer>
        <ItemContainer>
          <div>
            <ItemTitle>{t('SETTINGS.ACCOUNT_INFO.JOINED')}</ItemTitle>
            <div>
              {header.profile && header.profile.createdAt
                ? dateFormatter.format(header.profile.createdAt)
                : ''}
            </div>
          </div>
        </ItemContainer>
        <ItemContainer>
          <div>
            <ItemTitle>{t('SETTINGS.ACCOUNT_INFO.EMAIL')}</ItemTitle>
            <div>{header.profile ? header.profile.email : ''}</div>
          </div>
          <EditButton>{t('SETTINGS.ACCOUNT_INFO.EDIT')}</EditButton>
        </ItemContainer>
        {header.profile && header.profile.password ? (
          <ItemContainer>
            <div>
              <ItemTitle>{t('SETTINGS.ACCOUNT_INFO.PASSWORD')}</ItemTitle>
              <div>{header.profile.password}</div>
            </div>
            <EditButton>{t('SETTINGS.ACCOUNT_INFO.EDIT')}</EditButton>
          </ItemContainer>
        ) : (
          ''
        )}
      </MultilineContainer>
      <Title>{t('SETTINGS.ACCOUNT_INFO.DELETING_ACCOUNT')}</Title>
      <SingleContainer>
        <DeleteButton
          onClick={() => {
            navigate(pages.accountDeleting);
          }}
        >
          {t('SETTINGS.ACCOUNT_INFO.DELETE_ACCOUNT')}
        </DeleteButton>
      </SingleContainer>
    </MobContainer>
  );
}

export default Account;
