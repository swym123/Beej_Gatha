# Public Assets

Drop your own files here and reference them with a leading `/` in your code.

## Video

Place your seed-growth video as:

```
public/seed_plant.mp4
```

Then open `src/components/ScrollVideoSection.tsx` and change:

```ts
const SEED_VIDEO_SRC = "https://media.w3.org/2010/05/sintel/trailer.mp4";
```

to:

```ts
const SEED_VIDEO_SRC = "/seed_plant.mp4";
```

## Photos

Drop images in `public/images/` and reference them as `/images/your-file.jpg`.
