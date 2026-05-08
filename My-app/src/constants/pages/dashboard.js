import { TEXT } from '../app/ui-text';

export const DASHBOARD_TABS = [
  { key: 'all', label: TEXT.ADMIN.ALL_SHOPS, icon: 'list', hint: 'استعرض كل المحلات وامسح أو حدّث بياناتها' },
  { key: 'edit', label: TEXT.ADMIN.EDIT_SHOP, icon: 'edit', hint: 'ابحث عن محل وعدّل تفاصيله' },
  { key: 'add', label: TEXT.ADMIN.ADD_SHOP, icon: 'plus', hint: 'أضف محل جديد إلى الدليل' },
  { key: 'users', label: TEXT.ADMIN.MANAGE_USERS, icon: 'users', hint: 'إدارة الحسابات والصلاحيات' },
];

export const DASHBOARD_TEXT = {
  TITLE: 'لوحة التحكم — دليلك',
  BACK_TO_SITE: '← العودة للموقع',
};

export const ALL_SHOPS_TEXT = {
  CONFIRM_DELETE_TITLE: 'حذف المحل',
  CONFIRM_DELETE_MESSAGE: (name) => `سيتم حذف "${name}" نهائياً ولا يمكن التراجع.`,
  CONFIRM_DELETE_OK: 'حذف',
  CONFIRM_DELETE_CANCEL: 'إلغاء',
  ERROR_TITLE: 'تعذّر تحميل المحلات',
  EMPTY_RESULTS: 'لا توجد نتائج',
  EMPTY_RESULTS_DESC: 'جرب اسم آخر أو امسح البحث.',
  EMPTY_INITIAL_DESC: 'ابدأ بإضافة محلات لظهورها هنا.',
  SEARCH_PLACEHOLDER: 'بحث عن محل...',
  DELETED_TOAST: (name) => `تم حذف "${name}"`,
};

export const EDIT_SHOP_TEXT = {
  SEARCH_PLACEHOLDER: 'بحث عن محل بالاسم',
  NO_MATCH: 'لا يوجد محل بهذا الاسم',
  HINT: 'ابحث عن محل بالأعلى لاختياره وتعديل بياناته',
  CHOOSE_OTHER: 'اختيار محل آخر',
  EDITING: 'تعديل:',
  SAVED_TOAST: (name) => `تم حفظ تعديلات "${name}"`,
  SAVING_LABEL: 'جاري الحفظ...',
};

export const ADD_SHOP_TEXT = {
  ADDED_TOAST: (name) => `تمت إضافة "${name}"`,
};

export const USER_MGMT_TEXT = {
  ADD_BTN: 'إضافة',
  ADD_BTN_LOADING: '…',
  ADDED_TOAST: 'تمت إضافة المستخدم',
  CONFIRM_DELETE_TITLE: 'حذف المستخدم',
  CONFIRM_DELETE_MESSAGE: (email) => `سيتم حذف الحساب "${email}" نهائياً.`,
  CONFIRM_DELETE_OK: 'حذف',
  CONFIRM_DELETE_CANCEL: 'إلغاء',
  DELETED_TOAST: 'تم حذف المستخدم',
  EMPTY_TITLE: 'لا يوجد مستخدمون',
  EMPTY_DESC: 'ابدأ بإضافة أول مستخدم بالأعلى.',
};

export const ROLE_OPTIONS = [
  { value: 'user', label: 'user' },
  { value: 'admin', label: 'admin' },
];
