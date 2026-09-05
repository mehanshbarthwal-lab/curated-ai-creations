---
name: resume-unrejectable
description: Run a resume through a four-stage gauntlet that mirrors the real hiring pipeline, an ATS parser check, a recruiter keyword gap analysis, a bullet-by-bullet XYZ rewrite, and a mock hiring-manager interview. Use this whenever the user wants to fix up, optimize, tailor, or stress-test their resume for a specific job or company, asks "will my resume pass an ATS," wants keyword gap analysis against job postings, wants their bullets rewritten with metrics, or wants mock interview practice for a role they're applying to. Trigger on phrases like "review my resume," "tailor my resume for X," "will this resume get filtered," "rewrite my bullets," or "give me a mock interview for this role." Run all four stages in sequence within the same conversation so each stage builds on the last, unless the user only wants one specific stage.
---

# Resume Unrejectable

Four stages that put a resume through the same gauntlet a real application faces, the parsing software, the recruiter skim, the rewrite, and the interview. Run them in order in one conversation so context carries through from stage to stage. Each stage's output feeds the next.

## What you need before starting

Gather these from the user before beginning (ask if missing):

- Their current resume, as pasted text or an uploaded file
- The exact role and company they're targeting
- 1 to 3 real job descriptions for that role (if they don't have any, offer to web search for current postings for that role and base the analysis on those)

If the user only wants a single stage (e.g. "just check my resume for ATS issues"), run that stage alone and skip the rest. Otherwise run all four in sequence.

## Stage 1: The Diagnoser (ATS parse check)

Read the resume the way an automated tracking system parser does, for machine readability, not style.

1. Flag anything that breaks parsing: tables, columns, text boxes, images, icons, headers/footers, unusual section titles, non-standard fonts, special characters
2. List every section a parser might misread or drop entirely, and explain why
3. Give the exact fix for each issue, rewritten so a parser reads it cleanly
4. Rank issues from most to least likely to get the resume filtered out before a human ever sees it

Frame this as a strong proxy for how ATS systems generally behave, not a guarantee for any one specific company's software. Each flag is "very likely a problem," not a certainty.

## Stage 2: The Recruiter (keyword gap analysis)

Act as a senior recruiter hiring for the target role and company.

1. Pull keywords and skills that show up across the provided job descriptions, especially ones that repeat across multiple postings
2. Identify which of these are missing or weak in the resume
3. Give the top 10 to add, ranked by how often they appear and how much they matter for this role

Only suggest skills the user could honestly back up. Flag separately any that would require them to actually learn something new, don't blend these into the main list.

If no job descriptions were provided, web search for current postings for this role and base the analysis on those, but note that pasted real postings are still the sharper input.

## Stage 3: The Rewriter (XYZ bullet rebuild)

Rebuild the experience section using the missing-but-honest keywords identified in Stage 2, and Google's XYZ formula:

"Accomplished [X], as measured by [Y], by doing [Z]."

Rules:
- Every bullet shows a result, a number, and the method
- Work keywords in naturally, never stuff them
- Cut red flags and vague filler language
- If a bullet is missing a number, ask the user for the real figure rather than inventing one. Never fabricate metrics, fake stats fall apart the moment someone asks about them in an interview

## Stage 4: The Hiring Manager (mock interview)

Act as the hiring manager for this exact role, using the rewritten resume from Stage 3.

1. Interview the user for real, one question at a time, starting easy and escalating to the toughest technical questions for this field
2. Wait for their answer before asking the next question
3. After each answer, score it out of 10 and explain exactly what would make it a 10
4. Run about 8 questions total, then give an overall hire / no-hire call and the 3 things to fix before a real interview

Encourage the user to answer in real time as if it were the actual interview, the value is in reps under pressure, not polished typed answers.

## Definition of done

- Resume parses cleanly with no remaining ATS red flags
- Every must-have keyword from the real postings is present and honestly true
- Every bullet has a result, a number, and the method
- A full mock interview has been run and the user knows their 3 weakest answers
