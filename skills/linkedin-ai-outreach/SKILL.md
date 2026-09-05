---
name: linkedin-ai-outreach
description: Use this skill whenever Mehansh wants to run LinkedIn prospecting or outreach through Aimfox — sourcing prospects, drafting a first message and follow-up, setting up a connect/message/follow-up campaign, or checking how a campaign is performing. Trigger on phrases like "find prospects on LinkedIn", "draft an outreach message", "set up an Aimfox campaign", "add these profiles to my campaign", "how's my LinkedIn campaign doing", or when he pastes a list of companies/roles/profile URLs and wants outreach built around them. Based on his capytal.bara LinkedIn AI Outreach Workflow SOP, this keeps outreach personalized, human-reviewed, and properly tracked rather than bulk blasting.
---

# LinkedIn AI Outreach Workflow

This skill is Mehansh's own SOP (from capytal.bara) turned into something Claude can actually execute with the connected Aimfox account. The whole point of the original doc is: outreach should stay relevant and human-led, automation is there to support that, not replace it. So the skill should never auto-blast a big list without Mehansh reviewing the message and the target list first.

## Before doing anything, check the Aimfox connection

Aimfox tools need to be loaded before they're callable — call `tool_search` for the relevant ones (e.g. `list_accounts`, `create_campaign`, `add_multiple_profiles_to_campaign`, `send_message`, `get_campaign_metrics`) before using them. If the user hasn't connected Aimfox yet, or a call fails on auth, that's when `suggest_connectors` comes in — don't call it if Aimfox tools are already working.

Always start a new outreach task by calling `Aimfox:list_accounts` to get the `account_id` you'll need for campaign creation and messaging — never guess or reuse an ID from a previous session without checking.

## Step 1 — Prospect sourcing

Ask what the target is: a company, a role/title, or a keyword — or whether Mehansh already has a list (profile URLs or a CSV of connections). Don't source anything without this.

- If he wants to search fresh prospects, use `Aimfox:search_leads` or `Aimfox:search_leads_facets` (load via tool_search first) to pull relevant profiles by the target criteria.
- If he's handing you a CSV or list of profile URLs directly, work from that instead — no need to search.
- Either way, end this step with a clean list of profile URLs before moving to message drafting. Show him the list count and a few samples so he can sanity-check the targeting before you go further.

## Step 2 — Draft the first message

Draft manually, with AI support — never auto-generate and send without review. Structure (from the SOP):

1. Introduction — who Mehansh is and his background
2. Educational background or specialization
3. Career goal / current direction
4. Why this specific recipient is relevant to him
5. A polite, open-ended request to learn from their experience — not a direct ask for a referral or job

Keep it concise, respectful, and learning-oriented. Pull relevant specifics from what Claude knows about Mehansh (FLAME M.Sc. Economics, ML for Data Science coursework, mehanshlabs.qzz.io projects) only where they're genuinely relevant to the recipient — don't force-fit his background into every message.

Use personalization variables (e.g. `{{first_name}}`, `{{company}}`) so it reads naturally across the list rather than generically.

Show the draft to Mehansh and get explicit go-ahead before it goes into a campaign.

## Step 3 — Draft the follow-up

One short follow-up, sent after 1–2 days. Structure:

- Reference the earlier message
- Acknowledge they may be busy
- Warm, respectful tone — never pushy or urgent

Keep it noticeably shorter than the first message.

## Step 4 — Campaign setup in Aimfox

Once both messages are approved:

1. `Aimfox:create_campaign` — needs `account_ids` (from `list_accounts`), `name`, `outreach_type` (`connect` / `message` / `inmail` / `drip` — the SOP's three-step flow of Connection Request → Main Message → Follow-Up maps to `outreach_type: "drip"` in most cases), and `type` (`list` if using a specific profile set, `search` if using saved search criteria; `list` campaigns also need `audience_size`).
2. Add the sourced profiles: `Aimfox:add_multiple_profiles_to_campaign` for the full list (pass `custom_variables` per profile if you're personalizing beyond the standard fields), or `Aimfox:add_profile_to_campaign` for one at a time.
3. If Mehansh wants to pull a profile out later, that's `Aimfox:remove_profile_from_campaign`.
4. Confirm the follow-up delay and time zone with him rather than assuming — the SOP calls for 1–2 days and audience-appropriate timing, but don't hardcode it.
5. Recap the full setup back to him — account, message, follow-up, list size, delay — before treating the campaign as live.

## Step 5 — Campaign management & tracking

For ongoing monitoring:

- `Aimfox:get_campaign_metrics` — messages sent, connection acceptance, replies, positive responses, conversion rate. This is the direct equivalent of the SOP's tracking table.
- `Aimfox:list_conversations` / `Aimfox:get_conversation` to check inbox activity.
- `Aimfox:get_lead_conversation` to pull the conversation URN for a specific lead before replying.
- `Aimfox:send_message` to reply personally to someone — always draft the reply with Mehansh rather than auto-sending, same as the first message.

If acceptance or reply rates look consistently low, flag it and suggest adjusting the message or targeting rather than just pushing more volume — that's the SOP's explicit operating rule, not bulk-for-its-own-sake.

## Related skills worth surfacing

Campaign outreach is built for scale, but not every situation calls for it, so mention the others
when they'd fit better:

- if he's targeting one specific role at one company, mention `jd-to-job` for building a proof-of-
  work project and sending a direct, tailored email instead of a campaign message
- if a prospect on the list turns out to be a warm connection rather than a cold one, mention
  `happenstance-referrals`, since a referral ask through a warm path usually beats a cold campaign
  message to the same person

Offer these as next steps rather than switching into them automatically.

## Operating rules (carry these through every step)

- Keep every message relevant to the specific person — no generic mass copy
- AI/automation supports the workflow, it doesn't replace Mehansh's judgment or review
- Never send a large batch without him reviewing message + list quality first
- Reply personally and promptly when someone responds
- Adjust messaging if response rates are consistently weak, rather than just sending more
