<script context="module" lang="ts">
  import Button from '../components/Button.svelte';
  import TemplateEditor from '../components/TemplateEditor.svelte';
  import TemplateCard from '../components/TemplateCard.svelte';
  import Error from '../components/Error.svelte';
  import cssText from "data-text:~/style.css";
  import type { PlasmoCSConfig, PlasmoGetInlineAnchor, PlasmoMountShadowHost } from "plasmo";
  import {applyFormData, getFormData} from './templateCore.js';
  import {writable} from 'svelte/store';
  import { Storage } from "@plasmohq/storage"
 
  const storage = new Storage()

  export const config: PlasmoCSConfig = {
    matches: ["https://www2.olx.com.br/desapega*"]
  }

  export const getInlineAnchor: PlasmoGetInlineAnchor = () => document.querySelector(".olx-focus-header__content")
  export const mountShadowHost: PlasmoMountShadowHost = ({ 
    anchor, shadowHost 
  }) => {
    anchor!.element!.insertBefore(shadowHost!, anchor!.element!.nextSibling)
  }

  export const getStyle = () => {
    const style = document.createElement("style")
    style.textContent = cssText
    return style
  }

  let modals:any = {};
  let formData:any = writable(null);
  let allTemplates:any = writable([]);
  let errorDescription:any = writable(null);
  function openModal (type: string) {
    try {
      if (type === 'newTemplate') {
        const resultGetFormData = getFormData();
        formData.set(resultGetFormData);
      } else if (type === 'applyTemplate') {
        const resultGetTemplates = storage.getAll();
        allTemplates.set(resultGetTemplates);
      } else {
        return;
      }
    } catch (e) {
      type = 'error';
      errorDescription.set(e);
    } finally {
      const modal = modals[type];
      modal.showModal();
    }
  }
  function closeModal (type: string) {
    const modal = modals[type];
    modal.close();
  }
  async function search(event) {
    const searchQuery = event.currentTarget.value.toLowerCase();
    const resultGetTemplates = await storage.getAll();
    const templates = Object.values(resultGetTemplates).map(e => JSON.parse(e)).filter(e => e?.subject);
    const results = templates.filter(e => e.subject.toLowerCase().includes(searchQuery) || e.body.toLowerCase().includes(searchQuery));

    let resultsAsPromiseAndStringified = {}
    
    for (const result of results) {
      resultsAsPromiseAndStringified[result.id] = JSON.stringify(result);
    }

    allTemplates.set(resultsAsPromiseAndStringified);
  }
</script>

<div class="flex gap-2">
  <Button type="outline" on:click={() => openModal('newTemplate')}>Novo template</Button>
  <Button type="outline" on:click={() => openModal('applyTemplate')}>Aplicar template</Button>
</div>

<dialog class="p-4 rounded-2xl w-[36rem] backdrop:bg-black/25" bind:this={modals.newTemplate}>
  <div class="flex flex-col gap-2">
    <div class="flex flex-row justify-between items-center gap-1.5">
      <h2 class="font-bold text-2xl">Novo template</h2>
      <button on:click={() => closeModal('newTemplate')} class="hover:bg-neutral-300 p-3 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M13.0606602,12 L18.5303301,17.4696699 C18.8232233,17.7625631 18.8232233,18.2374369 18.5303301,18.5303301 C18.2374369,18.8232233 17.7625631,18.8232233 17.4696699,18.5303301 L12,13.0606602 L6.53033009,18.5303301 C6.23743687,18.8232233 5.76256313,18.8232233 5.46966991,18.5303301 C5.1767767,18.2374369 5.1767767,17.7625631 5.46966991,17.4696699 L10.9393398,12 L5.46966991,6.53033009 C5.1767767,6.23743687 5.1767767,5.76256313 5.46966991,5.46966991 C5.76256313,5.1767767 6.23743687,5.1767767 6.53033009,5.46966991 L12,10.9393398 L17.4696699,5.46966991 C17.7625631,5.1767767 18.2374369,5.1767767 18.5303301,5.46966991 C18.8232233,5.76256313 18.8232233,6.23743687 18.5303301,6.53033009 L13.0606602,12 L13.0606602,12 Z"></path></svg>
      </button>
    </div>
    <div data-ds-componet="DS-Alertbox" class="p-3 bg-neutral-100 rounded-lg text-neutral-700 flex flex-row gap-3" role="status">
      <div class="w-min">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M12,22.75 C6.06293894,22.75 1.25,17.9370611 1.25,12 C1.25,6.06293894 6.06293894,1.25 12,1.25 C17.9370611,1.25 22.75,6.06293894 22.75,12 C22.75,17.9370611 17.9370611,22.75 12,22.75 Z M12,21.25 C17.1086339,21.25 21.25,17.1086339 21.25,12 C21.25,6.89136606 17.1086339,2.75 12,2.75 C6.89136606,2.75 2.75,6.89136606 2.75,12 C2.75,17.1086339 6.89136606,21.25 12,21.25 Z M12.75,16 C12.75,16.4142136 12.4142136,16.75 12,16.75 C11.5857864,16.75 11.25,16.4142136 11.25,16 L11.25,12 C11.25,11.5857864 11.5857864,11.25 12,11.25 C12.4142136,11.25 12.75,11.5857864 12.75,12 L12.75,16 Z M12,10 C11.4477153,10 11,9.55228475 11,9 C11,8.44771525 11.4477153,8 12,8 C12.5522847,8 13,8.44771525 13,9 C13,9.55228475 12.5522847,10 12,10 Z"></path></svg>
      </div>
      <span class="olx-text olx-text--body-small olx-text--block olx-text--regular">Chegue a última página do processo de criação do anúncio antes de salvá-lo como template.</span>
    </div>
    <TemplateEditor data={$formData} on:savedTemplate={() => {closeModal('newTemplate'); formData.set(null);}}/>
  </div>
</dialog>
<dialog class="p-4 rounded-2xl max-w-xl backdrop:bg-black/25" bind:this={modals.applyTemplate}>
  <div class="flex flex-col gap-2">
    <div class="flex flex-row justify-between items-center gap-1.5">
      <h2 class="font-bold text-2xl">Aplicar um template</h2>
      <button on:click={() => closeModal('applyTemplate')} class="hover:bg-neutral-300 p-3 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M13.0606602,12 L18.5303301,17.4696699 C18.8232233,17.7625631 18.8232233,18.2374369 18.5303301,18.5303301 C18.2374369,18.8232233 17.7625631,18.8232233 17.4696699,18.5303301 L12,13.0606602 L6.53033009,18.5303301 C6.23743687,18.8232233 5.76256313,18.8232233 5.46966991,18.5303301 C5.1767767,18.2374369 5.1767767,17.7625631 5.46966991,17.4696699 L10.9393398,12 L5.46966991,6.53033009 C5.1767767,6.23743687 5.1767767,5.76256313 5.46966991,5.46966991 C5.76256313,5.1767767 6.23743687,5.1767767 6.53033009,5.46966991 L12,10.9393398 L17.4696699,5.46966991 C17.7625631,5.1767767 18.2374369,5.1767767 18.5303301,5.46966991 C18.8232233,5.76256313 18.8232233,6.23743687 18.5303301,6.53033009 L13.0606602,12 L13.0606602,12 Z"></path></svg>
      </button>
    </div>
    <span class="inline-block">Clique em um dos seus templates abaixo para preencher a página. Talvez você terá que fazer este processo mais de uma vez.</span>
    <input type="search" name="templateFilter" on:input={search} placeholder="Pesquisar templates..." class="p-2 border border-neutral-400 ring-neutral-400 hover:ring-1 focus:ring-2 sizing-box w-full rounded-lg box-border focus:ring-purple-700 outline-none">
    {#await $allTemplates}
      <span>Carregando templates...</span>
    {:then templates}
      <div class="flex flex-col gap-2">
        {#each Object.values(templates).map(e => JSON.parse(e)).filter(e => e?.subject) as template}
          <TemplateCard {template} on:click={() => {applyFormData(template); closeModal('applyTemplate');}}/>
        {:else}
          <span>Nenhum template.</span>
        {/each}
      </div>
    {:catch error}
      <Error {error}/>
    {/await}
  </div>
</dialog>
<dialog class="p-4 rounded-2xl max-w-xl backdrop:bg-black/25" bind:this={modals.error}>
  <div class="flex flex-row justify-between items-center gap-1.5">
    <h2 class="font-bold text-2xl">Erro</h2>
    <button on:click={() => closeModal('error')} class="hover:bg-neutral-300 p-3 rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M13.0606602,12 L18.5303301,17.4696699 C18.8232233,17.7625631 18.8232233,18.2374369 18.5303301,18.5303301 C18.2374369,18.8232233 17.7625631,18.8232233 17.4696699,18.5303301 L12,13.0606602 L6.53033009,18.5303301 C6.23743687,18.8232233 5.76256313,18.8232233 5.46966991,18.5303301 C5.1767767,18.2374369 5.1767767,17.7625631 5.46966991,17.4696699 L10.9393398,12 L5.46966991,6.53033009 C5.1767767,6.23743687 5.1767767,5.76256313 5.46966991,5.46966991 C5.76256313,5.1767767 6.23743687,5.1767767 6.53033009,5.46966991 L12,10.9393398 L17.4696699,5.46966991 C17.7625631,5.1767767 18.2374369,5.1767767 18.5303301,5.46966991 C18.8232233,5.76256313 18.8232233,6.23743687 18.5303301,6.53033009 L13.0606602,12 L13.0606602,12 Z"></path></svg>
    </button>
  </div>
  <Error error={$errorDescription}/>
</dialog>