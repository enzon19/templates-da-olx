<script>
  export let template;
</script>

<button on:click class="!text-left border p-2 rounded-lg hover:bg-neutral-100 min-w-96 max-w-full flex flex-row items-center gap-2 justify-between">
  <div>
    <h2 class="font-bold text-lg">{template.subject}</h2>
    <div class="text-sm w-96 truncate">{template.body}</div>
  </div>
  <div class="w-full text-right">
    <span class="w-full text-xs text-neutral-700">preço do anúncio</span>
    <h2 class="w-full text-xl font-semibold">R${template.price}</h2>
  </div>
</button>