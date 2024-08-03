import React from 'react';
import {
  DeleteButton,
  FirstTitle,
  FlexContainer,
  ItemContainer,
  SingleContainer,
  TextContainer,
  Title,
  MultilineContainer,
  SettingInfoContainer,
} from '../../Settings.styled';
import { useTranslation } from 'react-i18next';
import { ReactComponent as DesktopSvg } from '../../../../assets/icons/shared/desktopDevice.svg';
import { ReactComponent as MobileSvg } from '../../../../assets/icons/shared/mobileDevice.svg';
import { ReactComponent as BackIcon } from '../../../../assets/icons/shared/back.svg';
import { Grid, styled } from '@mui/material';
import { getDeviceInfo } from './utils';
import { BackLink, BackLinkSvg, Header } from '../../../../theme/global';
import { pages } from '../../../../utils/constants/pages';

const Svg = styled('svg')((props) => ({
  width: 60,
  height: 60,
  paddingRight: props.theme.spacing(3),
}));

const LogOutButton = styled(DeleteButton)((props) => ({
  marginTop: props.theme.spacing(4),
}));

const ItemBlock = styled(ItemContainer)((props) => ({
  padding: `${props.theme.spacing(4)} 0px`,
}));

export default function Devices() {
  const { t } = useTranslation();
  const currentDevice = getDeviceInfo();
  const OS = currentDevice.OS ? currentDevice.OS : 'Hidden';
  const browser = currentDevice.browser ? currentDevice.browser : '';
  const location = currentDevice.location;
  console.log(window.navigator);

  return (
    <Grid item xs={12}>
      <Header>
        <BackLink to={pages.settings.main}>
          <BackLinkSvg as={BackIcon} />
        </BackLink>
        {t('SETTINGS.ACCOUNT_SETTINGS')}
      </Header>
      <SettingInfoContainer>
        <FirstTitle>{t('SETTINGS.DEVICES_INFO.DEVICES')}</FirstTitle>
        <TextContainer>
          {t('SETTINGS.DEVICES_INFO.ALL_DEVICES_DESCRIPTION')}
        </TextContainer>
        <TextContainer>
          {t('SETTINGS.DEVICES_INFO.CHANGE_PASSWORD_DESCRIPTION')}
        </TextContainer>
        <Title>{t('SETTINGS.DEVICES_INFO.CURRENT_DEVICE')}</Title>
        <SingleContainer>
          <FlexContainer>
            <Svg as={DesktopSvg} />
            <div>
              <div>{`${OS} * ${browser}`}</div>
              <div>{location}</div>
            </div>
          </FlexContainer>
        </SingleContainer>
        <Title>{t('SETTINGS.DEVICES_INFO.OTHER_DEVICES')}</Title>
        <MultilineContainer>
          <ItemBlock>
            <FlexContainer>
              <Svg as={MobileSvg} />
              <div>
                <div>Windows * Google Chrome</div>
                <div>Almaty, Kazakhstan</div>
              </div>
            </FlexContainer>
          </ItemBlock>
          <ItemBlock>
            <FlexContainer>
              <Svg as={MobileSvg} />
              <div>
                <div>Windows * Google Chrome</div>
                <div>Almaty, Kazakhstan</div>
              </div>
            </FlexContainer>
          </ItemBlock>
        </MultilineContainer>
        <Title>{t('SETTINGS.DEVICES_INFO.LOG_OUT')}</Title>
        <SingleContainer>
          <div>
            <div>{t('SETTINGS.DEVICES_INFO.LOG_OUT_DESCRIPTION')}</div>
            <LogOutButton>
              {t('SETTINGS.DEVICES_INFO.LOG_OUT_BUTTON')}
            </LogOutButton>
          </div>
        </SingleContainer>
      </SettingInfoContainer>
    </Grid>
  );
}
