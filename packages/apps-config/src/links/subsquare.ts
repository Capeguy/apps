// Copyright 2017-2023 @polkadot/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BN } from '@polkadot/util';

import { externalLogos } from '../ui/logos';

export default {
  chains: {
    Acala: 'acala',
    Altair: 'altair',
    Basilisk: 'basilisk',
    Bifrost: 'bifrost',
    Centrifuge: 'centrifuge',
    Crust: 'crust',
    'Darwinia Crab': 'crab',
    HydraDX: 'hydradx',
    Interlay: 'interlay',
    Karura: 'karura',
    Khala: 'khala',
    Kusama: 'kusama',
    Litmus: 'litmus',
    Phala: 'phala',
    Polkadot: 'polkadot',
    'Turing Network': 'turing',
    Zeitgeist: 'zeitgeist',
    kintsugi: 'kintsugi'
  },
  create: (chain: string, path: string, data: BN | number | string): string =>
    `https://${chain}.subsquare.io/${path}/${data.toString()}`,
  isActive: true,
  logo: externalLogos.subsquare as string,
  paths: {
    bounty: 'treasury/bounty',
    council: 'council/motion',
    external: 'democracy/external',
    fellowshipReferenda: 'fellowship/referendum',
    proposal: 'democracy/proposal',
    referenda: 'referenda/referendum',
    referendum: 'democracy/referendum',
    tip: 'treasury/tip',
    treasury: 'treasury/proposal'
  },
  url: 'https://subsquare.io/'
};
