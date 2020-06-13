import * as React from 'react';
import { ModalInfo, Modals } from '../../models';
import { AppContext } from '../../Context';
import LocationMarkerModal from './LocationMarkerModal';

export interface ModalRootProps {}

const ModalsContainer = ({}: ModalRootProps) => {
  return <LocationMarkerModal />;
};

export default ModalsContainer;
