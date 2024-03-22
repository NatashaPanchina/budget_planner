import { EUR, KZT, RUB, USD } from '@dinero.js/currencies';
import { ReactComponent as USDIcon } from '../../assets/icons/currencies/usd.svg';
import { ReactComponent as EURIcon } from '../../assets/icons/currencies/eur.svg';
import { ReactComponent as RUBIcon } from '../../assets/icons/currencies/rub.svg';
import { ReactComponent as KZTIcon } from '../../assets/icons/currencies/kzt.svg';

export const currencies = {
  USD: USD,
  EUR: EUR,
  RUB: RUB,
  KZT: KZT,
};

export const names = {
  USD: 'USD',
  EUR: 'EUR',
  RUB: 'RUB',
  KZT: 'KZT',
};

export const symbols = {
  USD: '$',
  EUR: '€',
  RUB: '₽',
  KZT: '₸',
};

export const icons = {
  USD: USDIcon,
  EUR: EURIcon,
  RUB: RUBIcon,
  KZT: KZTIcon,
};
