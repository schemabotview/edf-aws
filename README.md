# EDF AWS data platform

A GraphL project walkthrough covering smart metering, generation, trading and customer analytics. **6 courses, 36 sections**, each with a diagram, slide and narration script. The project follows the supplied EDF case study and the user-approved `edf-aws-codex` architecture, including its DMS and MSK Connect extensions.

## Run

```sh
npm ci
npm run dev
npm run check
npm run build
npm run frames
```

Dev URL: `http://127.0.0.1:5186/`. Start at `#/requirements-business-problem`. The full architecture is `#/edf-aws-codex`, linked from the architecture overview. Production assets use `/edf-aws/` as their base path; no site has been published.

## Course order

1. Requirements
2. Architecture
3. Ingestion
4. Transformation
5. Consumption
6. Platform operations

See [COURSE-PLAN.md](COURSE-PLAN.md) for the section inventory and [SOURCES.md](SOURCES.md) for the source and design record.

## Authoring model

Each section is a declarative scene plus a slide and narration. The shared published `@graphlearning/flow` and `@graphlearning/shell` packages own layout and presentation. No engine or shell internals are copied into this repo.

`src/content/<course>/<section>.md` is the content source. Its explicit On screen and Narration blocks derive the adjacent `.ts`, `.slide` and `.tts` files through `npm run content:sync`. Nine canonical diagrams live in `src/scenes/`. `section-map.json` binds each section to a shared scene and an optional highlighted node. Course and section IDs define stable hash routes.

The architecture poster preserves horizontal Bronze → Silver → Gold with vertically stacked processing panels, each containing one row of three cards. Section diagrams simplify individual decisions for the scene-and-slide view. No list nodes or hand-authored layout coordinates are used.

## Audio and recording

```sh
npm run gen:audio
npm run record requirements
npm run record:reels requirements
```

The audio manifest is ready for `scripts/colab_generate_audio.ipynb`. Generate WAV files with that Colab workflow and place them at `public/audio/<course>/<section>.wav` before recording. Narration scripts are authored; narration audio and videos are not generated yet. The shell supplies the recorder, thumbnail and description commands.

## Scope

This is an educational presentation repo, not a deployed AWS platform. It contains no live credentials, cloud resources, regulator submission code or production dataset. [examples/](examples/) contains synthetic meter and customer records with expected outcomes. Case-study metrics are attributed objectives or reported claims, not benchmarks achieved by this app.

DMS and MSK Connect land raw S3 files; a separate job commits managed Iceberg tables. MSK Connect does not execute Spark processing, and checkpoints do not create an atomic transaction across independent sinks. Warehouse staging transport is a documented implementation boundary to validate.

## Verification

`npm run check` checks types, registries, source/derived consistency, scene references and poster panel structure. `npm run frames` starts its own preview, checks every section at desktop, 4K and mobile sizes, and saves complete frames and review sheets. Visual review complements the automated checks.
