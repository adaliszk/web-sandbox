/*
 * WHAT IS THIS FILE?
 * Serving your app built in production mode.
 */
import { createQwikCity } from "@builder.io/qwik-city/middleware/node";
import qwikCityPlan from "@qwik-city-plan";
import render from "./entry.ssr.tsx";

/**
 * The default export is the QwikCity adapter used by Vite preview.
 */
export default createQwikCity({ render, qwikCityPlan });
