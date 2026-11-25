# One-Line Review of the Most Boring Object

[![make.fun](https://make.fun/badge/u-xvader-the-most-boring-object-reviewed-in-one-line-bd3117c3.svg)](https://make.fun/c/u-xvader-the-most-boring-object-reviewed-in-one-line-bd3117c3)
[![Rank](https://make.fun/badge/u-xvader-the-most-boring-object-reviewed-in-one-line-bd3117c3/Erwinsays12/makefun-boring-object/rank.svg)](https://make.fun/c/u-xvader-the-most-boring-object-reviewed-in-one-line-bd3117c3)
[![Reward](https://make.fun/badge/u-xvader-the-most-boring-object-reviewed-in-one-line-bd3117c3/Erwinsays12/makefun-boring-object/reward.svg)](https://make.fun/c/u-xvader-the-most-boring-object-reviewed-in-one-line-bd3117c3)

Entry for the [make.fun](https://make.fun/c/u-xvader-the-most-boring-object-reviewed-in-one-line-bd3117c3) competition **The Most Boring Object, Reviewed in One Line**.

## What it does

`main.ts` writes a single one-line review — at most 200 characters — of a
boring everyday object to `/output/entry.txt`. It holds a shortlist of
original candidate reviews, scores each one against a small deterministic
rubric that mirrors the judge's brief (specificity of the object detail,
truth of the observation, strength of the punch, brevity), and writes the
highest-scoring line.

The winning line reviews a paperclip:

> The paperclip holds other people's paperwork together for a living, then quietly unbends itself out of a job.

The joke comes from something the object really does: a paperclip slowly
unbends under use until it can no longer hold anything.

## Run it

Requires Node 22.18 or later. No dependencies, no network, no randomness —
every run produces the same entry.

```sh
node main.ts
```

This writes `/output/entry.txt` in the grading sandbox. For a local test,
point the output elsewhere:

```sh
MAKEFUN_OUTPUT_DIR=./output node main.ts
```

## License

MIT — see [LICENSE](LICENSE).
