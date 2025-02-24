import { addIcon, loadIcon } from "@iconify/react";

// List of all icons used in the application
// Add icons here as they are used in the application
const baseIcons = [
  'feather:arrow-left',
  'feather:arrow-right',
  'feather:play',
  'feather:pause',
  'feather:check',
  'feather:edit',
  'feather:search',
  'feather:navigation',
  'feather:settings',
  'feather:alert-triangle',
  'feather:zap',
  'feather:coffee',
  'feather:globe',
  'feather:twitter',
  'feather:github',
  'feather:eye-off',
  'feather:eye',
  'feather:maximize-2',
  'feather:minimize-2',
];

/**
 * Pre-caches all common icons used in the application.
 * This ensures icons are available offline once loaded.
 */
export async function preloadBaseIcons() {
  try {
    await Promise.all(baseIcons.map(async (iconName) => {
      try {
        const iconData = await loadIcon(iconName);
        if (iconData) {
          addIcon(iconName, iconData);
        }
      } catch (error) {
        console.warn(`Failed to load icon: ${iconName}`, error);
      }
    }));
    console.log('Icons pre-cached successfully');
  } catch (error) {
    console.error('Failed to pre-cache icons:', error);
  }
}

export async function addIconData(iconName: string) {
  try {
    const iconData = await loadIcon(iconName);
    if (iconData) {
      addIcon(iconName, iconData);
    }
  } catch (error) {
    console.warn(`Failed to load icon: ${iconName}`, error);
  }
}