<script>
  import "./style.css";
  import icon from "data-base64:~assets/icon.png";
  const step1 = "https://raw.githubusercontent.com/enzon19/templates-da-olx/main/assets/step1.gif";
  import step2 from "data-base64:~assets/step2.png";
  const step3 = "https://raw.githubusercontent.com/enzon19/templates-da-olx/main/assets/step3.gif";
</script>

<head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap" rel="stylesheet">
</head>

<div class="mx-auto text-base flex flex-col min-h-screen">
  <img src={icon} alt="Logotipo da Extensão" class="w-28 mx-auto text-center mb-2 mt-6">
  <h1 class="text-purple-600 text-4xl font-black text-center">Você instalou seu melhor aliado para usar a OLX!</h1>
  <div class="text-center">Muito obrigado pela oportunidade!</div>

  <h2 class="mx-auto text-orange-600 text-3xl font-bold text-center mb-2 mt-6">Crie seu primeiro template em 3 passos</h2>
  <div class="rounded-t-3xl bg-white p-3 mx-12 h-auto flex-grow pt-8" id="ih"> 
    <div class="container mx-auto">
      <div class="flex flex-col gap-4">
        <div class="flex items-start gap-4">
          <div class="rounded-full w-16 h-16 text-center text-3xl font-extrabold bg-green-100 text-green-500 flex items-center justify-center">
            <span>1</span>
          </div>
          <div class="flex flex-col">
            <h3 class="text-3xl inline-block pt-[0.85rem]">Crie um anúncio normalmente</h3>
            <span class="text-base">Lembre-se de preencher <span class="font-bold">tudo</span>, certificando-se que chegou na página final.</span>
            <img src={step1} alt="Crie um anúncio" class="max-w-2xl border rounded-lg">
            <div class="mt-5">
              <a href="https://www2.olx.com.br/desapega" target="_blank" class="py-2 px-4 h-10 rounded-full transition-colors font-semibold bg-olx-orange-500 hover:bg-olx-orange-600 text-white text-base text-center">Criar novo anúncio</a>
            </div>
          </div>
        </div>
        <div class="flex items-start gap-4">
          <div class="rounded-full w-16 h-16 text-center text-3xl font-extrabold bg-orange-100 text-orange-500 flex items-center justify-center">
            <span>2</span>
          </div>
          <div class="flex flex-col">
            <h3 class="text-3xl inline-block pt-[0.85rem]">Antes de enviar o anúncio para a OLX, clique em "Novo template" na barra superior e salve o template.</h3>
            <img src={step2} alt="Clique no botão Novo Template assim que você chegar na etapa final" class="max-w-2xl border rounded-lg">
          </div>
        </div>
        <div class="flex items-start gap-4">
          <div class="rounded-full w-16 h-16 text-center text-3xl font-extrabold bg-purple-100 text-purple-500 flex items-center justify-center">
            <span>3</span>
          </div>
          <div class="flex flex-col">
            <h3 class="text-3xl inline-block pt-[0.85rem]">Agora é só usar o template quando quiser!</h3>
            <span class="text-base">Lembre-se de selecionar a categoria do anúncio antes.</span>
            <img src={step3} alt="Use o template" class="max-w-2xl border rounded-lg">
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
