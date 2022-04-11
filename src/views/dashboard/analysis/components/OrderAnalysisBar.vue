<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-12-24 14:44:22
 * @LastEditTime: 2022-04-11 14:40:53
 * @Description: Modify here please
-->
<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts" setup>
  import { onMounted, ref, Ref, PropType } from 'vue';
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
    // 金额
    amountData: {
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
      legend: {
        top: 0,
        data: ['订单金额', '订单数'],
      },
      grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
      xAxis: {
        type: 'category',
        data: props.dataTime,
      },
      yAxis: [
        {
          type: 'value',
          name: '订单金额',
          splitNumber: 4,
        },
        {
          type: 'value',
          name: '订单数',
          splitNumber: 4,
          axisLabel: {
            formatter: '{value}',
          },
        },
      ],
      series: [
        {
          name: '订单金额',
          data: [
            3000, 2000, 3333, 5000, 3200, 4200, 3200, 2100, 3000, 5100, 6000, 3200, 4800, 7002,
            10002, 2000, 3200, 5100, 3000, 2000, 3333, 5000, 3200, 4200, 3200, 2100, 3000, 5100,
            6000, 3200,
          ],
          type: 'bar',
          barMaxWidth: 50,
          itemStyle: {
            borderRadius: [50, 50, 0, 0],
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#3B82F6',
              },
              {
                offset: 1,
                color: '#93C5FD',
              },
            ]),
          },
        },
        {
          name: '订单数',
          type: 'line',
          yAxisIndex: 1,
          data: [
            100, 52, 88, 66, 10, 54, 66, 77, 31, 12, 45, 49, 77, 110, 150, 164, 48, 166, 188, 166,
            100, 52, 88, 66, 10, 54, 66, 77, 31, 12,
          ],
        },
      ],
    });
  });
</script>
