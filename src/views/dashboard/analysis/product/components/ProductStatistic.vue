<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-12-24 14:44:22
 * @LastEditTime: 2022-04-12 10:16:03
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
      default: '400px',
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
        data: ['支付金额', '退款金额', '商品浏览量', '商品访问量'],
      },
      grid: { left: '1%', right: '1%', top: '10%', bottom: 0, containLabel: true },
      xAxis: {
        type: 'category',
        data: props.dataTime,
      },
      yAxis: [
        {
          type: 'value',
          name: '支付金额',
          splitNumber: 4,
        },
        {
          type: 'value',
          name: '退款金额',
          splitNumber: 4,
        },
        {
          type: 'value',
          name: '商品浏览量',
          splitNumber: 4,
          axisLabel: {
            formatter: '{value}',
          },
        },
        {
          type: 'value',
          name: '商品访问量',
          splitNumber: 4,
          axisLabel: {
            formatter: '{value}',
          },
        },
      ],
      series: [
        {
          name: '支付金额',
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
                color: '#38ef7d',
              },
              {
                offset: 1,
                color: '#11998e',
              },
            ]),
          },
        },
        {
          name: '退款金额',
          data: [
            1000, 200, 333, 500, 3200, 420, 300, 200, 300, 510, 600, 3200, 400, 702, 1002, 200, 300,
            510, 300, 200, 333, 500, 300, 4200, 300, 200, 3000, 100, 600, 300,
          ],
          type: 'bar',
          barMaxWidth: 50,
          itemStyle: {
            borderRadius: [50, 50, 0, 0],
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#6dd5fa',
              },
              {
                offset: 1,
                color: '#2980b9',
              },
            ]),
          },
        },
        {
          name: '商品浏览量',
          type: 'line',
          yAxisIndex: 1,
          data: [
            100, 52, 88, 66, 10, 54, 66, 77, 31, 12, 45, 49, 77, 110, 150, 164, 48, 166, 188, 166,
            100, 52, 88, 66, 10, 54, 66, 77, 31, 12,
          ],
        },
        {
          name: '商品访问量',
          type: 'line',
          yAxisIndex: 1,
          data: [
            10, 52, 88, 66, 10, 54, 6, 77, 31, 12, 45, 49, 77, 110, 10, 14, 48, 16, 18, 16, 10, 52,
            88, 6, 10, 54, 66, 7, 31, 12,
          ],
        },
      ],
    });
  });
</script>
