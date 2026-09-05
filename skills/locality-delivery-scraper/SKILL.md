---
name: locality-delivery-scraper
description: >
  End-to-end playbook for scraping, cleaning, and structuring food delivery
  ecosystem data for any city locality — covering restaurant listings, menu
  items, reviews, and competitive intelligence. Use this skill whenever the
  user wants to collect restaurant or food delivery data from any delivery
  platform (Swiggy, Zomato, Grab, DoorDash, Foodpanda, etc.), Google Maps,
  or any combination of them; wants to build a market intelligence dataset for
  a locality; needs to scrape listings and hit a target row count (e.g. 150+
  restaurants); wants to extract menu data including prices and bestseller
  tags; needs to collect and analyse customer reviews without getting blocked;
  wants to use Firecrawl to pull review snippets from search results; or needs
  to deduplicate and clean multi-platform data into a single structured Excel
  workbook. Also use when the user is doing any kind of food-tech,
  delivery-first brand, or market research assignment that requires real
  scraped data rather than synthetic data.
---

# Locality Food Delivery Scraper — Full Playbook

A reusable, battle-tested guide for collecting and structuring food delivery
data for any city locality. Built from real experience scraping CIDCO, Nashik
across 14 script iterations. Every section captures what worked, what failed,
and exactly why — so you can apply it to any city, any platform.

---

## 1. Platform Selection — What to Use and Why

### Platforms by Usefulness (Ranked)

| Platform | Data Quality | Bot Protection | Best For |
|---|---|---|---|
| Delivery app internal API (Swiggy, Grab, etc.) | Excellent — rating, reviews, price, delivery time, rank, offers, menu | Medium (session-cookie based, bypassable) | Primary listings + menu data |
| Google Maps via Apify | Good — rating, reviews, address, category | Low (Apify handles it) | Geographic coverage, physical restaurants, local spots |
| Firecrawl Search API | Good for review snippets | None — public SERP data | Review extraction when direct scraping is blocked |
| Zomato | Excellent — rating, reviews, price, delivery time, cuisine, address | High (WAF + CSRF token), but bypassable via Incognito cURL hijack | Primary listings for Indian markets; use sequential-only mode, never parallel |
| Yelp / Deliveroo | Good in theory | Very High (enterprise WAF) | Skip unless you have a paid API key |
| OpenStreetMap (Overpass API) | Basic — name, address, category only | None | Last resort if delivery app + GM still undercount |
| Direct Selenium / headless browser | Varies | Very High on most platforms | Avoid — Google Maps, Zomato, and most delivery apps block it |

**The winning combination for Indian markets:** Delivery app internal API (Swiggy or Zomato, depending on the city's dominant platform) + Google Maps via Apify (supplemental) + Firecrawl for reviews.

**The winning combination for other markets:** Replace the delivery app with the local equivalent (Grab for SEA, DoorDash/UberEats for US, Deliveroo for UK) using the same cookie-based approach. Google Maps via Apify and Firecrawl work the same everywhere.

Direct Selenium scraping and platforms with enterprise WAFs are not worth fighting. The session-cookie approach to the delivery app's own internal API is always faster and more reliable.

---

## 2. Delivery App Internal API — The Core Source

Most delivery apps (Swiggy, Grab, Foodpanda, etc.) load their restaurant data via internal REST APIs that your browser calls in the background. These are accessible with the right session headers.

### How to Find the Endpoint for Any App

1. Open the delivery app in Chrome → set your address to the target locality
2. Press F12 → Network tab → filter by `Fetch/XHR`
3. Scroll the restaurant listing page — watch for requests that return JSON with restaurant names, ratings, and review counts
4. Right-click the relevant request → **Copy → Copy as cURL**
5. That cURL contains the exact URL, parameters, and headers the browser used — reproduce it in Python

### Worked Example: Swiggy (India)

Once you've found the endpoint via DevTools, replicate it in Python. Here's how it looks for Swiggy as a concrete reference:

**Listings:**
```
GET https://www.swiggy.com/dapi/restaurants/list/v5
  ?lat={latitude}
  &lng={longitude}
  &is-seo-homepage=false
  &page_type=DESKTOP_WEB_LISTING
```

**Menu (per restaurant):**
```
GET https://www.swiggy.com/dapi/menu/pl
  ?page-type=REGULAR_MENU
  &complete-menu=true
  &lat={lat}
  &lng={lng}
  &restaurantId={numeric_id}
```

For other platforms, the URL structure differs but the DevTools → cURL → Python approach is identical.

### Worked Example: Zomato (India)

Zomato's internal search API is a POST endpoint rather than a GET:

```
POST https://www.zomato.com/webroutes/search/home
```

**Delivery-only enforcement:** Pass `"context": "delivery"` and `"category_context": "delivery_home"` in the JSON payload body. This offloads all filtering to Zomato's backend, guaranteeing every result offers delivery and automatically excluding dine-in-only establishments.

**Zone-based iteration instead of coordinate grid:** Zomato's API paginates by `page` parameter within named delivery zones rather than coordinates. Define a `ZONES` dictionary (zone name → zone ID or slug), then loop zone by zone, incrementing `page=1, 2, 3...` until the API returns `"hasMore": false`. This is fundamentally different from Swiggy's coordinate sweep approach.

```python
ZONES = {
    "zone_name_1": "zone_id_1",
    "zone_name_2": "zone_id_2",
    # ... add all zones covering your city
}

for zone_name, zone_id in ZONES.items():
    page = 1
    while True:
        payload = {
            "context": "delivery",
            "category_context": "delivery_home",
            "zone_id": zone_id,
            "page": page,
            # ... other required params from your cURL
        }
        response = session.post(ENDPOINT, json=payload, headers=headers)
        data = response.json()
        restaurants = extract_restaurants(data)
        # ... process restaurants
        if not data.get("hasMore", False):
            break
        page += 1
        time.sleep(DELAY)
```

**Geographic overlap is expected:** Delivery zones in the same city routinely overlap physically. Zone A and Zone B may both return the same restaurant. Deduplication handles this — see Section 2 (Deduplication) and the Two-Tier system below.

### Authentication — The Critical Part

Most delivery apps return HTTP `202` (accepted but empty) or `401` when the session is missing. The fix is copying the session cookie from your browser.

**General approach:**
```python
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/124.0.0.0 Safari/537.36",
    "Accept": "*/*",
    "Origin": "https://[app-domain].com",
    "Referer": "https://[app-domain].com/",
    "Cookie": "[SESSION_COOKIE_NAME]=[VALUE]"
}
```

**How to get the session cookie for any app:**
1. Open Chrome → go to the delivery app → let it fully load with your address set
2. F12 → Application tab → Cookies → the app's domain
3. Look for the primary session cookie (for Swiggy it's `__SW`; for Zomato it's `PHPSESSID`; for other apps check which cookie is longest or named `session`, `sid`, `auth`, `token`)
4. Copy the value and paste into the script immediately — run before it expires

**For apps with hidden CSRF tokens (e.g. Zomato):** The session cookie alone is not enough. Zomato also requires a `csrf` token passed as the `x-zomato-csrft` header. The easiest way to get both together is the Incognito cURL hijack:

1. Open a Chrome Incognito window → navigate to the delivery app → perform a restaurant search
2. F12 → Network tab → find the relevant XHR request → Copy as cURL
3. Parse the cURL string to extract `PHPSESSID` and the `csrf` token
4. Inject both into your script: `PHPSESSID` as a cookie, `csrf` value as the `x-zomato-csrft` header

Using Incognito ensures a fresh session with no cached state that might cause the WAF to behave differently. The extracted headers expire when the browser session ends, so extract and run immediately.

**If the primary cookie alone still returns 202 or 401:** The app may validate multiple cookies together. Copy ALL cookies from the Application tab and format as a single string:
```
session_cookie=xxx; device_id=xxx; waf_token=xxx; ...
```

**Critical execution rule:** WAF tokens (like `aws-waf-token` and Zomato's `PHPSESSID`) are tied to your browser session AND your IP address. Running from a cloud server or cloud-based coding tool will fail even with the right cookie — the WAF validates that the IP matches the session origin. **Always run these scripts locally on your own machine.**

**Never use parallelism or threading:** Delivery app WAFs detect concurrency aggressively. On Zomato specifically, `ThreadPoolExecutor` with ~50 parallel requests is enough to permanently invalidate the `PHPSESSID` for the session, forcing a hard `HTTP 401`. Always use strict sequential execution — one request at a time, zone by zone, page by page. The scrape takes longer but completes reliably rather than failing halfway through and losing progress.

**Network block issue:** If on a college/office network, the delivery app domain may be blocked at DNS level (resolves to something like `blocked.anexgate.com`). Switch to mobile hotspot before running.

### The Per-Coordinate Result Cap Problem

Most delivery app APIs return 25–50 results per coordinate. To get 150+ restaurants you need a **multi-point grid sweep**.

**Strategy: Delivery Radius Grid**

Define 15–25 coordinate points spread across and slightly beyond the target locality. Each sweep fetches restaurants visible from that anchor. Then deduplicate by the restaurant's unique ID.

```python
COORD_SWEEP = [
    ("Locality Center",   LAT_PRIMARY, LNG_PRIMARY),  # PRIMARY — rank from here only
    ("Area North",        LAT + 0.008, LNG),
    ("Area South",        LAT - 0.008, LNG),
    ("Area East",         LAT,         LNG + 0.010),
    ("Area West",         LAT,         LNG - 0.010),
    ("Adjacent Zone 1",   LAT + 0.015, LNG + 0.008),
    # ... 10–20 more points spread across the area
]
```

Space the points roughly 0.008–0.015 degrees apart (about 1–1.5 km) so delivery radius circles overlap and cover the full area without leaving gaps.

**Key rule on the first sweep (primary anchor):** The very first coordinate is the only one you use for `Marketplace_Rank`. It maps to what a real user sees when they open the app at that address. All other sweeps get `Marketplace_Rank = "N/A"` — assigning rank numbers to supplemental sweeps is methodologically dishonest and indefensible if questioned.

### Parsing the Response

Delivery apps nest restaurant data several levels deep. The exact path varies by app and sometimes changes between API versions. Always write a recursive extractor rather than a hardcoded path:

```python
def extract_restaurants(data, depth=0):
    """Recursively walk response JSON to find restaurant objects."""
    if depth > 10:
        return []
    results = []
    if isinstance(data, list):
        for item in data:
            results.extend(extract_restaurants(item, depth + 1))
    elif isinstance(data, dict):
        # Check if this object looks like a restaurant
        if "name" in data and "avgRating" in data and "id" in data:
            results.append(data)
        else:
            for v in data.values():
                results.extend(extract_restaurants(v, depth + 1))
    return results
```

Delivery app APIs change their response shape without notice. Always write multiple fallback paths. As a real-world example, the Swiggy menu API has two known shapes that both need to be handled:

**PATH A (newer shape):**
```
response → data → cards → [card] → card → groupedCard →
  cardsDictionary → [key with "categories"] →
    each category → title + itemCards → [item] → card → info
```

**PATH B (older shape fallback):**
```
response → data → cards → [card] → card →
  @type == "ItemCategory" → title + itemCards → [item] → card → info
```

The general principle for any app: try the path that worked most recently first. If 0 items found, try alternate nesting structures. If still 0, log the raw response shape to a debug file so you can inspect it and update your parser. Never silently skip without logging.

### Sponsored / Promoted Detection

Promoted listing field names change frequently. Check multiple possible field names across both the restaurant info object and its parent card:

```python
def is_sponsored(info_obj, parent_card):
    checks = [
        info_obj.get("adTrackingId"),
        info_obj.get("isPromoted"),
        info_obj.get("promoted"),
        info_obj.get("promoted_chips"),
        parent_card.get("promoted"),
        parent_card.get("isAd"),
    ]
    return any(bool(c) for c in checks)
```

Note: Promoted slots are dynamic (time-of-day and user-dependent). A scrape at midday may return 0 sponsored even when promotions are active at other times. Document the scrape time in your methodology.

### Deduplication Within the Platform

Use the platform's numeric restaurant ID as the dedup key. The same physical restaurant appears across multiple grid sweeps (or delivery zones) — keep the first occurrence (which will be from the primary anchor if it appears there).

```python
seen_ids = set()
unique_restaurants = []
for r in all_results:
    if r["platform_id"] not in seen_ids:
        seen_ids.add(r["platform_id"])
        unique_restaurants.append(r)
```

Note: Some platforms assign different IDs to the same physical outlet depending on delivery zone. These appear as duplicates by name but are not — keep them, as they represent distinct delivery-zone records.

### Two-Tier Deduplication for Long Runs (Zone-Based Scraping)

When scraping a city with many overlapping zones and thousands of raw results, a single in-memory set is not enough — it doesn't survive a crash. Use a two-tier approach:

**Tier 1 — Intra-run memory set:** Maintain a Python `set()` of seen names or IDs during the extraction loop. This catches same-zone pagination loops and overlapping zone results in real time, dropping duplicates before they even get written.

**Tier 2 — Cross-run Excel checkpointing:** Write results to the output Excel file immediately after each zone finishes (not just at the end). Before each write, read back every existing row from the file into the in-memory set. This means if the script crashes mid-city, you can restart it and it will safely skip 100% of already-scraped data without any duplication.

```python
def write_checkpoint(new_rows, excel_path, existing_names):
    """Append new_rows to Excel, skipping any name already in existing_names."""
    # Load existing workbook (or create if first run)
    # Read Column A (Restaurant_Name) into existing_names set
    # Append only rows whose name is NOT in existing_names
    # Save
    pass  # implement with openpyxl

# After finishing each zone:
write_checkpoint(zone_results, OUTPUT_PATH, existing_names)
```

The practical impact is dramatic: on a city like Nashik with 7 overlapping zones, Zomato's API returned ~2,800 raw results but only ~989 were truly unique. Without two-tier dedup, the output would have been 65%+ duplicates.

---

## 3. Google Maps via Apify — The Supplemental Source

Direct Selenium scraping on Google Maps is blocked. Apify's hosted actor handles the bot protection for you.

### Actor to Use

`apify/google-places-scraper` — the standard Apify Google Maps actor.

**Input config:**
```json
{
  "searchStringsArray": ["restaurants in [Locality] [City]"],
  "maxCrawledPlaces": 200,
  "language": "en"
}
```

**Run multiple smaller queries instead of one large one.** A single broad query tends to return the same top-rated spots repeatedly. Breaking it by cuisine gets better diversity:

```
"biryani restaurants [Locality] [City]"
"north indian restaurants [Locality] [City]"
"local / regional cuisine [Locality] [City]"
"chinese restaurants [Locality] [City]"
"fast food [Locality] [City]"
"desserts sweets [Locality] [City]"
```

Output comes as XML or JSON. Both work — parse whichever Apify delivers.

### Geographic Filtering After Apify

Apify does not geofence. You will get restaurants from across the whole city in the output. Post-filter:

1. Check the `address` field for locality keywords you know are inside your target area
2. Flag entries with vague or unverifiable addresses (plus codes like `XQ9J+2H4`, landmark-only addresses)
3. Hard-exclude entries with addresses clearly in other areas
4. In the `Notes` column, mark uncertain entries: `"Address unverifiable for strict [locality] boundary — included as city is [city], recommend manual check"`

This is honest and defensible rather than silently including or excluding borderline entries.

### Review Count Filter

Google Maps returns a lot of tiny local spots with 5–50 reviews. Filter to restaurants with **800+ reviews** for a competitive analysis dataset. This trades dataset size for data quality — everything that remains has meaningful market presence.

If this drops you below your minimum target (e.g. 150 restaurants), expand the geographic scope slightly rather than lowering the review threshold. Document this decision in your methodology notes.

---

## 4. Firecrawl — Review Extraction Without Getting Blocked

Google Maps, Zomato, and most delivery apps block direct review scraping. Firecrawl's Search API is the practical workaround — it queries Google's search results and returns the SERP description snippets, which contain real customer-written review text.

### How It Works

Firecrawl's search endpoint queries Google for a given string and returns the top results including their meta descriptions. Those descriptions often contain excerpts from actual customer reviews.

### Query Pattern

```python
query = f'"{restaurant_name}" {locality} {city} customer reviews'
# Example: '"Shamsundar Misal" CIDCO Nashik customer reviews'
```

Run this for each restaurant in your target list. Extract 5 snippets per restaurant — enough for sentiment analysis without over-calling the API.

### Firecrawl API Call

```python
import requests

response = requests.post(
    "https://api.firecrawl.dev/v1/search",
    headers={"Authorization": f"Bearer {FIRECRAWL_API_KEY}"},
    json={
        "query": query,
        "limit": 5,
        "lang": "en"
    }
)

results = response.json().get("data", [])
snippets = [r.get("description", "") for r in results if r.get("description")]
```

### What You Get and Its Limitations

You get real customer-written text pulled from public Google SERP descriptions — fully defensible as empirical data. Limitations:

- Snippets are short (1–3 sentences each) — enough for sentiment, not enough for deep qualitative analysis
- You get SERP descriptions, not the full review — some snippets may be from Swiggy/Zomato listing pages rather than pure customer reviews; that's fine for sentiment scoring
- Firecrawl has rate limits and costs API credits — batch your calls and add a 1-second delay between requests

### Sentiment Analysis on Snippets

Run a lexicon-based classifier on the extracted snippets. You don't need NLP models for this — a simple keyword approach is sufficient for market intelligence:

```python
POSITIVE_WORDS = {"great", "excellent", "amazing", "best", "love", "perfect",
                  "delicious", "tasty", "fresh", "fast", "friendly", "clean"}
NEGATIVE_WORDS = {"bad", "worst", "terrible", "slow", "cold", "rude", "dirty",
                  "overpriced", "stale", "late", "missing", "wrong"}

def score_sentiment(text):
    text_lower = text.lower()
    pos = sum(1 for w in POSITIVE_WORDS if w in text_lower)
    neg = sum(1 for w in NEGATIVE_WORDS if w in text_lower)
    if pos > neg:
        return "Positive"
    elif neg > pos:
        return "Negative"
    return "Neutral"
```

Also extract key drivers — which aspects customers mention:

```python
DRIVER_KEYWORDS = {
    "Taste/Quality": ["taste", "flavour", "flavor", "delicious", "fresh", "quality"],
    "Service":       ["service", "staff", "friendly", "rude", "polite"],
    "Price/Value":   ["price", "cheap", "expensive", "value", "affordable", "overpriced"],
    "Packaging":     ["packaging", "packed", "spilled", "sealed", "container"],
    "Delivery Time": ["fast", "slow", "late", "quick", "delay", "on time"],
    "Quantity":      ["quantity", "portion", "less", "more", "enough"],
}
```

---

## 5. Column Schema — Standard 24-Column Restaurant Listing

| Column | Source | Notes |
|---|---|---|
| `Restaurant_ID` | Generated | `PLATFORM-{numeric_id}` e.g. `SW-71010`, `GM-008` |
| `Collection_Date` | Script | Date of scrape — keep format consistent |
| `Platform` | Script | Platform name string e.g. `Swiggy`, `Grab`, `Google Maps` |
| `Search_Keyword` | Script | The locality string used as search input |
| `Restaurant_Name` | API | |
| `Cuisine_Category` | API / mapped | Map to standard categories (see Section 7) |
| `Subcategory` | API | Raw category string from the platform |
| `Marketplace_Rank` | API | Only from primary anchor sweep; all others `N/A` |
| `Sponsored?` | API | `Yes` / `No` |
| `Rating` | API | |
| `Review_Count` | API | Integer |
| `Price_For_Two` | API | In local currency |
| `Estimated_AOV` | Calculated | `Price_For_Two × 0.8` (proxy for single order value) |
| `Delivery_Time_Min` | API | Integer minutes; `Not Available` if platform doesn't expose it |
| `Distance_KM` | API | `Not Available` for Google Maps rows |
| `Free_Delivery?` | API | `Yes` / `No` / `Not Available` |
| `Bestseller_Tags` | API (menu deep-dive) | Comma-separated item names |
| `Top_Menu_Items` | API (menu deep-dive) | Comma-separated item names |
| `Offer/Discount` | API | Raw offer string; `Not Available` for Google Maps rows |
| `Open_Hours` | API / imputed | `HH:MM AM - HH:MM PM (Est.)` if imputed |
| `Late_Night?` | Derived | `Yes` if open past 11 PM |
| `Packaging_Visible?` | Derived | `Yes` if packaging mentioned in reviews |
| `Source_URL` | Generated | Direct link to platform listing |
| `Notes` | Manual | Rank methodology note, geography note, anything non-standard |

---

## 6. Menu Items Schema — Standard 18-Column Format

| Column | Logic |
|---|---|
| `Menu_Item_ID` | Sequential `MI-0001`, `MI-0002` |
| `Restaurant_ID` | Matches listing file |
| `Platform` | Platform name |
| `Restaurant_Name` | From listings file |
| `Cuisine_Category` | From listings file |
| `Item_Name` | From API |
| `Item_Type` | Mapped from category title: Starters / Main Course / Breads / Desserts / Beverages / Breakfast / Other |
| `Is_Bestseller?` | `Yes` if bestseller flag present on item |
| `Price` | Item price in local currency (note: some APIs store in paise/cents — divide accordingly) |
| `Portion_Size` | `Not Available` — rarely in delivery APIs |
| `Combo?` | `Yes` if `"combo"` or `"meal"` in item name |
| `Meal_Occasion` | Mapped from Item_Type (Breakfast → Breakfast, Starters → Snack, Main Course/Breads → Lunch/Dinner, Desserts/Beverages → Any) |
| `Veg/Non-Veg` | From veg flag in API; `Not Available` if not exposed |
| `Packaging_Risk` | Low (Beverages/Desserts), Medium (Starters/Breads), High (Main Course with gravy) |
| `Travel_Suitability` | Good / Fair / Poor — follows Packaging_Risk |
| `Margin_Assumption` | High (low price tier), Medium (mid), Low (premium) — define thresholds per market |
| `Source_URL` | Direct link to restaurant page on platform |
| `Notes` | Leave blank or add data quality notes |

**Price storage note:** Many delivery app APIs store prices in minor currency units (paise for India, cents for USD markets). Always check the raw API response — a ₹150 item showing as `15000` means it's in paise (divide by 100). Document whichever conversion applies in your script's configuration section.

---

## 7. Cuisine Category Mapping

Map raw platform category strings to standard categories. Adapt the list for the market you're analyzing — the ones below cover India well and can be extended.

```python
CATEGORY_MAP = {
    # North Indian
    "north indian": "North Indian", "punjabi": "North Indian", "mughlai": "North Indian",
    # Biryani
    "biryani": "Biryani", "hyderabadi": "Biryani",
    # Chinese
    "chinese": "Chinese", "indo chinese": "Chinese",
    # South Indian
    "south indian": "South Indian", "udupi": "South Indian",
    # Regional (adjust for your locality)
    "maharashtrian": "Regional", "marathi": "Regional", "misal": "Regional",
    "bengali": "Regional", "rajasthani": "Regional", "kerala": "Regional",
    # Fast Food
    "fast food": "Fast Food", "burgers": "Fast Food / Burgers",
    "american": "Fast Food / Burgers",
    # Pizza
    "pizza": "Pizza", "italian": "Pizza",
    # Desserts
    "desserts": "Desserts", "ice cream": "Desserts", "sweets": "Desserts",
    # Cafe / Snacks
    "cafe": "Cafe / Snacks", "snacks": "Cafe / Snacks", "sandwich": "Cafe / Snacks",
    # Healthy
    "healthy": "Healthy / Salads", "salad": "Healthy / Salads",
    # Street Food
    "street food": "Street Food", "chaat": "Street Food",
    # Other
    "seafood": "Seafood",
    "rolls": "Rolls / Wraps", "wraps": "Rolls / Wraps",
    "thali": "Thalis / Meal Combos", "meal": "Thalis / Meal Combos",
    "continental": "Continental / Multi-Cuisine",
}
```

For multi-cuisine strings like `"North Indian, Biryani, Chinese"` — take the first token as the primary `Cuisine_Category` and store the full original string in `Subcategory`.

---

## 8. Script Architecture — What Works

### Recommended Structure

```python
# ── Configuration ─────────────────────────────────────────────
COORD_SWEEP = [...]          # 15–25 coordinate points
PLATFORM_HEADERS = {...}     # Full headers including session cookie
MIN_REVIEWS = 800            # Filter threshold

# ── Step 1: Fetch listings via grid sweep ─────────────────────
def fetch_listings():
    seen_ids = set()
    results = []
    for i, (label, lat, lng) in enumerate(COORD_SWEEP):
        is_primary = (i == 0)
        raw = call_platform_api(lat, lng, PLATFORM_HEADERS)
        restaurants = extract_restaurants(raw)
        for position, r in enumerate(restaurants):
            if r["id"] not in seen_ids:
                seen_ids.add(r["id"])
                rank = position + 1 if is_primary else "N/A"
                results.append(build_row(r, rank, label, is_primary))
        time.sleep(1.5)
    return results

# ── Step 2: Filter by review count ───────────────────────────
df = df[df["Review_Count"] >= MIN_REVIEWS]

# ── Step 3: Load Google Maps data (Apify output) ─────────────
gm_df = load_and_filter_apify_output("apify_output.xml")

# ── Step 4: Cross-platform dedup and merge ───────────────────
merged_df = merge_platforms(df, gm_df)

# ── Step 5: Fetch reviews via Firecrawl ──────────────────────
reviews = fetch_firecrawl_reviews(merged_df["Restaurant_Name"].tolist())

# ── Step 6: Export ───────────────────────────────────────────
export_to_excel(merged_df, reviews, "output_workbook.xlsx")
```

### Rate Limiting

- 1.5 seconds between listing API calls (minimum)
- 2 seconds between menu API calls (heavier payload)
- 1 second between Firecrawl search calls
- No parallel requests to the same platform

### Checkpointing

For runs that take >5 minutes, save intermediate CSVs after each grid sweep so a network failure doesn't lose progress:

```python
pd.DataFrame(results_so_far).to_csv(f"checkpoint_{label}.csv", index=False)
```

---

## 9. Cross-Platform Deduplication

When merging delivery app and Google Maps data, check for name overlaps. Exact string match misses variations like `"KFC"` vs `"KFC - CIDCO Branch"`. Use normalized comparison:

```python
import re

def normalize(name):
    return re.sub(r'[^a-z0-9]', '', str(name).lower().strip())

platform_names = {normalize(r["Restaurant_Name"]) for r in platform_data}
gm_unique = [r for r in gm_data if normalize(r["Restaurant_Name"]) not in platform_names]
```

Keep the delivery app record as the primary when both platforms have the same restaurant — delivery apps have richer data (delivery time, offers, menu, rank).

---

## 10. Common Failures and Fixes

| Problem | Symptom | Fix |
|---|---|---|
| API returns 202 / empty | Every request returns 202 or empty JSON | Get fresh session cookie from browser; ensure running locally |
| Cloud execution blocked | `getaddrinfo failed` or 403 even with valid cookie | WAF ties session to browser IP; always run locally |
| Network DNS block | App domain resolves to `blocked.anexgate.com` or similar | Switch to mobile hotspot |
| 0 items after parsing | Script runs, no error, but 0 rows extracted | API response shape changed; add recursive extractor, try alternate paths |
| All sponsored = No | `Sponsored?` column is entirely No | Promoted field name changed; check multiple field names on both info and parent card |
| Rank numbers all sequential | Rank goes 1–N across all restaurants | Stop using a global counter; only assign rank from primary sweep; all others N/A |
| Dataset undershoots target | Strict geofencing gives only 40–60 results | Expand to delivery radius scope; document in Notes |
| Grid sweep duplicates | Same restaurant appears 2–3× | Dedup by platform ID, keep first occurrence |
| Apify returns cross-city results | Non-local addresses in output | Post-filter by address keywords; flag unverifiable ones |
| Multi-cuisine breaks mapping | `"North Indian, Biryani, Chinese"` doesn't map | Take first token as primary; store full string in Subcategory |
| Firecrawl returns listing page descriptions | Snippet is from a delivery platform listing page not a customer review | Still usable — listing page descriptions contain customer-relevant language; note the source type in the Reviews sheet |
| Price stored in minor currency units | ₹150 item shows as `15000` in API | Check raw response; divide by 100 for paise/cents |

---

## 11. "Not Available" vs Blank

Always use `"Not Available"` as a string — never leave fields blank. Blank looks like an error or oversight. `"Not Available"` is documented and defensible.

Columns legitimately unavailable from Google Maps rows:
- `Delivery_Time_Min` — GM doesn't have delivery data
- `Free_Delivery?` — same
- `Offer/Discount` — same
- `Bestseller_Tags` — same
- `Open_Hours` — sometimes present, sometimes not

Never impute or invent values to fill these. The honest `"Not Available"` is always stronger than a made-up number.

---

## 11a. Geocoding Missing Coordinates

Some delivery app APIs intentionally strip `latitude` and `longitude` from their response payloads (Zomato does this to prevent third-party tracking). When this happens, default the fields to `"Not Available"` in the primary scraper and fix them in a separate post-processing step.

### Why ArcGIS over Google Maps or OpenStreetMap

- **Google Maps Geocoding API:** Requires billing setup — not suitable for quick enrichment runs
- **OpenStreetMap (Nominatim):** Free but rate-limits aggressively (1 request/second hard limit, often returns null for Indian addresses)
- **ArcGIS (Esri) `findAddressCandidates` REST API:** Free, unauthenticated, no API key required, and significantly more accurate for Indian addresses than Nominatim

### The Pattern

Build a standalone script (`geocode_enricher.py` or similar) — never mix geocoding into the primary scraper:

```python
import requests, time

ARCGIS_URL = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates"

def geocode(restaurant_name, locality, city):
    address = f"{restaurant_name}, {locality}, {city}"
    params = {
        "SingleLine": address,
        "f": "json",
        "outFields": "Match_addr,Addr_type",
        "maxLocations": 1,
    }
    response = requests.get(ARCGIS_URL, params=params)
    candidates = response.json().get("candidates", [])
    if candidates:
        loc = candidates[0]["location"]
        return loc["y"], loc["x"]  # lat, lng
    return "Not Available", "Not Available"

# Loop through Excel rows that still have "Not Available" coordinates
for idx, row in df[df["Latitude"] == "Not Available"].iterrows():
    lat, lng = geocode(row["Restaurant_Name"], row["Locality"], CITY)
    df.at[idx, "Latitude"] = lat
    df.at[idx, "Longitude"] = lng
    time.sleep(0.5)  # gentle rate limit — ArcGIS is free but don't hammer it
```

**Critical safety rule:** Never run the geocoder and the primary scraper simultaneously against the same Excel file. `openpyxl` does not support concurrent file access — two scripts writing at the same time will corrupt the workbook. Run them sequentially: finish the primary scrape fully, then run the geocoder as a separate pass.

- [ ] No blank rows — every row has ID, Platform, Name, Rating, Review_Count
- [ ] `Marketplace_Rank` only populated for primary anchor restaurants; all others `N/A`
- [ ] No duplicate Restaurant_IDs within the same platform
- [ ] `Cuisine_Category` uses standard categories only
- [ ] `Notes` has a meaningful entry for any non-standard inclusion
- [ ] `Collection_Date` is consistent format across all rows
- [ ] Review count filter applied and the threshold documented
- [ ] At least 2 platforms represented
- [ ] `Estimated_AOV` calculated for all rows
- [ ] `Source_URL` populated for every row
- [ ] Any far/boundary restaurants have a Notes entry explaining why they're included

---

## 13. Adapting for Other Cities or Markets

**For a different Indian locality:**
1. Replace `COORD_SWEEP` with 15–25 points around the new area
2. Update the address include/exclude keywords in Section 3
3. Adjust the `Regional` cuisine bucket with the area's native cuisines
4. Adjust the review threshold — 800 works for Tier 2 cities; use 2000+ for Mumbai/Delhi, 200 for smaller towns

**For non-Indian markets:**
- Replace the delivery app endpoint and cookie approach with the local app (Grab, DoorDash, UberEats, Deliveroo, Foodpanda — all use the same cookie-extraction technique)
- Google Maps via Apify works identically everywhere
- Firecrawl works identically everywhere
- The schema, deduplication logic, category mapping structure, and filtering patterns all transfer directly
- Adapt the Veg/Non-Veg column to whatever dietary flag the local market uses (Halal, Kosher, etc.)
- Adjust price tier thresholds for local currency

---

## 14. Output File Structure

**Single master workbook** with these sheets:

| Sheet | Contents |
|---|---|
| `Restaurant_Listings` | 24-column listing, all platforms merged |
| `Menu_Items` | 18-column menu items from delivery app API |
| `Reviews` | Firecrawl review snippets with sentiment columns |
| `Category_Summary` | Aggregated stats per cuisine category |
| `Demand_Signals` | Evidence-based demand observations |
| `Competitor_Scorecard` | Top 10–15 competitor profiles with strengths/weaknesses |
| `Lookup_Lists` | Reference data — category map, standard values |

**Raw data files** — keep separate:
- `1_Platform_Listings.xlsx` — raw delivery app output before filtering
- `2_Menu_Items.xlsx` — raw menu extraction
- `3_Reviews.xlsx` — raw Firecrawl output before sentiment scoring
- `4_GoogleMaps_Listings.xlsx` — raw Apify output before filtering

Raw files let you trace every cleaned row back to source, which is critical if the work is questioned.
