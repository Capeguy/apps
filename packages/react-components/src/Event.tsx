// Copyright 2017-2023 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DecodedEvent } from '@polkadot/api-contract/types';
import type { Bytes } from '@polkadot/types';
import type { Event } from '@polkadot/types/interfaces';
import type { Codec } from '@polkadot/types/types';

import React, { useMemo } from 'react';

import { Input } from '@polkadot/react-components';
import { balanceEvents, balanceEventsOverrides } from '@polkadot/react-components/constants';
import Params from '@polkadot/react-params';

import { useTranslation } from './translate';
import { getContractAbi } from './util';

export interface Props {
  children?: React.ReactNode;
  className?: string;
  eventName?: string;
  value: Event;
  withExpander?: boolean;
}

interface Value {
  isValid: boolean;
  value: Codec;
}

interface AbiEvent extends DecodedEvent {
  values: Value[];
}

function EventDisplay ({ children, className = '', eventName, value, withExpander }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const names = value.data.names;
  const params = value.typeDef.map((type, i) => ({
    name: (names && names[i]) || undefined,
    type
  }));
  const values = value.data.map((value) => ({ isValid: true, value }));

  const overrides = useMemo(
    () => eventName && balanceEvents.includes(eventName)
      ? balanceEventsOverrides
      : undefined,
    [eventName]
  );

  const abiEvent = useMemo(
    (): AbiEvent | null => {
      // for contracts, we decode the actual event
      if (value.section === 'contracts' && value.method === 'ContractExecution' && value.data.length === 2) {
        // see if we have info for this contract
        const [accountId, encoded] = value.data;

        try {
          const abi = getContractAbi(accountId.toString());

          if (abi) {
            const decoded = abi.decodeEvent(encoded as Bytes);

            return {
              ...decoded,
              values: decoded.args.map((value) => ({ isValid: true, value }))
            };
          }
        } catch (error) {
          // ABI mismatch?
          console.error(error);
        }
      }

      return null;
    },
    [value]
  );

  return (
    <div className={`ui--Event ${className}`}>
      {children}
      <Params
        isDisabled
        overrides={overrides}
        params={params}
        values={values}
        withExpander={withExpander}
      >
        {abiEvent && (
          <>
            <Input
              isDisabled
              label={t<string>('contract event')}
              value={abiEvent.event.identifier}
            />
            <Params
              isDisabled
              params={abiEvent.event.args}
              values={abiEvent.values}
            />
          </>
        )}
      </Params>
    </div>
  );
}

export default React.memo(EventDisplay);
