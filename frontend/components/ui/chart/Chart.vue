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
  backgroundColor?: string;
  borderColor?: string;
  fill?: boolean;
  tension?: number;
  pointBackgroundColor?: string;
  pointBorderColor?: string;
  pointHoverBackgroundColor?: string;
  pointHoverBorderColor?: string;
  borderWidth?: number;
  pointBorderWidth?: number;
  pointHoverBorderWidth?: number;
  pointRadius?: number;
  pointHoverRadius?: number;
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
      // Define default colors as fallback
      const defaultColors = ['#2563eb', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];
      const defaultColor = defaultColors[index % defaultColors.length];
      
      // Construct dataset, prioritizing properties from the series item
      return {
        label: item.name || `Series ${index + 1}`,
        data: item.data,
        // Use item's colors if provided, else fallback to default or type-specific logic
        backgroundColor: item.backgroundColor !== undefined 
          ? item.backgroundColor 
          : (props.type === 'line' || props.type === 'radar' ? 'transparent' : defaultColor),
        borderColor: item.borderColor || defaultColor,
        // Apply point styling from item if provided
        pointBackgroundColor: item.pointBackgroundColor, 
        pointBorderColor: item.pointBorderColor,
        pointHoverBackgroundColor: item.pointHoverBackgroundColor,
        pointHoverBorderColor: item.pointHoverBorderColor,
        // Apply border width from item if provided
        borderWidth: item.borderWidth,
        pointBorderWidth: item.pointBorderWidth,
        pointHoverBorderWidth: item.pointHoverBorderWidth,
        // Apply point radius from item if provided
        pointRadius: item.pointRadius,
        pointHoverRadius: item.pointHoverRadius,
        // Use item's fill setting if provided, else default based on type
        fill: item.fill !== undefined ? item.fill : props.type === 'area',
        // Use item's tension setting if provided, else default
        tension: item.tension !== undefined ? item.tension : 0.4,
        // Allow other dataset options from item to be passed through
        // Note: Be cautious with spreading item blindly if it conflicts with core settings
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