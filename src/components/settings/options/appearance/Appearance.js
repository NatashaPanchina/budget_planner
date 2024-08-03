import React, { useEffect, useState } from 'react';
import {
  FirstTitle,
  FlexContainer,
  SettingInfoContainer,
  Title,
} from '../../Settings.styled';
import { ReactComponent as LightModeSvg } from '../../../../assets/icons/shared/lightModeSettings.svg';
import { ReactComponent as DarkModeSvg } from '../../../../assets/icons/shared/darkModeSettings.svg';
import { ReactComponent as SystemModeSvg } from '../../../../assets/icons/shared/systemMode.svg';
import { ReactComponent as BackIcon } from '../../../../assets/icons/shared/back.svg';
import { Grid, Slider, styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../loading/Loading';
import { mode } from '../../../../utils/constants/mode';
import { useTranslation } from 'react-i18next';
import { marks, setMode, valuetext } from './utils';
import { BackLink, BackLinkSvg, Header } from '../../../../theme/global';
import { pages } from '../../../../utils/constants/pages';

const Container = styled(FlexContainer)((props) => ({
  paddingLeft: props.theme.spacing(8),
  paddingRight: props.theme.spacing(8),
}));

const ModeContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== '$isActive',
})((props) => ({
  marginRight: props.theme.spacing(8),
  textAlign: 'center',
  cursor: 'pointer',
  stroke: props.$isActive ? props.theme.colors.main.violet : '',
  color: props.$isActive
    ? props.theme.colors.main.violet
    : props.theme.colors.text.primary,
  '&:hover': {
    color: props.theme.colors.main.violet,
    stroke: props.theme.colors.main.violet,
  },
  strokeWidth: 2,
}));

const SystemModeContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== '$isActive',
})((props) => ({
  marginRight: props.theme.spacing(8),
  textAlign: 'center',
  cursor: 'pointer',
  fill: props.theme.colors.text.darker,
  color: props.$isActive
    ? props.theme.colors.main.violet
    : props.theme.colors.text.primary,
  '&:hover': {
    color: props.theme.colors.main.violet,
    fill: props.theme.colors.main.violet,
  },
}));

const ModeSvg = styled('svg')((props) => ({
  marginTop: props.theme.spacing(2),
  height: 45,
  width: 45,
  '& circle': {
    stroke: 'inherit',
    strokeWidth: 'inherit',
  },
}));

const SystemSvg = styled(ModeSvg)(() => ({
  fill: 'inherit',
  '& path': {
    fill: 'inherit',
  },
}));

const FontSlider = styled(Slider)((props) => ({
  color: props.theme.colors.main.violet,
  '& .MuiSlider-mark': {
    backgroundColor: props.theme.colors.text.ordinary,
    height: 16,
    width: 2,
    '&.MuiSlider-markActive': {
      opacity: 1,
      backgroundColor: 'currentColor',
    },
  },
  '& .MuiSlider-markLabel': {
    color: props.theme.colors.text.darker,
  },
  '& .MuiSlider-markLabelActive': {
    color: props.theme.colors.main.violet,
  },
}));

export default function Appearance() {
  const header = useSelector((state) => state.header);
  const dispatch = useDispatch();
  const [activeMode, setActiveMode] = useState(header.mode);
  const { t } = useTranslation();

  useEffect(() => {
    setActiveMode(header.mode);
  }, [header]);

  return header.status === 'loading' ? (
    <Loading />
  ) : (
    <Grid item xs={12}>
      <Header>
        <BackLink to={pages.settings.main}>
          <BackLinkSvg as={BackIcon} />
        </BackLink>
        {t('SETTINGS.APP_SETTINGS')}
      </Header>
      <SettingInfoContainer>
        <FirstTitle>{t('SETTINGS.APPEARANCE_INFO.APPEARANCE')}</FirstTitle>
        <FirstTitle>{t('SETTINGS.APPEARANCE_INFO.MODE')}</FirstTitle>
        <Container>
          <ModeContainer
            $isActive={activeMode === mode.light}
            onClick={() => setMode(mode.light, setActiveMode, dispatch)}
          >
            <div>
              <ModeSvg as={LightModeSvg} />
            </div>
            <div>{t('SETTINGS.APPEARANCE_INFO.LIGHT')}</div>
          </ModeContainer>
          <ModeContainer
            $isActive={activeMode === mode.dark}
            onClick={() => setMode(mode.dark, setActiveMode, dispatch)}
          >
            <div>
              <ModeSvg as={DarkModeSvg} />
            </div>
            <div>{t('SETTINGS.APPEARANCE_INFO.DARK')}</div>
          </ModeContainer>
          <SystemModeContainer>
            <div>
              <SystemSvg as={SystemModeSvg} />
            </div>
            <div>{t('SETTINGS.APPEARANCE_INFO.SYSTEM')}</div>
          </SystemModeContainer>
        </Container>
        <Title>{t('SETTINGS.APPEARANCE_INFO.FONT_SIZE')}</Title>
        <Container>
          <FontSlider
            defaultValue={16}
            step={1}
            marks={marks}
            min={12}
            max={20}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
          />
        </Container>
      </SettingInfoContainer>
    </Grid>
  );
}
