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

<template>
  <div class="flex flex-col gap-2 w-md">
    <div class="bg-green-500">Tailwind Color Stuck</div>
    <UButton label="Nuxt ui button"/>

    <UserField label="Username" placeholder="Enter your username" icon="i-fa-solid-user"/>
    <FctUserField label="Fct Username" placeholder="Enter your username" icon="i-fa-solid-user"/>
  </div>
</template>

<script setup lang="ts">

import UserField from "@mmiUIFwk/components/UserField.vue";
import FctUserField from "@mmiFctOrderFo/components/FctUserField.vue";
</script>
