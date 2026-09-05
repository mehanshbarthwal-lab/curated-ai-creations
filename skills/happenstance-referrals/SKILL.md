---
name: happenstance-referrals
description: Use this skill whenever the user wants help finding referrals, warm intros, or people to network with for a job search, internship search, or industry research, especially if they mention Happenstance, connecting their LinkedIn/Instagram/Gmail/Calendar networks, searching for people at target firms, or drafting a referral or cold outreach message. Also trigger this whenever the user asks for help writing a referral ask, an intro request, or a "quick question" networking message to someone at a target company, even if they don't mention Happenstance by name, since this skill covers both the account setup workflow and the message drafting template. Make sure to use this any time the user is job hunting or internship hunting and needs to find or message people at specific firms.
---

# Finding Referrals with Happenstance

This skill helps the user get warm referrals by using Happenstance, an AI people search
tool that unifies contacts across Gmail, LinkedIn, Instagram, Twitter/X, Calendar, and
Outlook into one searchable network, and then by drafting a short, specific referral ask
to the people it surfaces.

There are two things this skill can help with, and the user might want just one of them
or both, so figure out which one they're actually asking for before diving in:

1. walking them through connecting their accounts and searching Happenstance for the
   right people
2. helping them pull out specific details from a person's profile and drafting the
   actual outreach message

If the user already has a name, a company, or a screenshot/description of someone's
profile and just wants the message written, skip straight to the drafting part below,
there's no need to re-explain the account setup every time.

## Part 1 — Connecting accounts and finding people

Walk the user through this if they haven't set up Happenstance yet or are trying to
search for people and aren't sure how.

Start at happenstance.ai and sign up with Google or email, and the onboarding flow will
prompt them to connect their networks right away, so it's worth doing that up front
rather than skipping it, since more connected networks means a deeper and more useful
search pool.

From the dashboard, they'll click Connect your accounts (or go to the Connectors page
under Settings) and connect LinkedIn first, which uses OAuth or in some cases the
Happenstance Chrome extension that syncs LinkedIn connections quietly in the background
while they browse normally. Instagram is next, and that pulls in followers and
following so those people become searchable too. Facebook isn't a native connector, so
if the user really wants Facebook contacts in there, they'd need to export their
Facebook friends list from Settings → Your Information → Download Your Information and
upload it manually if Happenstance's import tool supports that, though honestly
LinkedIn plus Instagram plus Gmail already covers most professional referral paths, so
it's fine to tell the user not to bother with Facebook unless they specifically want it.

Gmail, Google Calendar, and Twitter/X are worth connecting too if relevant to the
user's industry, since Happenstance also searches calendar history and email threads
for people they've actually interacted with, which tends to surface people a plain
LinkedIn search would miss.

One more thing worth mentioning: joining or creating a Group, like their college, an
internship cohort, or an industry community, expands the search radius to include
friends' networks too, not just the user's own, so if the user is doing a serious
search it's worth suggesting this.

The reason all this matters is that a referral from a 1st degree, mutual, or
recently-active connection carries a lot more weight than a cold LinkedIn message, and
that's the whole point of Happenstance, surfacing those warm paths instead of forcing
the user to cold-message strangers.

### Searching for people

Once accounts are connected, the user types a natural language description into the
search bar, and it helps to be specific about role, seniority, firm type, and any bonus
criteria, so if they're vague about what they're looking for, help them sharpen it
before they search. A good example query looks something like "equity research analysts
or IB analysts at boutique or mid-market Indian investment banks, ideally CFA
charterholders or Delhi University alumni, open to giving referrals," since that gives
Happenstance enough to work with.

The results come back ranked with a match score and show exactly how the user is
connected to each person, whether that's through LinkedIn, Gmail, a mutual friend, or a
shared group. If the first search comes back too broad or not quite right, refine it by
adding things like a city or "joined the firm in the last 2 years," and it's worth
knowing that juniors tend to respond to referral requests more readily than senior
people, so nudging the user toward junior folks first is usually the right call.

Whatever the results, help the user prioritize people flagged with mutual connections,
since those are the strongest candidates because the user can credibly reference the
shared contact when reaching out.

## Part 2 — Researching a person and drafting the message

Once the user has a specific person in mind, whether from a Happenstance search or from
somewhere else entirely, this is where the message actually gets written.

### Pull the specific details first

Before writing anything, get 3 to 4 specific facts about the person, because generic
messages get ignored and specific ones get replies. If the user hasn't given you these
yet, ask, or if they've pasted in a profile or description, pull them out yourself.
Look for a shared background like the same college, same city, same CFA level, same
prior firm, or same VC/PE community, a mutual connection who can provide the warm
context, the person's specific role or team rather than something vague like "you work
in finance," and ideally something recent and relevant, like a post they shared, a deal
their firm closed, or a talk they gave, since that shows the user did more than skim
the person's name.

If the user can't come up with any of these, it's worth pushing back gently and telling
them the message will land much better with even one specific detail, rather than just
writing something generic anyway.

### Draft the message

Keep it under 100 words. State who the user is, the specific connection, what they're
asking for (a referral or a conversation, not a job directly), and make it easy to say
yes with a low-effort ask like a 15-minute call.

Here's the template to work from, and remember to write in the user's actual voice
rather than defaulting to something stiff and formulaic, since a referral message that
sounds like it was written by a template generator defeats the whole purpose:

Subject line if it's an email or InMail should reference the shared background, like
"Quick question from a fellow DU finance grad."

The message itself opens with who the user is and how they came across the person,
folding in one specific genuine detail right away, whether that's a mutual connection
or something about the person's team or recent work. Then it states the user's own
one-line positioning, like their year, degree, and any relevant credential or
internship, and what they're currently exploring. It closes with the actual ask, a
quick 15-minute call or being pointed to the right person on their team, offers to send
a resume if useful, and thanks them without being over the top about it.

### Do's and don'ts to keep in mind while drafting

Reference something specific from the person's profile within the first two lines
rather than burying it. Make the ask concrete, a 15-minute call or a named point of
contact, not something vague like "any advice helps." Send it through whatever channel
the user is already connected on, LinkedIn if they're 1st degree, email if they have it
through Happenstance or Gmail. And never reuse the exact same message for multiple
people, since the specific detail has to change every time or the whole approach falls
apart. Also don't ask for a job outright in the first message, the ask should be for a
conversation or a referral, and the job ask itself comes later if it's warranted.

## Related skills worth surfacing

Referrals are one lever, not the only one, so mention the others when it fits rather than assuming
this is the only tool for the job:

- if there's a specific role and JD he's targeting, mention `jd-to-job` for building proof-of-work
  and sending a direct application alongside the referral ask
- if he wants to reach a broader list of people at scale rather than one warm intro at a time,
  mention `linkedin-ai-outreach`, which runs actual campaigns through Aimfox

Offer these as next steps once the referral search or message draft is done, don't run them
automatically.

## Output format

If the user wants the message ready to send, write it out in full, filled in with
whatever real details are available, and if something like the mutual connection's name
or the specific deal isn't known yet, leave an obvious placeholder like [Mutual Name]
rather than making something up. If the user is drafting multiple outreach messages at
once for different people, keep each one distinct rather than reusing the same wording
with names swapped, since that's the exact mistake the skill exists to avoid.
