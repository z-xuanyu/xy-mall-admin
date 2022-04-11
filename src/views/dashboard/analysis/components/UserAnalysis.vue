<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-04-11 14:45:51
 * @LastEditTime: 2022-04-11 15:17:24
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { onMounted, PropType, ref } from 'vue';
  import { Card } from 'ant-design-vue';
  import { useECharts } from '/@/hooks/web/useECharts';

  const props = defineProps({
    width: {
      type: String as PropType<string>,
      default: '100%',
    },
    height: {
      type: String as PropType<string>,
      default: '280px',
    },
    // 时间轴
    dataTime: {
      type: Array,
      default: () => [],
    },
    // 人数
    number: {
      type: Array,
      default: () => [],
    },
  });

  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions, echarts } = useECharts(chartRef as Ref<HTMLDivElement>);

  onMounted(() => {
    setOptions({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            width: 1,
            color: '#019680',
          },
        },
      },
      grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
      xAxis: {
        type: 'category',
        data: props.dataTime,
      },
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: '人数',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0,
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(128, 255, 165)',
              },
              {
                offset: 1,
                color: 'rgb(1, 191, 236)',
              },
            ]),
          },
          emphasis: {
            focus: 'series',
          },
          data: [
            140, 232, 101, 264, 90, 340, 250, 155, 88, 45, 288, 99, 344, 466, 155, 166, 80, 444,
            555, 666, 125, 888, 999, 1000, 888, 777, 555, 599, 120, 66, 11,
          ],
        },
      ],
    });
  });
</script>

<template>
  <Card>
    <template #title>
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <div class="inline-block p-2 rounded-full bg-blue-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              width="10px"
              height="10px"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 512 512"
              class="text-blue-500"
            >
              <path
                fill="currentColor"
                d="M320 32H192a32 32 0 0 0-32 32v412a4 4 0 0 0 4 4h184a4 4 0 0 0 4-4V64a32 32 0 0 0-32-32Zm144 160h-72a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8h80a24 24 0 0 0 24-24V224a32 32 0 0 0-32-32ZM48 128a32 32 0 0 0-32 32v296a24 24 0 0 0 24 24h80a8 8 0 0 0 8-8V136a8 8 0 0 0-8-8Z"
              />
            </svg>
          </div>
          <span class="ml-2">用户</span>
        </div>
      </div>
    </template>
    <div ref="chartRef" :style="{ height, width }"></div>
  </Card>
</template>

<style scoped></style>
