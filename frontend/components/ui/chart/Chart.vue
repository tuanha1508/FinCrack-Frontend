<template>
  <div class="chart-container" :class="className">
    <div v-if="title || subtitle" class="mb-4">
      <h3 v-if="title" class="text-lg font-medium">{{ title }}</h3>
      <p v-if="subtitle" class="text-sm text-gray-400">{{ subtitle }}</p>
    </div>
    <canvas ref="chartCanvas" :height="height"></canvas>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { useTheme } from '@/composables/useTheme';
import type { Chart, ChartType, ChartOptions, ChartData } from 'chart.js';

interface SeriesItem {
  name?: string;
  data: number[];
  [key: string]: any;
}

const props = defineProps({
  type: {
    type: String,
    default: 'line',
    validator: (value: string) => ['line', 'area', 'bar', 'pie', 'donut', 'radar'].includes(value)
  },
  series: {
    type: Array as () => SeriesItem[],
    required: true
  },
  categories: {
    type: Array as () => string[],
    default: () => []
  },
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  height: {
    type: [Number, String],
    default: 350
  },
  options: {
    type: Object,
    default: () => ({})
  },
  className: {
    type: String,
    default: ''
  }
});

const { isDark } = useTheme();
const chartCanvas = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

const getChartType = (): ChartType => {
  // Map chart types to Chart.js types
  const typeMap: Record<string, ChartType> = {
    'area': 'line',
    'donut': 'doughnut'
  };
  
  return (typeMap[props.type] || props.type) as ChartType;
};

const getChartData = (): ChartData => {
  return {
    labels: props.categories,
    datasets: props.series.map((item: SeriesItem, index: number) => {
      const colors = ['#2563eb', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];
      const color = colors[index % colors.length];
      
      return {
        label: item.name || `Series ${index + 1}`,
        data: item.data,
        backgroundColor: props.type === 'line' ? 'transparent' : color,
        borderColor: color,
        fill: props.type === 'area',
        tension: 0.4
      };
    })
  };
};

const getChartOptions = (): ChartOptions => {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          color: '#94a3b8'
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      x: {
        grid: {
          color: '#334155'
        },
        ticks: {
          color: '#94a3b8'
        }
      },
      y: {
        grid: {
          color: '#334155' 
        },
        ticks: {
          color: '#94a3b8'
        }
      }
    }
  };

  return {
    ...defaultOptions,
    ...props.options
  } as ChartOptions;
};

onMounted(async () => {
  if (typeof window !== 'undefined' && chartCanvas.value) {
    const { Chart } = await import('chart.js/auto');
    chartInstance = new Chart(chartCanvas.value, {
      type: getChartType(),
      data: getChartData(),
      options: getChartOptions()
    });
  }
});

// Update chart when props change
watch([() => props.series, () => props.categories, isDark], () => {
  if (chartInstance) {
    chartInstance.data = getChartData();
    chartInstance.options = getChartOptions();
    chartInstance.update();
  }
});

// Clean up chart instance when component is unmounted
onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }
});
</script> 