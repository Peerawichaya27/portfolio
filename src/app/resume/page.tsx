import { permanentRedirect } from 'next/navigation';
import { legacyDestinations } from '@/navigation/legacy';

export default function Page() {
  permanentRedirect(legacyDestinations.resume);
}
