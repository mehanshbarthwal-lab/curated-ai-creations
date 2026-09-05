---
name: jd-to-job
description: Use this skill whenever Mehansh is applying for a job, internship, founding-level role, or any position and wants to stand out instead of just sending a resume into an ATS. Trigger on phrases like "help me apply for", "here's a JD", "should I apply to this role", "write an application for", or when he pastes a job description and wants help getting noticed. This skill turns a job description into a proof-of-work application - it extracts the real must-have skills from the JD, proposes a small buildable project that demonstrates those skills (tailored to the company and to Mehansh's own work at mehanshlabs.qzz.io where relevant), and drafts a direct outreach email to send to the founder or hiring manager instead of going through a portal. Also use this for the interview-prep bonus step once he's been shortlisted and wants to research the interviewer's public thinking.
---

# JD-to-Job Strategy

The core idea: most people apply by sending a resume and hoping. This flips it — show the hiring
manager you can do the job by building something small that proves it, instead of just telling them.
It works especially well at small, founder-led companies who care more about "can this person
actually do the work" than pedigree.

Mehansh is an M.Sc. Economics student at FLAME who independently builds and ships AI tooling
(hosted at mehanshlabs.qzz.io), and is open to founding-level, equity-based roles alongside his
studies. Keep that framing in mind — he's not a generic applicant, he already has shipped work to
point to, so lean into that instead of writing from a blank slate. His outreach voice is
conversational, first-person, and a little wordy rather than crisp and bulleted — see
`references/voice-notes.md` before drafting the email specifically, since that's the piece most
likely to sound like an application unless it's deliberately kept loose and human.

## When you have a JD to work from

Run this as one continuous pass, not four separate deliverables the user has to stitch together
themselves — walk through it in order and land on a finished email at the end.

### Step 1 — Extract the real must-haves

Read the full JD (ask for it if it wasn't pasted) and separate the buried must-haves from the
fluff and nice-to-haves. Rank them by how critical they seem to actually doing the job day to day,
not by how prominently they're listed. Company size and stage matters here — a bootstrapped,
founder-led startup (like College Circle AI) usually cares more about scrappy proof-of-work than a
big company would, so weight the must-haves toward what a founder would actually need shipped in
week one.

### Step 2 — Propose project ideas that prove it

Before proposing anything, check whether there's something already built at mehanshlabs.qzz.io or
described elsewhere in memory (`/areas/mehanshlabs-ai-tooling.md`, `/areas/gender-wage-gap-dissertation.md`)
that already demonstrates one or more of the must-haves — pointing back at real shipped work beats
proposing a new toy project every time. But don't assume — ask Mehansh directly whether he wants to
point back at existing work or have something fresh proposed, since this varies by role and he'd
rather decide than have it guessed.

If proposing something fresh: suggest 2-3 project ideas buildable in under a week, each mapped
explicitly to which must-have it proves and why a hiring manager at this specific company would
find it convincing. Ground it in the company's actual product or website, not a generic version of
the idea.

### Step 3 — Package it as a walkthrough (brief note only)

This step is mostly execution outside the chat (recording a 2-4 minute video walking through the
build), so don't try to generate it — just remind Mehansh that the walkthrough matters more than
the artifact itself, since it's proof of how he thinks, not just what he made, and prompt him to
come back once it's built so the email can reference it properly.

### Step 4 — Draft the direct outreach email

Draft a short email addressed to the founder or hiring manager (not a portal submission) with:
- a subject line that signals "I built something to show you, not just tell you"
- 1-2 lines on what was built and why, tied back to the must-haves from Step 1
- a placeholder for the walkthrough link
- an invitation to talk through the thinking behind it

Write it in Mehansh's own voice per `references/voice-notes.md` — this should read like Mehansh
wrote it in one sitting, not like a template with blanks filled in. Present it as a draft to react
to, not a final version — he'll want to adjust it.

## Bonus — Interview prep once shortlisted

Only run this when Mehansh says he's got an interview or has been shortlisted, not proactively.
Research the founder or hiring manager's public content (LinkedIn, X, podcasts, blog posts) via
web search, summarize the 4-5 ideas or opinions they return to most (especially anything about the
company's industry or the role itself), and suggest natural, non-rehearsed-sounding ways to
reference those ideas in conversation — the goal is "I think the way you do," not name-dropping
their tweets back at them.

## Related skills worth surfacing

This skill is about proving fit for one specific role through built work, but it's not the only
lever available — while working through this, it's worth flagging the others when relevant rather
than assuming Mehansh will remember they exist:

- if the company is one he might have a warm path into through his network, mention the
  `happenstance-referrals` skill as a way to find a referral or intro alongside the direct email
- if he's thinking about outreach at scale to multiple people or companies rather than one specific
  role, mention `linkedin-ai-outreach` instead, since that's built for campaigns and follow-ups
  through Aimfox rather than a single tailored email

Don't run those skills automatically — just offer them as a next step once the jd-to-job pass is
done, since he may only want the one thing.

## Where else this applies

The same four-step shape works for any role, not just tech/AI ones — design (mock redesign of a
real product page), marketing (sample campaign or content calendar), sales (mock outreach sequence
or account plan), ops/PM (30-60-90 day plan or process doc), engineering (small feature or fix
touching the real product if it's public). Adapt Step 2's project suggestions to whichever domain
the JD is actually in rather than defaulting to a coding project for every role.
