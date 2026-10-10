// Optional self-check at the end of each module: three questions, answers shown right away.
// Public and ungraded. Drawn from the course edition's question bank (not the questions used
// in its graded level quizzes) and checked against this site's module text.

export type ModuleQuizQuestion = {
  prompt: string;
  options: string[];
  // Index into options.
  answer: number;
  explanation: string;
};

export const moduleQuizzes: Record<number, ModuleQuizQuestion[]> = {
  1: [
    {
      prompt: "A colleague runs the same prompt on Monday and Friday and gets noticeably different emails. What explains this?",
      options: [
        "The vendor retrained the model on new data sometime between Monday and Friday.",
        "The model remembered Monday's draft and deliberately avoided repeating it.",
        "The model samples from probable next tokens, so its output is not deterministic.",
        "A small, unnoticed change in the prompt's wording produced a different result.",
      ],
      answer: 2,
      explanation: "Each response draws from a probability distribution of plausible continuations. The same prompt can produce different emphasis, examples and phrasing - so AI output cannot be treated as a stable, citable source.",
    },
    {
      prompt: "Which statement best describes the difference between a database and an AI language model?",
      options: [
        "A database returns records that exist; a model writes new text.",
        "Both retrieve stored records, but a model retrieves them faster.",
        "A model is a compressed database that unpacks records on request.",
        "A database writes new answers; a model links out to its sources.",
      ],
      answer: 0,
      explanation: "Databases return real records; language models generate plausible text.",
    },
    {
      prompt: "What does retrieval-augmented generation (RAG) add to a language model?",
      options: [
        "It lets the model act on its own - sending email or updating records.",
        "It retrains the model each night so its knowledge never goes out of date.",
        "It checks each sentence against a database, so every answer is accurate.",
        "It retrieves documents from a defined source first, then answers from them.",
      ],
      answer: 3,
      explanation: "RAG anchors output to documents that actually exist - Primo Research Assistant works this way, which is why it can cite records a patron can open. It improves grounding but does not guarantee accuracy.",
    },
  ],
  2: [
    {
      prompt: "Which prompt is written in the more reliable \"information in\" mode?",
      options: [
        "\"Which databases are best for nursing research at a college?\"",
        "\"Here is my LibGuide draft. Make the introduction clearer.\"",
        "\"List five recent peer-reviewed studies on library anxiety.\"",
        "\"Summarize our library's current interlibrary loan policy.\"",
      ],
      answer: 1,
      explanation: "In \"information in\" mode the AI works with content you provide, which sharply reduces hallucination risk. The others ask the model to produce facts from training data - \"information out\" - which needs more verification.",
    },
    {
      prompt: "When a response's tone is wrong, what correction works best?",
      options: [
        "Add adjectives such as \"more conversational\" and resend",
        "Regenerate the response until the tone happens to change",
        "Paste an example of the tone, or describe it concretely",
        "Move the prompt to a different tool known for good tone",
      ],
      answer: 2,
      explanation: "Showing rather than describing calibrates tone more reliably than adjectives alone.",
    },
    {
      prompt: "You use AI every day for reference and instruction at a community college. What saves you from re-explaining your setting in every chat?",
      options: [
        "Custom instructions, or a Project with persistent context and files",
        "Opening each chat with a long paragraph that describes your library",
        "Using a separate AI tool for each kind of task you regularly do",
        "Nothing; no current tool keeps any context between conversations",
      ],
      answer: 0,
      explanation: "Custom instructions (ChatGPT, Claude, Gemini) and Claude Projects persist your role, population, style preferences and documents across conversations - one of the biggest no-cost efficiency gains.",
    },
  ],
  3: [
    {
      prompt: "Your institution runs Microsoft 365 and you receive a long vendor proposal as a Word document. Which tool fits best?",
      options: [
        "Perplexity",
        "Grok",
        "Gemini",
        "Microsoft Copilot",
      ],
      answer: 3,
      explanation: "Copilot works inside Word, Outlook and Teams and may already be included in your institution's Microsoft agreement - worth checking with IT before buying anything separate.",
    },
    {
      prompt: "Who is the right source for which AI tools are permitted for FERPA- or HIPAA-covered data?",
      options: [
        "The AI vendor's published privacy and compliance pages",
        "Your institution's IT, counsel or compliance office",
        "A trusted colleague doing the same work at a peer school",
        "The AI tool itself, asked directly about its own compliance",
      ],
      answer: 1,
      explanation: "Institution-specific compliance decisions belong to IT, counsel or compliance - not vendors.",
    },
    {
      prompt: "OCLC's AI cataloging features suggest classification numbers and subject headings. What is the cataloger's role?",
      options: [
        "Accept them as given, since they are drawn from WorldCat data.",
        "Ignore them entirely, because AI suggestions are rarely usable.",
        "Use them to narrow options, then verify each against the item.",
        "Forward them to a supervisor, who approves or rejects them.",
      ],
      answer: 2,
      explanation: "The suggestion is a starting point, not a substitute for judgment about what the item actually is. Verification stays with the cataloger.",
    },
  ],
  4: [
    {
      prompt: "According to ALA's AI guidance, what standing does an AI output have?",
      options: [
        "A draft that requires human review",
        "An authoritative answer, if it came from an approved tool",
        "A citable source, once its access date is recorded",
        "A final product, after a second AI tool has checked it",
      ],
      answer: 0,
      explanation: "ALA says to treat AI outputs as \"drafts requiring human review, not authoritative answers.\" Accountability for anything the library provides rests with a human professional.",
    },
    {
      prompt: "A clinical librarian helps a nurse search the literature on a patient's condition. What belongs in the AI prompt?",
      options: [
        "The patient's age, diagnosis and room, to make results precise",
        "Whatever case details the nurse feels comfortable sharing",
        "Full case details, provided the tool is a paid business plan",
        "Only the general clinical topic, with no patient specifics",
      ],
      answer: 3,
      explanation: "Under HIPAA's minimum necessary standard, patient identifiers and case details are protected health information. When unsure, leave it out and consult your privacy officer.",
    },
    {
      prompt: "A vendor won't explain how its AI discovery feature was trained or how outputs are grounded. Under ALA's 2026 guidance, this is…",
      options: [
        "normal for proprietary products and not a concern",
        "a failure of the expected algorithmic transparency",
        "a concern for public libraries but not academic ones",
        "a reason to sign quickly before the terms change",
      ],
      answer: 1,
      explanation: "ALA requires libraries to obtain algorithmic transparency from AI vendors.",
    },
  ],
  5: [
    {
      prompt: "Which AI-generated claim carries the highest hallucination risk?",
      options: [
        "\"Try opening your workshop with a quick hands-on activity.\"",
        "\"A shorter first paragraph would make this email warmer.\"",
        "\"Smith and Jones (2021) found that 73% of libraries…\"",
        "A summary of the meeting notes you pasted into the chat",
      ],
      answer: 2,
      explanation: "Specific, confident claims - named citations, precise statistics, attributed quotes - are the hallmark of hallucination. Style advice and summaries of provided text are lower risk.",
    },
    {
      prompt: "Which best describes the difference between verifying a citation and fact-checking a claim?",
      options: [
        "One checks a document exists and says it; the other checks the claim.",
        "They are the same check, described with two different names.",
        "Fact-checking is only needed for statistics, not other claims.",
        "Citations are verified by AI tools; claims are checked by people.",
      ],
      answer: 0,
      explanation: "Both are needed in different circumstances; confusing them leaves gaps.",
    },
    {
      prompt: "In the three layers of discernment, which layer catches an assumption the AI quietly introduced mid-response?",
      options: [
        "Product discernment",
        "Performance discernment",
        "Prompt discernment",
        "Process discernment",
      ],
      answer: 3,
      explanation: "Process discernment follows the logic of how the AI got there, not just the result.",
    },
  ],
  6: [
    {
      prompt: "In the research workflow map, at which stage should AI NOT be used?",
      options: [
        "Topic development and question formation",
        "Evaluating source quality",
        "Developing the search strategy",
        "Summarizing articles already retrieved",
      ],
      answer: 1,
      explanation: "Source evaluation requires direct engagement with the source using information literacy criteria. AI can describe what a source claims; it can't assess whether those claims are warranted.",
    },
    {
      prompt: "A reviewer uploads a manuscript they are peer reviewing into a commercial AI tool to summarize it. What is the issue?",
      options: [
        "Disclosure: they need to note in the review that AI was used.",
        "None, as long as the reviewer is using a paid business plan.",
        "Confidentiality: unpublished work went to an unagreed third party.",
        "None, as long as they delete the conversation right afterward.",
      ],
      answer: 2,
      explanation: "Disclosure governs your own proposal; confidentiality governs someone else's manuscript. NIH and the Canadian tri-agency guidance address this directly, and deleting the chat doesn't undo it.",
    },
    {
      prompt: "How do platform-embedded assistants like EBSCO AI Insights differ from asking a general chatbot?",
      options: [
        "They are grounded in content the library already licenses.",
        "They run on larger models than consumer chatbots use.",
        "They are reviewed by editors, so they never make errors.",
        "They search the entire open web as well as the database.",
      ],
      answer: 0,
      explanation: "Summaries and suggestions are traceable to records the library's subscriptions cover.",
    },
  ],
  7: [
    {
      prompt: "A syllabus says only \"AI is not permitted.\" What is the problem?",
      options: [
        "It is too strict to enforce in an online course.",
        "A syllabus cannot legally regulate technology use.",
        "Nothing - it is short, clear and easy to follow.",
        "It never says what counts as AI, so it's ambiguous.",
      ],
      answer: 3,
      explanation: "Does it cover grammar checkers, autocomplete, translation tools? Specific language about what counts, how to document use, what disclosure requires and consequences makes a policy workable.",
    },
    {
      prompt: "Which four variables should a lesson-plan prompt specify?",
      options: [
        "Room number, projector type, class size, and date",
        "Population, assignment, time, and outcome to prioritize",
        "Instructor, textbook, grading scale, and syllabus",
        "Database, keywords, filters, and citation style",
      ],
      answer: 1,
      explanation: "Rich context - who, what assignment, how long, what to prioritize - is what turns a generic lesson plan into one fitted to the session.",
    },
    {
      prompt: "What is the key verification step when AI drafts FAQ content for a library service?",
      options: [
        "Check that the word count suits the web page layout",
        "Run the text through a plagiarism checker first",
        "Check each procedure against how your service works",
        "Ask the AI to double-check its own answers",
      ],
      answer: 2,
      explanation: "AI may generate plausible procedures that don't match your institution.",
    },
  ],
  8: [
    {
      prompt: "Which metadata task is the highest-value, lowest-risk AI application for most cataloging workflows?",
      options: [
        "Batch normalization by explicit rules, like date formats",
        "Original cataloging of culturally sensitive materials",
        "Generating complete records from a title string alone",
        "Authority work that interprets how communities self-name",
      ],
      answer: 0,
      explanation: "Consistent rule application to provided content is among AI's most reliable capabilities. The rules come from the cataloger, not the model.",
    },
    {
      prompt: "OCLC pilot users reported saving up to twenty minutes per title with AI cataloging suggestions. How should a library use that figure?",
      options: [
        "As an audited benchmark for planning staffing levels",
        "Not at all, since vendor figures are always inflated",
        "As evidence that cataloging positions can be reduced",
        "As a pilot-reported signal; measure your own savings",
      ],
      answer: 3,
      explanation: "Establish a calibration period and let local measurement, not the vendor's figure, inform workflow decisions.",
    },
    {
      prompt: "Which task should a defensible workflow keep entirely in professional hands?",
      options: [
        "Normalizing date formats across legacy records",
        "Original cataloging of culturally sensitive items",
        "Fixing character-encoding errors in exports",
        "Flagging records that have missing fields",
      ],
      answer: 1,
      explanation: "Concentrate AI where rule-following suffices; keep judgment-heavy work - complex or sensitive originals, identity-related authority work - human.",
    },
  ],
  9: [
    {
      prompt: "Why should libraries review digitization contracts signed years ago?",
      options: [
        "Most of them expire automatically after ten years.",
        "They always contain an explicit ban on AI use.",
        "Pre-AI reuse language may cover training - or not.",
        "Vendors are now required to renegotiate them.",
      ],
      answer: 2,
      explanation: "Contracts written before generative AI may grant broad reuse rights; nobody knows until someone reads them with that question. ARL recommends reviewing every such agreement.",
    },
    {
      prompt: "Which tool does this module describe as making oral history transcription practical - open source and free to run locally?",
      options: [
        "Whisper",
        "Yewno",
        "Specto",
        "Collecto",
      ],
      answer: 0,
      explanation: "Whisper turns an economically prohibitive task into a review-and-correct workflow. Accuracy varies with audio quality, accents and vocabulary - pilot on a sample first.",
    },
    {
      prompt: "How does a visibility audit differ from a relevance audit?",
      options: [
        "They are the same audit under two different names.",
        "It checks whether the website meets accessibility rules.",
        "It is carried out by the vendor rather than the library.",
        "It asks what the ranking buries, not whether the top is good.",
      ],
      answer: 3,
      explanation: "Ranking that favors recent, high-use, English-language materials can bury older, minority-language or marginalized-community holdings - invisible in one search, detectable across many.",
    },
  ],
  10: [
    {
      prompt: "Where should you start building a prompt library?",
      options: [
        "Write a prompt for every task you might ever do",
        "Your five or six most frequent AI-helped tasks",
        "Copy a vendor's ready-made library of prompts",
        "Wait for the whole team to agree on a format",
      ],
      answer: 1,
      explanation: "A small library that gets used beats a comprehensive one consulted occasionally. It grows naturally from there.",
    },
    {
      prompt: "In a reusable prompt, what are the bracketed parts like [patron type] and [paste inquiry]?",
      options: [
        "Comments to the reader that the AI model ignores",
        "Optional extras you can delete for shorter output",
        "Variables - the only parts that change between uses",
        "Code instructions that the AI tool executes first",
      ],
      answer: 2,
      explanation: "The four components: constant role/context, a task with bracketed variables, a constraint set, and an output format.",
    },
    {
      prompt: "What distinguishes a tested prompt from a drafted one?",
      options: [
        "It was tried on real examples and revised.",
        "It is longer and uses more instructions.",
        "It was approved by a library supervisor.",
        "It uses precise technical vocabulary.",
      ],
      answer: 0,
      explanation: "Test on several representative examples, find where output needed the most editing, revise.",
    },
  ],
  11: [
    {
      prompt: "Primo Research Assistant, Scopus AI, EBSCO AI Insights and similar tools share a retrieval-augmented architecture. What is their characteristic limitation?",
      options: [
        "They cannot attach citations to any of their summaries.",
        "They only work with queries written in English.",
        "They invent most of the sources they appear to cite.",
        "The summary reflects only the few sources it retrieved.",
      ],
      answer: 3,
      explanation: "RAG reduces hallucination but a confident summary of five sources looks the same whether or not they're the five an expert would choose. Each tool also searches a different index.",
    },
    {
      prompt: "A promising AI feature is a paid add-on whose value for your students is uncertain. Under the decision framework, you should…",
      options: [
        "adopt it",
        "pilot it",
        "decline it",
        "defer it",
      ],
      answer: 1,
      explanation: "Adopt when bundled, rubric-passing and needed; pilot when promising but unproven or costly (same real queries through the tool and a non-AI search, scored with the Choice rubric); decline when it fails a dimension that matters.",
    },
    {
      prompt: "You hide the link to a vendor's AI research assistant. Is the feature off?",
      options: [
        "Yes - removing the link disables the feature.",
        "Only the vendor's support team can tell you.",
        "Not necessarily; test it, the endpoint may remain.",
        "It doesn't matter if patrons can't see the link.",
      ],
      answer: 2,
      explanation: "An independent analysis found Primo Research Assistant's endpoint stayed reachable after the link was hidden. AI embedded in ranking and indexing often has no switch at all and should be disclosed.",
    },
  ],
  12: [
    {
      prompt: "What is the most common framing mistake when proposing AI to administration?",
      options: [
        "Leading with capability instead of their concerns",
        "Bringing more data than the meeting has time for",
        "Raising risks before describing the benefits",
        "Proposing a pilot instead of full adoption",
      ],
      answer: 0,
      explanation: "\"AI drafts guides faster\" lands less than \"AI reduces staff time on recurring writing tasks, estimable in terms you already track.\"",
    },
    {
      prompt: "An administrator dismisses Clarivate's Pulse of the Library data as vendor marketing. What peer-reviewed source makes the same training-gap argument?",
      options: [
        "A white paper from a discovery-layer vendor's research arm",
        "A large poll of librarians run on a professional social site",
        "The documentation published by the AI tool's own developer",
        "Leo S. Lo's 2024 study in College & Research Libraries",
      ],
      answer: 3,
      explanation: "Lo's peer-reviewed survey of U.S. library employees (\"Evaluating AI literacy in academic libraries\") won the 2025 CALA Jing Liao Award and removes the \"it's marketing\" objection.",
    },
    {
      prompt: "For an administrator who says \"our faculty aren't asking about this,\" which reframe works best?",
      options: [
        "Operational efficiency for routine library tasks",
        "Preparing students for the AI world they'll enter",
        "Discounts available from vendors this year only",
        "Keeping pace with what peer libraries are doing",
      ],
      answer: 1,
      explanation: "Student outcomes shift the question to whether the institution is preparing its graduates.",
    },
  ],
  13: [
    {
      prompt: "When should retraining and transition support be offered?",
      options: [
        "After a role has already been changed",
        "Only when individual staff request it",
        "Before job tasks change, on paid time",
        "During each annual performance review",
      ],
      answer: 2,
      explanation: "Retraining after a role is hollowed out is a severance formality. The sequence: assess labor impact, involve workers, fund paid learning, retrain before change, reinvest gains.",
    },
    {
      prompt: "What does ALA ask libraries to request from AI vendors about \"ghost work\"?",
      options: [
        "Documentation of labeling labor conditions and protections",
        "Nothing; supply-chain labor is outside a library's scope",
        "The names of the contractors who labeled the training data",
        "Proof that no human labor was used to build the product",
      ],
      answer: 0,
      explanation: "Including compensation, mental health support and training-data origins. Libraries should avoid tools when vendors can't provide sufficient documentation; many libraries asking becomes a market signal.",
    },
    {
      prompt: "An administration selects an AI cataloging tool, then invites catalogers to a training session. Is that meaningful staff input?",
      options: [
        "Yes - catalogers were brought into the process.",
        "Yes, provided the training session is on paid time.",
        "It depends on which vendor's tool they finally chose.",
        "No - input must come before adoption, with a real say.",
      ],
      answer: 3,
      explanation: "Training after the decision is scheduled compliance. And where employment is materially affected, bargaining units must be consulted.",
    },
  ],
  14: [
    {
      prompt: "When is Make the better choice over Zapier?",
      options: [
        "For a simple two-step trigger-and-action workflow",
        "When you need branching, many steps, or batches",
        "Whenever the library has no budget for tools",
        "Only for scheduling posts to social media",
      ],
      answer: 1,
      explanation: "Make's routers and filters handle conditional logic - e.g., routing faculty and student requests differently. Zapier is the easier start for simple trigger-action pairs.",
    },
    {
      prompt: "Which automation carries the highest error cost?",
      options: [
        "Logging consultation requests to an internal sheet",
        "Creating a Trello task from a staff email",
        "Emailing patrons directly with no review step",
        "Posting a Slack alert to the reference team",
      ],
      answer: 2,
      explanation: "Patron-facing errors reach patrons before anyone can catch them. A human review step must be built in as a structural requirement.",
    },
    {
      prompt: "\"Automation handles the standard case.\" What handles everything else?",
      options: [
        "Professional judgment",
        "A second automation",
        "The vendor help desk",
        "An autonomous agent",
      ],
      answer: 0,
      explanation: "Exceptions are exactly what distinguish professional work from rule-following.",
    },
  ],
  15: [
    {
      prompt: "How should memory features in current AI tools be treated?",
      options: [
        "As a dependable, complete record of past chats",
        "As a security risk that should always be off",
        "As a full replacement for custom instructions",
        "As a convenience to verify before relying on",
      ],
      answer: 3,
      explanation: "Memory can fail to retrieve stored information.",
    },
    {
      prompt: "Where do Claude Projects sit on the chatbot-to-agent spectrum?",
      options: [
        "Fully autonomous agents that act on their own",
        "The lighter end: persistent context, no autonomy",
        "Simple single-turn chatbots with no memory",
        "Not on it at all; they are file storage tools",
      ],
      answer: 1,
      explanation: "Projects persist instructions, files and context across conversations - a good place to build familiarity before more autonomous tools arrive.",
    },
    {
      prompt: "What does auditability require of an agent?",
      options: [
        "A monthly invoice itemizing each action taken",
        "Faster execution so errors finish sooner",
        "A readable log of what it did, reviewed regularly",
        "A certificate of compliance from the vendor",
      ],
      answer: 2,
      explanation: "What it did, in what order, from what input. You should always be able to say which steps were the system's and which a person's.",
    },
  ],
  16: [
    {
      prompt: "What is vibe coding?",
      options: [
        "Describing software and letting AI write it",
        "Learning to program with an AI tutor's help",
        "Writing code quickly without any testing",
        "Configuring a vendor product without IT",
      ],
      answer: 0,
      explanation: "Coined by Andrej Karpathy in February 2025: build by describing in plain language, then review and revise. No programming involved.",
    },
    {
      prompt: "Which is the recommended starting tool for a first library vibe-coding project?",
      options: [
        "A custom server",
        "The ILS console",
        "Excel macros",
        "Lovable",
      ],
      answer: 3,
      explanation: "Lovable has strong default design and a live preview. Replit is the next step for more complex needs; Claude or ChatGPT directly suit quick single-file tools.",
    },
    {
      prompt: "Why is \"code opacity\" described as structural rather than temporary?",
      options: [
        "AI-written code is encrypted by the tool",
        "The builder, by design, doesn't read the code",
        "Vendors keep the generated code hidden",
        "The code is deleted once it is deployed",
      ],
      answer: 1,
      explanation: "So they can't diagnose edge cases or failures. Acceptable for low-stakes internal tools - not for anything that gates access, stores patron data, or makes consequential decisions.",
    },
  ],
  17: [
    {
      prompt: "What does a data pipeline do?",
      options: [
        "Makes nightly backups of the catalog to the cloud",
        "Displays search results to patrons in real time",
        "Moves and transforms data between systems on a schedule",
        "Encrypts patron data as it leaves the library",
      ],
      answer: 2,
      explanation: "Extract, transform, load. Building one usually needs developer support - but defining precisely what it should move, where, when and how is a valuable practitioner contribution.",
    },
    {
      prompt: "For most institutional repository administrators today, what's the most practical AI metadata workflow?",
      options: [
        "CSV export, AI batch pass, review, re-import",
        "A fully automated nightly API pipeline",
        "Waiting for the platform vendor to add it",
        "Rewriting every record by hand instead",
      ],
      answer: 0,
      explanation: "No API needed - and it doubles as a proof of concept for more automated integration later.",
    },
    {
      prompt: "When is a custom-built integration the right path?",
      options: [
        "Whenever it is technically possible to build",
        "Whenever the vendor is slow to reply",
        "When thirty libraries share the same need",
        "Local need, no product, maintenance committed",
      ],
      answer: 3,
      explanation: "Institution-specific use case, no vendor product addresses it, and an explicit maintenance commitment. Broadly shared needs belong in vendor feature requests.",
    },
  ],
  18: [
    {
      prompt: "What is a practical first step toward policy co-authorship?",
      options: [
        "Wait until the committee invites the library",
        "Ask who is writing it and if the library is in",
        "Write a complete policy alone and publish it",
        "Critique the finished policy once it's released",
      ],
      answer: 1,
      explanation: "\"Who is writing our AI acceptable use policy, and has the library been asked to contribute?\" Asking is leadership that needs no formal authority.",
    },
    {
      prompt: "Which conference proposal title is most likely to be accepted?",
      options: [
        "\"AI in Academic Libraries: A Comprehensive Overview\"",
        "\"The Future of AI and Library Services in a New Era\"",
        "\"Six months of AI in community college consultations\"",
        "\"Why Every Academic Library Needs an AI Strategy Now\"",
      ],
      answer: 2,
      explanation: "Accepted proposals make a specific claim about a specific context. Broad titles describe a subject rather than a finding.",
    },
    {
      prompt: "What is the practitioner's distinctive contribution to the professional AI conversation?",
      options: [
        "Honest, specific accounts from real workflows",
        "Broad general reviews of popular AI tools",
        "Confident predictions about where AI is going",
        "Vendor comparisons drawn from marketing sheets",
      ],
      answer: 0,
      explanation: "Contextual specificity is what vendor docs and research literature most often lack.",
    },
  ],
};
