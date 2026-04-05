<script setup>
import { ref, watchEffect } from 'vue';
import getPowerSet from './power-set'

const props = defineProps({
  goods: {
    type: Object,
    default: () => ({ specs: [], skus: [] })
  }
})
const emit = defineEmits(['change'])

const spliter = '★'
// 得到所有有库存的商品的规格组合，存储在pathMap中
//key: 规格组合（用分隔符连接） value: 具有该规格组合的skuId列表
//(实际value只用到所有选项的规则组合,其value只有一条skuid)
const getPathMap = (skus) => {
  const pathMap = {}
  if (skus && skus.length > 0) {
    skus.forEach(sku => {
      if (sku.inventory) {
        const specs = sku.specs.map(spec => spec.valueName)
        const powerSet = getPowerSet(specs)

        powerSet.forEach(set => {
          const key = set.join(spliter)
          if (!pathMap[key]) {
            pathMap[key] = []
          }
          pathMap[key].push(sku.id)
        })
      }
    })
  }
  return pathMap
}

// 初始化禁用状态
const initDisableStatus = (specs, pathMap) => {
  if (specs && specs.length > 0) {
    specs.forEach(spec => {
      spec.values.forEach(val => {
        // 设置禁用状态
        val.disabled = !pathMap[val.name]
      })
    })
  }
}

// 更新禁用状态
const updateDisabledStatus = (specs, pathMap) => {
  specs.forEach((item, i) => {
    const selectedArr = getSelectedArr(specs)
    item.values.forEach(val => {
      if (!val.selected) {
        selectedArr[i] = val.name
        const key = selectedArr.filter(Boolean).join(spliter)
        val.disabled = !pathMap[key]
      }
    })
  })
}

// 获取当前选中的规格组合
const getSelectedArr = (specs) => {
  const selectedArr = []
  specs.forEach((spec, index) => {
    const selected = spec.values.find(v => v.selected)
    if (selected) {
      selectedArr[index] = selected.name
    } else {
      selectedArr[index] = undefined
    }
  })
  return selectedArr
}

const pathMap = ref({})
watchEffect(() => {
  //1. 监听goods.skus变化 生成pathMap
  pathMap.value = getPathMap(props.goods.skus)
  // 2. 监听goods.specs变化 初始化禁用状态
  initDisableStatus(props.goods.specs, pathMap.value)
})

const clickSpecs = (item, val) => {
  if (val.disabled) return

  if (val.selected) {
    // 取消选中
    val.selected = false
  } else {
    // 选中
    // 同一规格下只能选中一个 先取消同一规格下的其他选项的选中状态
    item.values.forEach(v => v.selected = false)
    val.selected = true
  }

  //点击选项后 需要根据最新的选中状态 更新其他选项的禁用状态
  updateDisabledStatus(props.goods.specs, pathMap.value)

  const selectedArr = getSelectedArr(props.goods.specs).filter(Boolean)
  if (selectedArr.length === props.goods.specs.length) {
    const skuId = pathMap.value[selectedArr.join(spliter)][0]
    const sku = props.goods.skus.find(s => s.id === skuId)
    emit('change', {
      skuId: sku.id,
      price: sku.price,
      oldPrice: sku.oldPrice,
      inventory: sku.inventory,
      specsText: sku.specs.reduce((p, n) => `${p} ${n.name}：${n.valueName}`, '').trim()
    })
  } else {
    emit('change', {})
  }
}
</script>

<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <img :class="{ selected: val.selected, disabled: val.disabled }" @click="clickSpecs(item, val)"
            v-if="val.picture" :src="val.picture" />
          <span :class="{ selected: val.selected, disabled: val.disabled }" @click="clickSpecs(item, val)" v-else>{{
            val.name
          }}</span>
        </template>
      </dd>
    </dl>
  </div>
</template>

<style scoped lang="scss">
@mixin sku-state-mixin {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;

  &.selected {
    border-color: $xtxColor;
  }

  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}

.goods-sku {
  padding-left: 10px;
  padding-top: 20px;

  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      flex: 1;
      color: #666;

      >img {
        width: 50px;
        height: 50px;
        margin-bottom: 4px;
        @include sku-state-mixin;
      }

      >span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        margin-bottom: 4px;
        @include sku-state-mixin;
      }
    }
  }
}
</style>