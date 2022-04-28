import { ReactChildren, ReactChild } from 'react';

export default interface AuxProps {
  children: ReactChild | ReactChild[] | ReactChildren | ReactChildren[];
}
