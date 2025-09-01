<template>
  <UContainer>
    <div class="flex mt-16">
      <img
        src="https://github.com/owlnai.png"
        alt="Unai's photo"
        class="rounded-full w-24 h-24"
        width="64"
        height="64"
      />
    </div>
    <h1 class="font-serif text-3xl my-2">
      Hi, I'm Unai or <span class="italic">owlnai</span>
    </h1>
    <p class="max-w-xl mb-4">
I got my start editing wikis, driven by endless curiosity and a sharp eye for detail. That led me to web development, then UI design, and eventually to a little bit of everything. These days, I work with global brands, share what I know, and sometimes travel the world along the way.

    </p>
    <nav class="flex gap-2 mb-4">
    <UButton variant="soft" to="https://github.com/owlnai" icon="mingcute:github-line" color="neutral">GitHub</UButton>
    <UButton variant="soft" to="https://bsky.app/profile/owlnai.com" icon="mingcute:bluesky-social-line" color="info">Bluesky</UButton>
    </nav>
    <div class="flex gap-4 my-4">
      <span
        class="border py-4 px-4 rounded-full inline-flex flex-col items-center"
      >
        <span class="text-xs">2001</span>
        <div class="flex justify-between gap-3 items-center">
          <UIcon
            name="i-streamline-food-cheese-1-cook-cheese-animal-products-cooking-nutrition-dairy-food"
            class="size-4"
          />
          <span class="text-xl font-semibold font-serif">Bilbao</span>
          <UIcon name="i-emojione-monotone-church" class="size-4" />
        </div>
        <span class="text-xs">BIO</span>
      </span>
      <span
        class="border py-4 px-4 rounded-full inline-flex flex-col items-center relative"
      >
        <span class="text-xs">2025</span>
        <div class="flex justify-between gap-3 items-center">
          <UIcon
            name="i-streamline-food-cheese-1-cook-cheese-animal-products-cooking-nutrition-dairy-food"
            class="size-4"
          />
          <span class="text-xl font-semibold font-serif">Bordeaux</span>
          <UIcon name="i-emojione-monotone-church" class="size-4" />
        </div>
        <span class="text-xs">BDX</span>
      </span>
      <!-- -->
      <span
        class="border-dashed border py-4 px-4 rounded-full inline-flex flex-col items-center"
      >
        <span class="text-xs">Soon!</span>
        <div class="flex justify-between gap-3 items-center">
          <UIcon
            name="i-streamline-food-cheese-1-cook-cheese-animal-products-cooking-nutrition-dairy-food"
            class="size-4"
          />
          <span class="text-xl font-semibold font-serif">Rome</span>
          <UIcon name="i-mdi-question-mark" class="size-4" />
        </div>
        <span class="text-xs">FCO</span>
      </span>
    </div>
    <span class="text-sm"
      >Last edited in 2025. Work in progress.</span
    >
  </UContainer>
</template>

<script setup>
// No additional script setup needed for this basic example
</script>
