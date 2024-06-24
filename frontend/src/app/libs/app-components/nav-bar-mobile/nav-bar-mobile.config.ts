import { NavBarMobileItem } from './nav-bar-mobile.model';
import { routingConfig } from '@app/libs/config/routing.config';

export const navBarMobileItems: NavBarMobileItem[] = [
  {
    title: 'Home',
    icon: 'home',
    link: routingConfig.home.fullPath,
  },
  {
    title: 'Study',
    icon: 'study',
    link: routingConfig.training.index.fullPath,
  },
  {
    title: 'Explore',
    icon: 'explore content',
    link: routingConfig.content.materials.fullPath,
  },
  {
    title: 'Words',
    icon: 'word list',
    link: routingConfig.dictionary.fullPath,
  },
  {
    title: 'Settings',
    icon: 'setting',
    link: routingConfig.settings.profile.fullPath,
  },
];
