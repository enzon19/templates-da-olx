<script lang="ts">
  export let otherClass: string  = '';
  export let type: 'grey' | 'outline' | 'orange' | 'red' = 'grey';
  const classOfEachType:object = {
    outline: 'border border-[#8994a9] text-sm hover:border-olx-purple-400 hover:text-olx-purple-400',
    orange: 'bg-olx-orange-500 hover:bg-olx-orange-600 text-white',
    red: 'bg-olx-red-500 hover:bg-olx-red-600 text-white',
  }
</script>

<button class="py-2 px-4 h-10 rounded-full transition-colors font-semibold outline-none {classOfEachType[type]} {otherClass}" {...$$restProps} on:click><slot/></button>