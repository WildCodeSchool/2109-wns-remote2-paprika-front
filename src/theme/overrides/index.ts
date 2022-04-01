import { merge } from 'lodash';
import Button from './Button';

export default function componentsOverride(theme: Object) {
  return merge(
    Button(theme),
  );
}
