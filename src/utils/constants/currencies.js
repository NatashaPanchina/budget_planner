import { EUR, KZT, RUB, USD, BYN, CNY } from '@dinero.js/currencies';
import { ReactComponent as USDIcon } from '../../assets/icons/currencies/usd.svg';
import { ReactComponent as EURIcon } from '../../assets/icons/currencies/eur.svg';
import { ReactComponent as RUBIcon } from '../../assets/icons/currencies/rub.svg';
import { ReactComponent as KZTIcon } from '../../assets/icons/currencies/kzt.svg';
import { ReactComponent as BYNIcon } from '../../assets/icons/currencies/br.svg';
import { ReactComponent as CNYIcon } from '../../assets/icons/currencies/cny.svg';

export const currencies = {
  USD: USD,
  EUR: EUR,
  RUB: RUB,
  KZT: KZT,
  BYN: BYN,
  CNY: CNY,
};

export const names = {
  USD: 'USD',
  EUR: 'EUR',
  RUB: 'RUB',
  KZT: 'KZT',
  BYN: 'BYN',
  CNY: 'CNY',
};

export const symbols = {
  USD: '$',
  EUR: '€',
  RUB: '₽',
  KZT: '₸',
  BYN: 'Br',
  CNY: '¥',
};

export const icons = {
  USD: USDIcon,
  EUR: EURIcon,
  RUB: RUBIcon,
  KZT: KZTIcon,
  BYN: BYNIcon,
  CNY: CNYIcon,
};
