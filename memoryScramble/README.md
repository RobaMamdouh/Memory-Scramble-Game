# Memory-Scramble-Game
Memory scramble is a game in which the player turns over face-down cards and tries to find matching pairs before the countdown timer runs out.

This project was built with **Angular CLI**  version 17.3.17 and **TypeScript**.

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

```
node -v   # should be 18+
npm -v    # should be 9+
```

### Installation & Run

# 1. Install dependencies
run `npm install` to install the required dependencies

# 2. Start the dev server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`
or 
Run `ng serve --open` and dev server will start on your local host automatically.


### How to Play

1. On the **Setup screen**, enter:
   - **Rows** — number of rows (2–8) must be even numbers
   - **Columns** — number of columns (2–8) must be even numbers
   - **Time Limit** — seconds before game over (10–300)

2. Click **Start Game**.

3. Click any face-down card to flip it.

4. Click a second card to find a match.
   - ✅ **Match** — both cards stay face-up.
   - ❌ **No match** — both cards flip back face-down.

5. Find all pairs before the timer hits zero to **win**!

6. If the timer reaches zero before all pairs are matched, it's **game over**.




