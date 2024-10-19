<script lang="ts">
  import Button from '../components/Button.svelte';
  import { Storage } from "@plasmohq/storage"
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  const storage = new Storage();

  export let data: any;
  // export let context:string = 'modal';
    
  $: templateData = structuredClone(data);
  $: advancedSettings = Object.entries(templateData || {}).filter(([key]) => !['subject', 'body', 'zipcode', 'price', 'id', 'exchange'].includes(key));
  
  function handleSubmit(e) {
    const formData = new FormData(e.target);

    const formDataObj:any = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value;
    });

    formDataObj.id = formDataObj.id || Date.now();
    storage.set(formDataObj.id, formDataObj).then(e => console.log('Template salvo!'));
    dispatch('savedTemplate');
  }
</script>

<div data-ds-componet="DS-Alertbox" class="p-3 bg-neutral-100 rounded-lg text-neutral-700 flex flex-row gap-3" role="status">
  <div class="w-min">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M12,22.75 C6.06293894,22.75 1.25,17.9370611 1.25,12 C1.25,6.06293894 6.06293894,1.25 12,1.25 C17.9370611,1.25 22.75,6.06293894 22.75,12 C22.75,17.9370611 17.9370611,22.75 12,22.75 Z M12,21.25 C17.1086339,21.25 21.25,17.1086339 21.25,12 C21.25,6.89136606 17.1086339,2.75 12,2.75 C6.89136606,2.75 2.75,6.89136606 2.75,12 C2.75,17.1086339 6.89136606,21.25 12,21.25 Z M12.75,16 C12.75,16.4142136 12.4142136,16.75 12,16.75 C11.5857864,16.75 11.25,16.4142136 11.25,16 L11.25,12 C11.25,11.5857864 11.5857864,11.25 12,11.25 C12.4142136,11.25 12.75,11.5857864 12.75,12 L12.75,16 Z M12,10 C11.4477153,10 11,9.55228475 11,9 C11,8.44771525 11.4477153,8 12,8 C12.5522847,8 13,8.44771525 13,9 C13,9.55228475 12.5522847,10 12,10 Z"></path></svg>
  </div>
  <span class="olx-text olx-text--body-small olx-text--block olx-text--regular">Observe que nem todos os dados podem ser salvos, dependendo da categoria. Imagens e campos com muitas caixas de seleção, por exemplo, não são salvos.</span>
</div>
<!-- <textarea name="" id="">{JSON.stringify(templateData)}</textarea> -->
<form class="flex flex-col gap-2" on:submit|preventDefault={handleSubmit} autocomplete="off">
  <input type="hidden" name="id" value={templateData?.id || null}>
  <div class="flex flex-col gap-0.5">
    <label class="font-semibold" for="subject">Título (do anúncio e do template)</label>
    <input class="p-2 border border-neutral-400 rounded-lg outline-purple-700" type="text" id="subject" name="subject" placeholder="Vá até a última etapa ou digite um título na página" value={templateData?.subject || ''} maxlength="90"/>
  </div>
  
  <div class="flex flex-col gap-0.5">
    <label class="font-semibold" for="body">Descrição (do anúncio e do template)</label>
    <textarea class="p-2 border border-neutral-400 rounded-lg outline-purple-700" id="body" name="body" placeholder="Vá até a última etapa ou digite uma descrição na página" maxlength="6000">{templateData?.body || ''}</textarea>
  </div>

  <div class="flex flex-col gap-0.5">
    <label class="font-semibold" for="price">Preço</label>
    <input class="p-2 border border-neutral-400 rounded-lg outline-purple-700" type="text" id="price" name="price" placeholder="Vá até a última etapa ou digite um preço na página" value={templateData?.price  || ''}/>
  </div>
  
  <div class="flex flex-col gap-0.5">
    <label class="font-semibold" for="zipcode">CEP</label>
    <input class="p-2 border border-neutral-400 rounded-lg outline-purple-700" type="text" id="zipcode" name="zipcode" placeholder="Vá até a última etapa ou digite um CEP na página" value={templateData?.zipcode || ''} autocomplete="off"/>
  </div>

  <div class="flex flex-col gap-0.5">
    <label class="font-semibold" for="exchange">Aceita trocas?</label>
    <input class="p-2 mr-auto" type="checkbox" id="exchange" name="exchange" checked={templateData?.exchange || false} autocomplete="off"/>
  </div>

  {#if advancedSettings.length > 0}
    <details class="mt-2 border p-2 rounded-lg">
      <summary class="cursor-pointer">Avançado</summary>
      
      <div class="mt-2 flex flex-col gap-2">
        {#each advancedSettings as [key, value]}
          <div class="flex flex-col gap-0.5">
            <label class="font-semibold" for={key}>{key}</label>
            <input class="p-2 border border-neutral-400 rounded-lg outline-purple-700" type="text" id={key} name={key} {value}/>
          </div>
        {/each}
      </div>
    </details>
  {/if}

  <Button type="orange" otherClass="mt-2">Salvar template</Button>
</form>