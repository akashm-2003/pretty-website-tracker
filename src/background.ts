import Browser from 'webextension-polyfill';
import { Settings } from './functions/settings';
import { scheduleJobs } from './jobs/sheduler';
import { injectTabsRepositorySingleton } from './repository/inject-tabs-repository';
import { injectStorage } from './storage/inject-storage';
import { StorageParams } from './storage/storage-params';
import { initTracker } from './tracker';
import { todayLocalDate } from './utils/date';
import { logger } from './utils/logger';
import { Messages } from './utils/messages';

logger.log('Start background script');

self.onerror = err => {
  console.error('Unhandled error:', err);
};

Browser.storage.onChanged.addListener(async (changes, namespace) => {
  for (var key in changes) {
    if (Object.values(StorageParams).includes(key as StorageParams))
      await Settings.getInstance().reloadSetting(key as StorageParams);
  }
});

Browser.runtime.onInstalled.addListener(async details => {
  if (details.reason == 'install') {
    logger.log('Extension installed:', details);
    const settingsStorage = injectStorage();
    await settingsStorage.saveValue(StorageParams.INSTALL_DATE, todayLocalDate());
  }
});

Browser.runtime.onStartup.addListener(() => {
  logger.log(`onStartup event`);
});

Browser.windows.onFocusChanged.addListener(() => {
  logger.log('onFocusChanged');
});

scheduleJobs();
initTracker();

Browser.runtime.onMessage.addListener(async message => {
  if (message == Messages.ClearAllData) {
    const storage = injectStorage();
    const repo = await injectTabsRepositorySingleton();
    repo.removeAllTabs();
    await storage.saveTabs([]);
  }
  if (message.message == Messages.Restore) {
    const storage = injectStorage();
    await storage.saveTabs(message.data);
    const repo = await injectTabsRepositorySingleton();
    repo.initAsync();
  }
});
