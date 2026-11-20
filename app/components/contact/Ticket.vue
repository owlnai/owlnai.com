<script setup lang="ts">
import '@fontsource/bebas-neue/400.css'
import '@fontsource/space-mono/400.css'
import '@fontsource/space-mono/700.css'
import { person, socials } from '~/data/site'

// An all-access pass: always dark so its foil shows, the photo printed edge to edge, a holographic band across
// it, and a tear-off stub that saves the contact. On top of the lanyard's swing it tilts slightly toward the pointer.
const shown = socials.filter((social) => !['dev', 'twitch'].includes(social.id))
const { card, onMove, onLeave } = useCardTilt({ x: 5, y: 7 })
</script>

<template>
  <aside class="ticket" aria-label="Contact card" @pointermove="onMove" @pointerleave="onLeave">
    <ContactLanyard>
      <div class="ticket__stage">
      <div ref="card" class="ticket__card">
        <div class="ticket__main">
          <figure class="ticket__photo">
            <NuxtImg src="/icon.png" :alt="`Portrait of ${person.name}`" width="460" height="460" />
            <span class="ticket__slot" aria-hidden="true" />
          </figure>

          <p class="ticket__band" aria-hidden="true">
            <span>All access ✦ All access ✦ All access ✦ All access ✦</span>
          </p>

          <div class="ticket__info">
            <p class="ticket__label">Name</p>
            <p class="ticket__name">{{ person.name }}</p>
            <div class="ticket__row">
              <p class="ticket__handle">@{{ person.handle }}</p>
              <ul class="ticket__icons">
                <li v-for="social in shown" :key="social.id">
                  <a :href="social.href" rel="me" :aria-label="social.name" :title="social.name">
                    <ContactIcon :id="social.id" :size="15" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <ContactFoil glow style="--foil-rest: 0.05; --foil-lift: 0.32" />
        </div>

        <!-- Perforation, with a notch bitten out of each side -->
        <div class="ticket__tear" aria-hidden="true" />

        <a href="/contact.vcf" download="unai-mengual.vcf" class="ticket__stub">
          <span class="ticket__bars" aria-hidden="true" />
          <span class="ticket__stub-text">
            <span>Save contact ↓</span>
            <span>Admit one</span>
          </span>
        </a>
      </div>
      </div>
    </ContactLanyard>
  </aside>
</template>

<style scoped>
.ticket__stage {
  perspective: 1000px;
}

/* Dark in both themes, so the foil has something to glow against */
.ticket__card {
  --ticket: #141416;
  --on-ticket: #f1f1ee;
  --on-ticket-soft: rgb(241 241 238 / 0.6);
  --font-poster: 'Bebas Neue', var(--font-sans);
  --font-type: 'Space Mono', var(--font-mono);
  filter: drop-shadow(0 18px 24px light-dark(rgb(0 0 0 / 0.22), rgb(0 0 0 / 0.6)));
  color: var(--on-ticket);
  font-family: var(--font-type);
  transform: rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
  transition: transform 0.5s var(--ease-out);
}

.ticket__card[data-active] {
  transition-duration: 0.15s;
}

.ticket__main {
  position: relative;
  overflow: hidden;
  border-radius: 1rem 1rem 0 0;
  background: var(--ticket);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.1);
}

/* Printed to the edges, with the strap's slot punched through it */
.ticket__photo {
  position: relative;
}

.ticket__photo img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  object-position: 50% 25%;
}

.ticket__slot {
  position: absolute;
  top: 0.7rem;
  left: 50%;
  width: 2.75rem;
  height: 0.5rem;
  translate: -50% 0;
  border-radius: 999px;
  background: var(--paper);
  box-shadow: inset 0 1px 2px rgb(0 0 0 / 0.35);
}

/* A holographic strip of "All access" across the foot of the photo; its colours slide as the card moves */
.ticket__band {
  overflow: hidden;
  padding: 0.35rem 0 0.2rem;
  background:
    linear-gradient(
      100deg,
      transparent 35%,
      rgb(255 255 255 / 0.55) 48%,
      transparent 60%
    ),
    repeating-linear-gradient(90deg, rgb(255 255 255 / 0.14) 0 1px, transparent 1px 3px),
    linear-gradient(
      100deg,
      hsl(320 85% 76%),
      hsl(265 85% 80%),
      hsl(195 85% 72%),
      hsl(150 70% 70%),
      hsl(50 90% 72%),
      hsl(320 85% 76%)
    );
  background-position:
    calc(var(--mx, 30) * 2%) 0,
    0 0,
    calc(var(--mx, 30) * 1%) 0;
  background-size:
    250% 100%,
    auto,
    300% 100%;
  color: #141416;
  transition: background-position 0.4s var(--ease-out);
  font-family: var(--font-poster);
  font-size: 1.35rem;
  letter-spacing: 0.06em;
  line-height: 1;
  white-space: nowrap;
}

.ticket__band span {
  display: inline-block;
  padding-inline-start: 0.6rem;
}

@media (prefers-reduced-motion: no-preference) {
  .ticket__card:hover .ticket__band span {
    animation: ticket-marquee 6s linear infinite;
  }
}

@keyframes ticket-marquee {
  to {
    translate: -50% 0;
  }
}

.ticket__info {
  padding: 0.9rem 1rem 1rem;
}

.ticket__label {
  color: var(--on-ticket-soft);
  font-size: 0.5625rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.ticket__name {
  margin-top: 0.15rem;
  font-family: var(--font-poster);
  font-size: 2.75rem;
  letter-spacing: 0.01em;
  line-height: 0.88;
}

.ticket__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: 0.6rem;
}

.ticket__handle {
  color: var(--on-ticket-soft);
  font-size: 0.75rem;
}

.ticket__icons {
  position: relative;
  z-index: 3;
  display: flex;
}

.ticket__icons a {
  display: grid;
  place-items: center;
  width: 1.85rem;
  height: 1.85rem;
  border-radius: 50%;
  color: var(--on-ticket-soft);
}

.ticket__icons a:hover {
  color: var(--on-ticket);
  background: rgb(128 128 128 / 0.2);
}

.ticket__tear {
  position: relative;
  height: 1rem;
  background:
    radial-gradient(circle at 0 50%, transparent 0.5rem, var(--ticket) calc(0.5rem + 0.5px)) left / 51% 100% no-repeat,
    radial-gradient(circle at 100% 50%, transparent 0.5rem, var(--ticket) calc(0.5rem + 0.5px)) right / 51% 100% no-repeat;
}

.ticket__tear::after {
  content: '';
  position: absolute;
  inset: 50% 0.85rem auto;
  border-top: 1.5px dashed var(--on-ticket-soft);
}

.ticket__stub {
  display: grid;
  justify-items: center;
  gap: 0.45rem;
  padding: 0.75rem 1rem 0.85rem;
  border-radius: 0 0 1rem 1rem;
  background: var(--ticket);
}

.ticket__bars {
  width: 100%;
  height: 1.6rem;
  background: repeating-linear-gradient(
    90deg,
    var(--on-ticket) 0 2px,
    transparent 2px 3px,
    var(--on-ticket) 3px 4px,
    transparent 4px 7px,
    var(--on-ticket) 7px 10px,
    transparent 10px 11px,
    var(--on-ticket) 11px 12px,
    transparent 12px 15px
  );
}

.ticket__stub-text {
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: var(--on-ticket-soft);
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.ticket__stub:hover .ticket__stub-text span:first-child {
  color: var(--on-ticket);
}
</style>
