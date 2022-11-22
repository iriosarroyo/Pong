export const $ = (query) => document.querySelector(query);
/**
 * @type {HTMLCanvasElement}
 */
export const canvas = $(".pong");
/**
 * @type {CanvasRenderingContext2D}
 */
export const ctx = canvas.getContext("2d");