<!--

  - Copyright (C) [2022-2024] Midi Mini Informatique. Tous droits réservés.
  -
  - Ce fichier fait partie du système de logiciels MMI ONE.
  -
  - MMI ONE est un système composé d'un ensemble de logiciels propriétaire développé par Midi Mini Informatique.
  - Ces logiciels sont exclusivement destinés à un usage interne dans le cadre de la mise à disposition
  - de nos applications SaaS. Ils ne peuvent être copiés, modifiés, distribués ou utilisés à des fins
  - autres que celles prévues par Midi Mini Informatique, sauf autorisation expresse de celle-ci.
  -
  - Ce code est fourni "tel quel", sans garantie d'aucune sorte. Midi Mini Informatique décline
  - toute responsabilité quant à son utilisation ou à ses performances dans des conditions ou pour des
  - usages non approuvés par l'entreprise.
  -->
<!--Ce composant permet de gérer le formulaire de connexion-->
<!-- Composant Input field avec icon et label, et style blanc en Dark/Light mode -->
<template>
  <UFormGroup :required="true" >
    <template #label>
      <label class="text-black font-semibold">{{ label }}</label>
    </template>
    <UInput
      :placeholder="placeholder"
      :value="modelUsernameValue"
      class="mt-1"
      size="lg"
      :icon="icon"
      color="white"
      :ui="{
              color: {
                    white: {
                      outline: 'shadow-sm bg-white dark:bg-white text-gray-900 dark:text-gray-900 ring-1 ring-inset ring-gray-300 dark:ring-gray-300 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-500',
                    },
                  }
                }"
      @input="$emit('modelUsernameValue', $event.target.value)"
    >
    </UInput>
  </UFormGroup>
</template>

<script setup>
/**
 * Props
 */
const props = defineProps({
  modelUsernameValue: String,
  label: String,
  placeholder: String,
  icon: String,
});

/**
 * Emits
 */
const emit = defineEmits(['modelUsernameValue']);

</script>
