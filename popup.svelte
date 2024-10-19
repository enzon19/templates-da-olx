<script>
  import "./style.css";
  import { Storage } from "@plasmohq/storage";
  import TemplateCard from './components/TemplateCard.svelte';
  import TemplateEditor from './components/TemplateEditor.svelte';
  import Button from './components/Button.svelte';
  import icon from "data-base64:~assets/icon.png";

  const storage = new Storage();
  let screen = 'main';
  let currentTemplate = {};
  let getTemplates = storage.getAll();

  function importData() {
    const input = document.createElement('input');
    input.type = 'file';

    input.onchange = e => { 
      // getting a hold of the file reference
      const file = e.target.files[0]; 

      // setting up the reader
      const reader = new FileReader();
      reader.readAsText(file,'UTF-8');

      // here we tell the reader what to do when it's done reading...
      reader.onload = async readerEvent => {
        const data = JSON.parse(readerEvent.target.result);
        for (const [key, value] of Object.entries(data)) {
          await storage.set(key, value)
        }
        getTemplates = storage.getAll();
      }
    }

    input.click();
  }

  async function exportData() {
    const allData = await storage.getAll();

    // Parse JSON strings
    const transformedData = Object.fromEntries(
      Object.entries(allData).map(([key, value]) => {
        try {
          // Attempt to parse the value once
          const parsedValue = JSON.parse(value);
          return [key, parsedValue];
        } catch (error) {
          // If parsing fails, keep the original value
          return [key, value];
        }
      })
    );

    const json = JSON.stringify(transformedData, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    chrome.downloads.download({
      url: url,
      filename: `Dados Exportados - Templates da OLX - ${(new Date()).toISOString().replace(/[:]/g, '-')}.json`,
      saveAs: true // Optional: opens the save dialog
    }, () => {
      URL.revokeObjectURL(url); // Clean up
    });
  }
</script>

<head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap" rel="stylesheet">
</head>

<div class="w-[36rem] p-2 flex flex-col gap-2">
  {#if screen === 'main'}
    <header class="flex flex-row gap-1.5 items-center">
      <img src={icon} alt="Logotipo da Extensão" class="w-10">
      <h1 class="font-bold text-purple-700 text-2xl">Templates da OLX</h1>
    </header>
    <hr>
    <div class="flex gap-2">
      <a href="https://www2.olx.com.br/desapega" target="_blank" class="py-2 px-4 h-10 rounded-full transition-colors font-semibold bg-olx-orange-500 hover:bg-olx-orange-600 text-white text-base text-center">Criar novo template</a>
      <Button type="outline" on:click={importData} otherClass="!text-base">Importar dados</Button>
      <Button type="outline" on:click={exportData} otherClass="!text-base">Exportar dados</Button>
    </div>
    {#await getTemplates}
      <span>Obtendo templates...</span>
    {:then templates}
      {@const templatesAsArrayAndValidated = Object.values(templates).map(e => JSON.parse(e)).filter(e => e?.subject)}
      <div class="flex flex-col gap-2">
        {#if templatesAsArrayAndValidated.length > 0}
          <span class="text-base font-medium">Selecione um template para editar:</span>
        {/if}
        {#each templatesAsArrayAndValidated as template}
          <TemplateCard {template} on:click={() => {screen = 'editor'; currentTemplate = template}}/>
        {:else}
          <div class="flex flex-col mx-auto">
            <span class="text-base text-center font-medium">Você não possui templates.</span>
            <a class="text-sm text-center text-neutral-500 underline" href="/tabs/welcome.html" target="_blank">Não sabe como criar um template?</a>
          </div>
        {/each}
      </div>
    {:catch error}
      <span class="text-red-600 text-base">Erro: {error}</span>
    {/await}
    <footer class="bg-neutral-500 p-1 -mx-2 -mb-2 text-orange text-sm text-white text-center">
      <span>Considere apoiar fazendo uma <span class="font-black">doação</span> para meu PIX: <span class="select-all font-black">enzonbarata@outlook.com</span>!</span>
      <br>
      <span>Confira meus outros trabalhos em </span><a href="https://enzon19.com" target="_blank" class="underline">enzon19.com</a>
    </footer>
  {:else if screen === 'editor'}
    <div class="flex flex-row gap-1.5 items-center">
      <button class="rotate-180 p-1.5 hover:bg-neutral-300 rounded-full" on:click={() => {screen = 'main'}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M9.46966991,17.4696699 C9.1767767,17.7625631 9.1767767,18.2374369 9.46966991,18.5303301 C9.76256313,18.8232233 10.2374369,18.8232233 10.5303301,18.5303301 L16.5303301,12.5303301 C16.8232233,12.2374369 16.8232233,11.7625631 16.5303301,11.4696699 L10.5303301,5.46966991 C10.2374369,5.1767767 9.76256313,5.1767767 9.46966991,5.46966991 C9.1767767,5.76256313 9.1767767,6.23743687 9.46966991,6.53033009 L14.9393398,12 L9.46966991,17.4696699 Z"></path></svg>
      </button>
      <h1 class="font-bold text-purple-700 text-2xl">Editar template</h1>
    </div>
    <div class="text-base flex flex-col gap-2">
      <TemplateEditor data={currentTemplate} on:savedTemplate={() => {screen = 'main'; currentTemplate = null; getTemplates = storage.getAll();}}/>
      <Button type="red" on:click={async () => {await storage.remove(currentTemplate.id); screen = 'main'; currentTemplate = null; getTemplates = storage.getAll();}}>Apagar template</Button>
    </div>
  {/if}
</div>