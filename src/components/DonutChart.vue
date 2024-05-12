<template>
  <div class="chart">
    <Doughnut :data="data" :options="options" v-if="data != undefined" />
  </div>
</template>

<script lang="ts">
export default {
  name: 'DonutChart',
};
</script>

<script lang="ts" setup>
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { convertSummaryTimeToString } from '../utils/converter';
import { injectStorage } from '../storage/inject-storage';
import { onMounted, ref } from 'vue';
import { StorageParams } from '../storage/storage-params';

const props = defineProps<{
  time: number[];
  labels: string[];
}>();

const settingsStorage = injectStorage();
const data = ref();
const options = ref();

onMounted(async () => {
    data.value = {
      labels: props.labels,
      datasets: [
        {
          borderWidth: 2,
          borderColor: '#fff' ,
          color: '#fff',
          backgroundColor: [
            '#5668e2',
            '#8a56e2',
            '#cf56e2',
            '#e256ae',
            '#e25668',
            '#e28956',
            '#e2cf56',
            '#d0ff82',
            '#aee256',
            '#68e256',
          ],
          data: props.time,
        },
      ],
    };
    options.value = {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: 0,
      },
      plugins: {
        legend: {
          position: 'right',
          labels: {
            usePointStyle: true,
            color: '#7f7f7f',
          },
        },
        legendDistance: {
          padding: 50,
        },
        tooltip: {
          callbacks: {
            label: function (context: any) {
              return convertSummaryTimeToString(context.raw);
            },
          },
        },
      },
    };
  

  ChartJS.register(ArcElement, Tooltip, Legend);
});
</script>

<style scoped>
.chart {
  height: 230px;
  margin: auto;
  width: 80%;
  margin-top: -10px;
  margin-bottom: 10px;
}
</style>
