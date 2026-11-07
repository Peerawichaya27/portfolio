import { HomePage } from '@/features/home/home-page';
import { homeMetadata } from '@/i18n/metadata';

export const metadata = homeMetadata('en');

export default function Page() {
  return <HomePage lang="en" />;
}
