<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-04-11 15:14:59
 * @LastEditTime: 2022-04-11 15:20:59
 * @Description: Modify here please
-->
<template>
  <Card :loading="loading">
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
          <span class="ml-2">购买用户统计</span>
        </div>
      </div>
    </template>
    <div ref="chartRef" :style="{ width, height }"></div>
  </Card>
</template>
<script lang="ts" setup>
  import { Ref, ref, watch } from 'vue';
  import { Card } from 'ant-design-vue';
  import { useECharts } from '/@/hooks/web/useECharts';

  const props = defineProps({
    loading: Boolean,
    width: {
      type: String as PropType<string>,
      default: '100%',
    },
    height: {
      type: String as PropType<string>,
      default: '300px',
    },
  });

  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
  watch(
    () => props.loading,
    () => {
      if (props.loading) {
        return;
      }
      setOptions({
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          left: 'right',
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: '未消费用户' },
              { value: 735, name: '消费一次用户' },
              { value: 580, name: '留存客户' },
              { value: 484, name: '回流客户' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      });
    },
    { immediate: true },
  );
</script>
