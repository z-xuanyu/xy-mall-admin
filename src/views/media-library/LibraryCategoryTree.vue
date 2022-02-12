<!--
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2022-01-07 16:10:58
 * @LastEditTime: 2022-02-12 17:54:34
 * @Description: Modify here please
-->
<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { Button, Popconfirm } from 'ant-design-vue';
  import { ScrollContainer } from '/@/components/Container/index';
  import { Icon } from '@iconify/vue';
  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { useModal } from '/@/components/Modal';
  import LibraryCategoryModal from './LibraryCategoryModal.vue';
  import { removeLibraryCategory, getLibraryCategoryList } from '/@/api/library-category';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { TransformTreeArr } from '/@/utils';

  const [registerModal, { openModal }] = useModal();
  const { createMessage } = useMessage();
  const treeData = ref<TreeItem[]>([]);

  defineProps({
    // 是否选择器卡片
    isSelectCard: {
      type: Boolean,
      default: false,
    },
  });

  onMounted(() => {
    fetch();
  });

  async function fetch() {
    const res = await getLibraryCategoryList();
    treeData.value = TransformTreeArr(res);
  }
  const emit = defineEmits(['select']);

  // 添加分组
  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
  }

  // 编辑
  function handleEdit(record) {
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  // 处理删除
  const handleDelete = async (record) => {
    await removeLibraryCategory(record._id);
    handleSuccess();
    createMessage.success('删除成功!');
  };

  // 添加成功
  function handleSuccess() {
    fetch();
  }
  // 选中
  function handleSelect(keys, e) {
    emit('select', e.node.dataRef._id);
  }
</script>

<template>
  <div class="h-[450px]" :class="!isSelectCard ? 'md:h-[800px]' : 'md:h-[500px]'">
    <ScrollContainer class="mt-4">
      <BasicTree
        title="分组名称"
        :treeData="treeData"
        :clickRowToExpand="true"
        :fieldNames="{ key: '_id', title: 'name' }"
        toolbar
        search
        @select="handleSelect"
      >
        <template #title="item">
          <div class="flex w-full justify-between cursor-pointer">
            <div class="flex items-center">
              <Icon icon="bx:bxs-folder-open" width="24" color="rgb(255,206,49)" />
              <span class="ml-2">{{ item.name }}</span>
            </div>
            <div class="flex items-center space-x-2" v-if="!isSelectCard">
              <Icon icon="carbon:edit" width="20" @click.stop="handleEdit(item)" />
              <Popconfirm
                title="您确认删除该分类?"
                @confirm.prevent="handleDelete(item)"
                @click.stop
              >
                <Icon icon="carbon:delete" width="20" />
              </Popconfirm>
            </div>
          </div>
        </template>
      </BasicTree>
    </ScrollContainer>
  </div>
  <div class="text-center py-5" v-if="!isSelectCard">
    <Button type="primary" @click="handleCreate">新建分组</Button>
  </div>
  <LibraryCategoryModal @register="registerModal" @success="handleSuccess" v-if="!isSelectCard" />
</template>
