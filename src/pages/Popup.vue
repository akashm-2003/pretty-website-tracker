<template>
  <div class="headerBlock">
    <div class="d-inline-block">
      <img class="logo" height="30" src="../assets/icons/48x48.png" />
      <p class="header">Pretty Website Tracker</p>
    </div>
    <div class="icons-block">
      <a class="filter" @click="openPage(SettingsTab.Dashboard)"
        >{{ t('dashboard.message') }}<img height="22" src="../assets/icons/dashboard.svg"
      /></a>
      <a class="filter" @click="openPage(SettingsTab.GeneralSettings)"
        >{{ t('settings.message') }}<img height="22" src="../assets/icons/settings.svg"
      /></a>
    </div>
  </div>
  <div class="tabs">
    <input
      type="radio"
      id="todayTab"
      name="tab-control"
      checked
      v-on:change="selectTab(TypeOfList.Today)"
    />
    <input
      type="radio"
      id="allTimeTab"
      name="tab-control"
      v-on:change="selectTab(TypeOfList.All)"
    />
    <input
      type="radio"
      id="byDaysTab"
      name="tab-control"
      v-on:change="selectTab(TypeOfList.ByDays)"
    />
    <ul>
      <li title="Today">
        <label for="todayTab" role="button"
          ><span>{{ t('today.message') }}</span></label
        >
      </li>
      <li title="All The Time">
        <label for="allTimeTab" role="button"
          ><span>{{ t('allTime.message') }}</span></label
        >
      </li>
      <li title="By Days">
        <label for="byDaysTab" role="button"
          ><span>{{ t('byDays.message') }}</span></label
        >
      </li>
    </ul>

    <div class="slider"><div class="indicator"></div></div>
    <div class="content">
      <section id="todayTabList">
        <TabList
          v-if="activeTab == TypeOfList.Today"
          :type="TypeOfList.Today"
          :showAllStats="false"
        />
      </section>
      <section id="summary">
        <TabList v-if="activeTab == TypeOfList.All" :type="TypeOfList.All" :showAllStats="true" />
      </section>
      <section id="byDaysTabList">
        <ByDays v-if="activeTab == TypeOfList.ByDays" />
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import ByDays from '../components/ByDays.vue';
import TabList from '../components/TabList.vue';
import { injectStorage } from '../storage/inject-storage';
import { SettingsTab, TypeOfList } from '../utils/enums';
import { openPage } from '../utils/open-page';

const { t } = useI18n();


const activeTab = ref<TypeOfList>();

onMounted(async () => {
  activeTab.value = TypeOfList.Today;
});

function selectTab(type: TypeOfList) {
  activeTab.value = type;
}

function updateTab() {
  const tempValue = activeTab.value;
  activeTab.value = undefined;
  setTimeout(() => {
    activeTab.value = tempValue;
  }, 50);
}
</script>

<style scoped>
.headerBlock {
  height: 52px;
}
.headerBlock .header {
  font-size: 16px;
  padding: 0 0 0 5px;
  display: inline-block;
  font-weight: 600;
  color: #4a4a4a;
  vertical-align: text-bottom;
}

.headerBlock img {
  cursor: pointer;
  padding: 10px;
}
.headerBlock .logo {
  margin-left: 7px;
}
.headerBlock .icons-block {
  float: right;
  margin: 7px 0 0 0;
}

.headerBlock .icons-block a:hover {
  filter: invert(40%) sepia(94%) saturate(3371%) hue-rotate(227deg) brightness(99%) contrast(92%);
}

.headerBlock .icons-block a {
  font-size: 12px;
  cursor: pointer;
  font-weight: 600;
}

.headerBlock .icons-block a img {
  vertical-align: middle;
  padding-left: 5px !important;
}
.headerBlock .icons-block {
  vertical-align: middle;
}
</style>
