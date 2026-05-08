import { TEXT } from '../app/ui-text';

export const PROFILE_FIELDS = [
  { key: 'name', label: TEXT.PROFILE.NAME, placeholder: TEXT.PROFILE.NAME_PLACEHOLDER, section: 'account' },
  { key: 'phone', label: TEXT.PROFILE.PHONE, placeholder: TEXT.PROFILE.PHONE_PLACEHOLDER, section: 'contact', type: 'tel' },
  { key: 'street', label: TEXT.PROFILE.STREET, placeholder: TEXT.PROFILE.STREET_PLACEHOLDER, section: 'address' },
  { key: 'building', label: TEXT.PROFILE.BUILDING, placeholder: TEXT.PROFILE.BUILDING_PLACEHOLDER, section: 'address' },
  { key: 'area', label: TEXT.PROFILE.AREA, placeholder: TEXT.PROFILE.AREA_PLACEHOLDER, section: 'address' },
  { key: 'conservative', label: TEXT.PROFILE.CONSERVATIVE, placeholder: TEXT.PROFILE.CONSERVATIVE_PLACEHOLDER, section: 'address' },
  { key: 'locationUrl', label: TEXT.PROFILE.LOCATION_URL, placeholder: TEXT.PROFILE.LOCATION_URL_PLACEHOLDER, section: 'location', type: 'url' },
  { key: 'notes', label: TEXT.PROFILE.NOTES, placeholder: TEXT.PROFILE.NOTES_PLACEHOLDER, section: 'notes', textarea: true },
];

export const PROFILE_SECTIONS = {
  account: { title: TEXT.PROFILE.SECTION_ACCOUNT, fields: ['name'] },
  contact: { title: TEXT.PROFILE.SECTION_CONTACT, fields: ['phone'] },
  address: { title: TEXT.PROFILE.SECTION_ADDRESS, fields: ['conservative', 'area', 'street', 'building'] },
  location: { title: TEXT.PROFILE.SECTION_LOCATION, fields: ['locationUrl'] },
  notes: { title: TEXT.PROFILE.SECTION_NOTES, fields: ['notes'] },
};

export const PROFILE_TEXT = {
  STATS_COMPLETION: 'اكتمال البيانات',
  STATS_ROLE: 'الصلاحية',
  ROLE_ADMIN: 'Admin',
  ROLE_USER: 'User',
};

export const EMPTY_PROFILE_FORM = {
  name: '',
  phone: '',
  street: '',
  building: '',
  area: '',
  conservative: '',
  locationUrl: '',
  notes: '',
};
